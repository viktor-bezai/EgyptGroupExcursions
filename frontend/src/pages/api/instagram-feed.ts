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
    console.log("Cookies loaded.");
  } catch (error) {
    console.warn("No cookies found or failed to load cookies:", error);
  }
}

async function saveCookies(page: Page, filePath: string) {
  const cookies = await page.cookies();
  await fs.writeFile(filePath, JSON.stringify(cookies, null, 2));
  console.log("Cookies saved.");
}

async function autoScroll(page: Page, scrollCount = 2) {
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
}

async function scrapeInstagramPosts(page: Page): Promise<InstagramPost[]> {
  return page.evaluate(() => {
    const postElements = document.querySelectorAll("article div a");
    return Array.from(postElements).map((postElement) => {
      const imageElement = postElement.querySelector("img");
      return {
        imageUrl: imageElement?.getAttribute("src") || "",
        altText: imageElement?.getAttribute("alt") || "",
        postUrl: postElement.getAttribute("href") || "",
        description: imageElement?.getAttribute("alt") || null,
      };
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const now = Date.now();

    // Serve cached feed if valid
    if (cachedFeed && lastUpdated && now - lastUpdated < CACHE_EXPIRY) {
      console.log("Serving cached Instagram feed.");
      return res.status(200).json(cachedFeed);
    }

    console.log("Cache expired or missing. Scraping Instagram feed...");

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
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    );
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setExtraHTTPHeaders({ "Accept-Language": "en-US,en;q=0.9" });

    // Load cookies if available
    await loadCookies(page, COOKIES_FILE_PATH);

    // Navigate to the Instagram profile
    const profileUrl = "https://www.instagram.com/anna_egypt_/";
    await page.goto(profileUrl, { waitUntil: "networkidle2", timeout: 30000 });

    const scrollCount = parseInt(req.query.scrollCount as string, 10) || 2;
    await autoScroll(page, scrollCount);

    const posts = await scrapeInstagramPosts(page);

    // Save cookies after the operation
    await saveCookies(page, COOKIES_FILE_PATH);

    await browser.close();

    if (!posts || posts.length === 0) {
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
