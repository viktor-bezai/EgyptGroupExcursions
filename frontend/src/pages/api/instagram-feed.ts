import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs/promises";
import path from "path";
import { Page } from "puppeteer";

puppeteer.use(StealthPlugin());

export interface InstagramPost {
  imageUrl: string;
  altText: string;
  postUrl: string;
  description?: string | null;
}

// Cache variables
let cachedFeed: InstagramPost[] | null = null;
let lastUpdated: number | null = null;
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const COOKIES_FILE_PATH = path.join(process.cwd(), "cookies.json");

async function loadCookies(page: Page, filePath: string) {
  try {
    const cookies = JSON.parse(await fs.readFile(filePath, "utf-8"));
    await page.setCookie(...cookies);
    console.log("Cookies loaded successfully.");
  } catch (error) {
    console.warn("No cookies found or failed to load cookies:", error);
  }
}

async function saveCookies(page: Page, filePath: string) {
  try {
    const cookies = await page.cookies();
    await fs.writeFile(filePath, JSON.stringify(cookies, null, 2));
    console.log("Cookies saved successfully.");
  } catch (error) {
    console.error("Failed to save cookies:", error);
  }
}

async function loginToInstagram(page: Page, username: string, password: string) {
  try {
    console.log("Attempting to log in...");
    await page.waitForSelector('input[name="username"]', { timeout: 30000 });
    await page.type('input[name="username"]', username, { delay: 100 });
    await page.type('input[name="password"]', password, { delay: 100 });
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 30000 });
    console.log("Login successful.");
  } catch (error) {
    console.error("Error during login:", error);
  }
}

async function autoScroll(page: Page, scrollCount = 2) {
  try {
    console.log(`Auto-scrolling the page ${scrollCount} times.`);
    await page.evaluate(async (scrollCount) => {
      await new Promise<void>((resolve) => {
        let totalScrolls = 0;
        const distance = 200;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalScrolls++;
          if (totalScrolls >= scrollCount) {
            clearInterval(timer);
            resolve();
          }
        }, 500);
      });
    }, scrollCount);
  } catch (error) {
    console.error("Error during auto-scroll:", error);
  }
}

async function scrapeInstagramPosts(page: Page): Promise<InstagramPost[]> {
  try {
    console.log("Scraping Instagram posts...");
    await page.waitForSelector("article div a", { timeout: 30000 });
    return page.evaluate(() => {
      const postElements = document.querySelectorAll("article div a");
      return Array.from(postElements).map((postElement) => {
        const img = postElement.querySelector("img") as HTMLImageElement;
        const postAnchor = postElement.closest("a");
        const descriptionElement = postAnchor?.parentElement?.querySelector("div span");
        return {
          imageUrl: img?.src || "",
          altText: img?.alt || "",
          postUrl: postAnchor?.href || "",
          description: descriptionElement?.textContent || null,
        };
      });
    }) as Promise<InstagramPost[]>;
  } catch (error) {
    console.error("Error scraping posts:", error);
    await page.screenshot({ path: "error-screenshot.png" });
    return [];
  }
}

async function acceptCookies(page: Page) {
  try {
    console.log("Checking for cookie consent dialog...");
    await page.waitForSelector('button', { visible: true, timeout: 5000 });
    const buttons = await page.$$('button');
    for (const button of buttons) {
      const text = await page.evaluate((el) => el.textContent, button);
      if (text?.trim() === "Allow all cookies") {
        await button.click();
        console.log("Cookie consent accepted.");
        return;
      }
    }
    console.log("No 'Allow all cookies' button found.");
  } catch (error) {
    if ((error as Error).name === "TimeoutError") {
      console.log("Cookie consent dialog not found; proceeding without accepting cookies.");
    } else {
      console.log("Unexpected error while handling cookie consent dialog:", error);
    }
  }
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const username = process.env.INSTAGRAM_USERNAME;
  const password = process.env.INSTAGRAM_PASSWORD;

  if (!username || !password) {
    return res.status(500).json({ error: "Instagram credentials are missing." });
  }

  try {
    const now = Date.now();

    // Serve cached feed if valid
    if (cachedFeed && lastUpdated && now - lastUpdated < CACHE_EXPIRY) {
      console.log("Serving cached Instagram feed.");
      return res.status(200).json(cachedFeed);
    }

    console.log("Cache expired or missing. Initiating scraping process...");

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled",
        "--disable-infobars",
        "--window-size=1920,1080",
      ],
    });

    const page = await browser.newPage();
    console.log("Browser launched successfully.");

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    );
    console.log("User agent set.");

    await page.setViewport({ width: 1920, height: 1080 });
    console.log("Viewport set.");

    await page.setExtraHTTPHeaders({ "Accept-Language": "en-US,en;q=0.9" });
    console.log("Extra HTTP headers set.");

    await page.goto("https://www.instagram.com/", { waitUntil: "networkidle2", timeout: 50000 });
    console.log("Going to https://www.instagram.com/.");

    // Load cookies if available
    await loadCookies(page, COOKIES_FILE_PATH);

    // Accept cookies
    await acceptCookies(page);

    // Check if login is needed
    if (await page.$('input[name="username"]')) {
      await loginToInstagram(page, username, password);
    }

    const scrollCount = parseInt(req.query.scrollCount as string, 10) || 2;
    // Navigate to the Instagram profile
    const profileUrl = "https://www.instagram.com/anna_egypt_/";
    console.log(`Navigating to ${profileUrl}`);
    await page.goto(profileUrl, { waitUntil: "networkidle2", timeout: 50000 });
    console.log("Page loaded successfully.");
    await autoScroll(page, scrollCount);

    const posts = await scrapeInstagramPosts(page);

    // Save cookies after the operation
    await saveCookies(page, COOKIES_FILE_PATH);

    await browser.close();
    console.log("Browser closed successfully.");

    if (!posts || posts.length === 0) {
      console.warn("No posts found during scraping.");
      throw new Error("No posts found.");
    }

    // Update cache
    cachedFeed = posts;
    lastUpdated = now;

    console.log(`Cache updated with ${posts.length} posts.`);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in Instagram feed handler:", error);
    res.status(500).json({ error: "Failed to fetch Instagram data." });
  }
}
