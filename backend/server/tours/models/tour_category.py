from django.db import models


class TourCategory(models.Model):
    name_ru = models.CharField(max_length=200, verbose_name="Название (Русский)")
    name_ukr = models.CharField(max_length=200, verbose_name="Назва (Украiнська)")
    name_en = models.CharField(max_length=200, verbose_name="Name (English)")

    class Meta:
        verbose_name = 'Категорию Тура'
        verbose_name_plural = 'Категории Туров'

    def get_name(self, lang):
        return getattr(self, f'name_{lang}', self.name_ru)

    def __str__(self):
        return self.name_ru
