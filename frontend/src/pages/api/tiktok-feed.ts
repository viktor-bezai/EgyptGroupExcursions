import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer-extra";
import { Page } from "puppeteer";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

export interface TikTokPost {
  thumbnailUrl: string;
  postUrl: string;
}

let cachedFeed: TikTokPost[] | null = null;
let lastUpdated: number | null = null;

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000; // Cache expiry: 24 hours

async function autoScroll(page: Page) {
  try {
    console.log("Starting auto-scroll...");
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const distance = 200;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 500);
      });
    });
    console.log("Auto-scroll completed.");
  } catch (error) {
    console.error("Error during auto-scroll:", error);
  }
}

async function scrapeWithRetry(page: Page, retries = 3, delay = 5000): Promise<TikTokPost[]> {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempt ${i + 1} to scrape posts.`);
      const posts: TikTokPost[] = await page.evaluate(() => {
        const postElements = document.querySelectorAll("div[data-e2e='user-post-item']");
        return Array.from(postElements).map((postElement) => {
          const thumbnailElement = postElement.querySelector("img");
          const anchorElement = postElement.querySelector("a");
          return {
            thumbnailUrl: thumbnailElement?.getAttribute("src") || "",
            postUrl: anchorElement?.getAttribute("href") || "",
          };
        });
      });
      console.log(`Scrape attempt ${i + 1} successful. Found ${posts.length} posts.`);
      if (posts.length > 0) return posts;
    } catch (error) {
      console.error(`Scrape attempt ${i + 1} failed:`, error);
    }
    console.log(`Retrying scrape in ${delay / 1000} seconds...`);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  throw new Error("Failed to scrape TikTok posts after multiple attempts.");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const now = Date.now();

    // Check cache validity
    if (cachedFeed && lastUpdated && now - lastUpdated < ONE_DAY_IN_MS) {
      console.log("Serving cached TikTok feed.");
      return res.status(200).json(cachedFeed);
    }

    console.log("Cache expired or missing. Initiating scraping process...");
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    console.log("Browser launched.");

    const page = await browser.newPage();
    console.log("New page created.");

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
    );
    console.log("User agent set.");

    const profileUrl = "https://www.tiktok.com/@assis_travel";
    console.log(`Navigating to TikTok profile: ${profileUrl}`);
    await page.goto(profileUrl, { waitUntil: "load", timeout: 30000 });
    console.log("Page loaded successfully.");

    await autoScroll(page);

    console.log("Starting scraping process...");
    const posts = await scrapeWithRetry(page);

    console.log("Scraping completed. Closing browser...");
    await browser.close();
    console.log("Browser closed.");

    if (!posts || posts.length === 0) {
      console.warn("No posts found during scraping.");
      throw new Error("No posts found.");
    }

    // Update cache
    cachedFeed = posts;
    lastUpdated = now;

    console.log(`Successfully updated cache with ${posts.length} posts.`);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in TikTok feed handler:", error);
    res.status(500).json({ error: "Failed to fetch TikTok data." });
  }
}
