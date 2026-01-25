import logging

from django.db import models

logger = logging.getLogger(__name__)


class SocialMediaPost(models.Model):
    INSTAGRAM = "Instagram"
    TIKTOK = "TikTok"
    SOCIAL_MEDIA_CHOICES = [
        (INSTAGRAM, INSTAGRAM),
        (TIKTOK, TIKTOK),
    ]

    url = models.URLField(
        max_length=500, unique=True, help_text="Post URL (Instagram or TikTok)"
    )
    social_media = models.CharField(
        max_length=100,
        choices=SOCIAL_MEDIA_CHOICES,
    )
    oembed_html = models.TextField(
        blank=True, null=True, help_text="Cached oEmbed HTML"
    )
    thumbnail_url = models.URLField(
        max_length=1000, blank=True, null=True, help_text="Thumbnail URL for preview"
    )
    title = models.CharField(
        max_length=500, blank=True, null=True, help_text="Post title/caption"
    )
    is_active = models.BooleanField(
        default=True, help_text="Show this post on the website"
    )
    display_order = models.PositiveIntegerField(
        default=0, help_text="Lower number = shown first"
    )

    class Meta:
        verbose_name = "Пост Социальной Сети"
        verbose_name_plural = "Посты Социальной Сети"
        ordering = ["display_order", "-id"]

    def __str__(self):
        return f"{self.social_media}: {self.url}"

    def fetch_oembed(self) -> bool:
        """Fetch and cache oEmbed data for this post."""
        from server.social_media_posts.utils.oembed import fetch_oembed

        oembed_data = fetch_oembed(self.url, self.social_media)
        if oembed_data:
            self.oembed_html = oembed_data.html
            self.thumbnail_url = oembed_data.thumbnail_url
            self.title = oembed_data.title
            self.save()
            logger.info(f"Fetched oEmbed data for {self.url}")
            return True
        return False

    def save(self, *args, **kwargs):
        """Auto-detect social media platform from URL if not set."""
        if not self.social_media:
            if "tiktok.com" in self.url:
                self.social_media = self.TIKTOK
            elif "instagram.com" in self.url:
                self.social_media = self.INSTAGRAM
        super().save(*args, **kwargs)
