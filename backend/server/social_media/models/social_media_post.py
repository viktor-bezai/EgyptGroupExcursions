from django.db import models


class SocialMediaPost(models.Model):
    SOCIAL_MEDIA_CHOICES = [
        ("Instagram", "Instagram"),
        ("TikTok", "TikTok"),
    ]

    image = models.ImageField(upload_to='social_media')
    description = models.TextField(null=True, blank=True)
    url = models.URLField()
    social_media = models.CharField(
        max_length=100,
        choices=SOCIAL_MEDIA_CHOICES,
    )

    class Meta:
        verbose_name = 'Пост Социальной Сети'
        verbose_name_plural = 'Посты Социальной Сети'

    def __str__(self):
        return self.url
