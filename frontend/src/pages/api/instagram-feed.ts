import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

interface ExtractedPost {
  imageUrl: string;
  altText: string;
  postUrl: string;
  description?: string | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto("https://www.instagram.com/anna_egypt_/", {
      waitUntil: "networkidle2",
    });

    await page.waitForSelector("article img", { timeout: 10000 });

    const posts: ExtractedPost[] = await page.evaluate(() => {
      const postElements = document.querySelectorAll("article div img");
      const extractedPosts: ExtractedPost[] = [];
      postElements.forEach((post: Element) => {
        const img = post as HTMLImageElement;
        const postAnchor = img.closest("a");
        const descriptionElement = postAnchor?.parentElement?.querySelector("div span");
        extractedPosts.push({
          imageUrl: img.src,
          altText: img.alt,
          postUrl: postAnchor?.href || "",
          description: descriptionElement?.textContent,
        });
      });
      return extractedPosts;
    });

    await browser.close();

    if (!posts || posts.length === 0) {
      throw new Error("No posts found.");
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching Instagram data:", error);
    res.status(500).json({ error: "Failed to fetch Instagram data" });
  }
}
