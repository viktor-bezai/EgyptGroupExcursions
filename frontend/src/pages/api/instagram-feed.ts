import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs";
import { Page } from "puppeteer";

puppeteer.use(StealthPlugin());

export interface InstagramPost {
  imageUrl: string;
  altText: string;
  postUrl: string;
  description?: string | null;
}

async function loadCookies(page: Page, filePath: string) {
  if (fs.existsSync(filePath)) {
    const cookies = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    await page.setCookie(...cookies);
    console.log("Cookies loaded.");
  }
}

async function saveCookies(page: Page, filePath: string) {
  const cookies = await page.cookies();
  fs.writeFileSync(filePath, JSON.stringify(cookies));
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
  const posts = await page.evaluate(() => {
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
  return posts;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const browser = await puppeteer.launch({
      headless: false,
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

    const cookiesFilePath = "./cookies.json";
    await loadCookies(page, cookiesFilePath);

    const profileUrl = "https://www.instagram.com/viktorbezai/";
    await page.goto(profileUrl, { waitUntil: "networkidle2", timeout: 60000 });

    const scrollCount = req.query.scrollCount ? parseInt(req.query.scrollCount as string, 10) : 2;
    await autoScroll(page, scrollCount);

    const posts = await scrapeInstagramPosts(page);
    await saveCookies(page, cookiesFilePath);
    await browser.close();

    if (!posts || posts.length === 0) {
      throw new Error("No posts found.");
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in Instagram feed handler:", error);
    res.status(500).json({ error: "Failed to fetch Instagram data." });
  }
}