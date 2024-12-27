from typing import List

from django.db import models

from server.social_media_posts.dtos.social_media_post_dto import SocialMediaPostDTO


class SocialMediaPost(models.Model):
    SOCIAL_MEDIA_CHOICES = [
        ("Instagram", "Instagram"),
        ("TikTok", "TikTok"),
    ]

    image_url = models.CharField(max_length=255)
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
    def create_if_not_exists(cls, social_media_post_dto_list: List[SocialMediaPostDTO]):
        existing_urls = cls.objects.all().values_list('url', flat=True)
        social_media_posts_to_create = []
        for social_media_post_dto in social_media_post_dto_list:
            if social_media_post_dto.url not in existing_urls:
                social_media_posts_to_create.append(
                    cls(
                        image_url=social_media_post_dto.image_url,
                        description=social_media_post_dto.description,
                        url=social_media_post_dto.url,
                        post_date=social_media_post_dto.post_date,
                        social_media=social_media_post_dto.social_media,
                    )
                )
        cls.objects.bulk_create(social_media_posts_to_create)

