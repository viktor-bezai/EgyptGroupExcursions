from typing import List

from django.db import models
from django.db import transaction

from server.social_media_posts.dtos.social_media_post_dto import SocialMediaPostDTO


class SocialMediaPost(models.Model):
    INSTAGRAM = "Instagram"
    TIKTOK = "TikTok"
    SOCIAL_MEDIA_CHOICES = [
        (INSTAGRAM, INSTAGRAM),
        (TIKTOK, TIKTOK),
    ]

    image_url = models.TextField()
    description = models.TextField(null=True, blank=True)
    url = models.URLField()
    post_date = models.DateTimeField(null=True, blank=True)
    social_media = models.CharField(
        max_length=100,
        choices=SOCIAL_MEDIA_CHOICES,
    )

    class Meta:
        verbose_name = 'Пост Социальной Сети'
        verbose_name_plural = 'Посты Социальной Сети'

    def __str__(self):
        return self.url

    @classmethod
    @transaction.atomic
    def update_last_posts(cls, social_media_post_dto_list: List[SocialMediaPostDTO], social_media: str):
        # Extract URLs from the incoming DTO list
        incoming_urls = {dto.url for dto in social_media_post_dto_list}

        # Get all posts with the given social_media and not in the incoming URLs
        existing_posts = cls.objects.filter(social_media=social_media).exclude(url__in=incoming_urls)
        existing_posts.delete()

        # Update or create posts
        for dto in social_media_post_dto_list:
            post, created = cls.objects.update_or_create(
                social_media=social_media,
                url=dto.url,
                defaults={
                    "image_url": dto.image_url,
                    "description": dto.description,
                    "post_date": dto.post_date,
                }
            )
