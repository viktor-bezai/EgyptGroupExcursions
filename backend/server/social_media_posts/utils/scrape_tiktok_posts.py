import time
from typing import List

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from server.social_media_posts.dtos.social_media_post_dto import SocialMediaPostDTO


class TikTokScraper:
    def __init__(self, username: str, headless: bool = True):
        self.username = username
        self.base_url = f"https://www.tiktok.com/@{username}"
        self.headless = headless
        self.driver = self._initialize_driver()
        self.social_media_post_dto_list: List[SocialMediaPostDTO] = []

    def _initialize_driver(self) -> webdriver.Chrome:
        """Initialize and configure the Selenium WebDriver."""
        options = Options()
        if self.headless:
            options.add_argument("--headless")
        options.add_argument("--disable-gpu")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        return webdriver.Chrome(service=Service(), options=options)

    def scrape_posts_urls(self, max_posts: int = 10) -> List[SocialMediaPostDTO]:
        """Scrape TikTok post URLs and return a list of SocialMediaPostDTO objects."""
        try:
            self.driver.get(self.base_url)
            WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))

            self._load_all_posts(max_posts)
            self._scrape_images_urls()

            return self.social_media_post_dto_list
        finally:
            self.driver.quit()

    def _load_all_posts(self, max_posts: int):
        """Scroll and load TikTok posts until the desired number of posts are collected."""
        scroll_attempts = 0
        max_scroll_attempts = 5

        while len(self.social_media_post_dto_list) < max_posts and scroll_attempts < max_scroll_attempts:
            soup = BeautifulSoup(self.driver.page_source, "html.parser")
            posts = soup.find_all(attrs={"data-e2e": "user-post-item"})

            for post in posts:
                if len(self.social_media_post_dto_list) >= max_posts:
                    break

                post_url = post.find("a")["href"]
                if post_url not in [dto.url for dto in self.social_media_post_dto_list]:
                    self.social_media_post_dto_list.append(
                        SocialMediaPostDTO(
                            image_url="",
                            description=None,
                            url=post_url,
                            post_date=None,
                            social_media="TikTok",
                        )
                    )

            # Scroll to load more posts
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(3)
            scroll_attempts += 1

    def _scrape_images_urls(self):
        """Scrape image URLs for each post."""
        for post in self.social_media_post_dto_list:
            self.driver.get(post.url)
            WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))

            soup = BeautifulSoup(self.driver.page_source, "html.parser")
            image_element = soup.find("picture")

            if image_element and (img_tag := image_element.find("img")):
                post.image_url = img_tag.get("src", "")

    def __del__(self):
        """Ensure the driver quits if the object is deleted."""
        if self.driver:
            self.driver.quit()

# Example usage:
# scraper = TikTokScraper("username")
# posts = scraper.scrape_posts_urls(max_posts=10)
# for post in posts:
#     print(post)
