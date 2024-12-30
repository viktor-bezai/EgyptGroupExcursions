from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import path
from django.utils.html import format_html

from server.social_media_posts.models import SocialMediaPost
from server.social_media_posts.utils.scrape_instagram_posts import scrape_instagram_posts
from server.social_media_posts.utils.scrape_tiktok_posts import TikTokScraper


class SocialMediaPostAdmin(admin.ModelAdmin):
    list_display = ["id", "url", "post_date", "social_media"]
    list_display_links = ["id", "url"]
    change_list_template = "admin/social_media_posts/change_list.html"
    list_filter = ("social_media",)

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path("update-instagram/", self.update_instagram_posts, name="update-instagram-posts"),
            path("update-tiktok/", self.update_tiktok_posts, name="update-tiktok-posts"),
        ]
        return custom_urls + urls

    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        extra_context["custom_buttons"] = format_html(
            """
            <a class="button" href="update-instagram/">Update Instagram Posts</a>
            <a class="button" href="update-tiktok/">Update TikTok Posts</a>
            """
        )
        return super().changelist_view(request, extra_context=extra_context)

    def update_instagram_posts(self, request):
        username = "anna_egypt_"
        social_media_post_dto_list = scrape_instagram_posts(username)

        SocialMediaPost.update_last_posts(
            social_media_post_dto_list=social_media_post_dto_list,
            social_media=SocialMediaPost.INSTAGRAM,
        )

        self.message_user(request, "Instagram Posts updated successfully!")

        return HttpResponseRedirect("../")

    def update_tiktok_posts(self, request):
        scraper = TikTokScraper("assis_travel", headless=False)
        social_media_post_dto_list = scraper.scrape_posts_urls(max_posts=10)

        SocialMediaPost.update_last_posts(
            social_media_post_dto_list=social_media_post_dto_list,
            social_media=SocialMediaPost.TIKTOK,
        )

        self.message_user(request, "TikTok Posts updated successfully!")
        return HttpResponseRedirect("../")
