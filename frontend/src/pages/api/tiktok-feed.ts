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
}

async function scrapeWithRetry(page: Page, retries = 3, delay = 5000): Promise<TikTokPost[]> {
  for (let i = 0; i < retries; i++) {
    try {
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
      if (posts.length > 0) return posts;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed: ${error}`);
    }
    console.log(`Retrying in ${delay / 1000} seconds...`);
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

    console.log("Cache expired or missing. Scraping TikTok feed...");
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
    );

    const profileUrl = "https://www.tiktok.com/@assis_travel";
    await page.goto(profileUrl, { waitUntil: "load", timeout: 30000 });
    await autoScroll(page);

    const posts = await scrapeWithRetry(page);
    await browser.close();

    if (!posts || posts.length === 0) {
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
