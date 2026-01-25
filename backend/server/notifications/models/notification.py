from django.db import models
from django_ckeditor_5.fields import CKEditor5Field


class Notification(models.Model):
    title_ru = models.CharField(max_length=100, verbose_name="Название (Русский)")
    title_ua = models.CharField(max_length=100, verbose_name="Назва (Украiнська)")
    title_en = models.CharField(max_length=100, verbose_name="Title (English)")
    description_ru = CKEditor5Field(verbose_name="Описание (Русский)")
    description_ua = CKEditor5Field(verbose_name="Опис (Украiнська)")
    description_en = CKEditor5Field(verbose_name="Description (English)")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Уведомление"
        verbose_name_plural = "Уведомления"

    def get_name(self, lang):
        return getattr(self, f"title_{lang}", self.title_ru)

    def __str__(self):
        return self.title_ru
