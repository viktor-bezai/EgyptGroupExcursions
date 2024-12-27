import time

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from server.social_media_posts.dtos.social_media_post_dto import SocialMediaPostDTO


class TikTokScraper:
    def __init__(self, username, headless=True):
        self.username = username
        self.base_url = f"https://www.tiktok.com/@{username}"
        self.options = Options()
        if headless:
            self.options.add_argument("--headless")
        self.options.add_argument("--disable-gpu")
        self.options.add_argument("--no-sandbox")
        self.options.add_argument("--disable-dev-shm-usage")
        self.driver = webdriver.Chrome(service=Service(), options=self.options)

    def scrape_posts(self, max_posts=10):
        try:
            self.driver.get(self.base_url)
            WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))

            time.sleep(10)  # Allow time for the page to load fully

            # Initialize variables
            social_media_post_dto_list = []
            scroll_attempts = 0

            while len(social_media_post_dto_list) < max_posts and scroll_attempts < 5:
                soup = BeautifulSoup(self.driver.page_source, "html.parser")
                posts = soup.find_all(attrs={"data-e2e": "user-post-item"})

                for post in posts:
                    if len(social_media_post_dto_list) >= max_posts:
                        break

                    img_tag = post.find("img")
                    preview_image = img_tag["src"] if img_tag and "src" in img_tag.attrs else None
                    post_url = post.find("a")["href"]

                    social_media_post_dto_list.append(
                        SocialMediaPostDTO(
                            image_url=preview_image,
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

            return social_media_post_dto_list
        finally:
            self.driver.quit()
