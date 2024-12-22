from django.db import models
from django.db.models import Q

from server.tours.models.category import Category


class Tour(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='tours')
    title_ru = models.CharField(max_length=100, verbose_name="Название (Русский)")
    title_ukr = models.CharField(max_length=100, verbose_name="Назва (Украiнська)")
    title_en = models.CharField(max_length=100, verbose_name="Title (English)")
    image = models.ImageField(upload_to='tours', null=True, blank=True)
    description_ru = models.TextField(verbose_name="Описание (Русский)")
    description_ukr = models.TextField(verbose_name="Опис (Украiнська)")
    description_en = models.TextField(verbose_name="Description (English)")
    cost_from = models.IntegerField()
    cost_to = models.IntegerField()
    is_available = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Тур'
        verbose_name_plural = 'Туры'

    def __str__(self):
        return self.title_ru

    def get_title(self, lang):
        return getattr(self, f'title_{lang}', self.title_ru)

    def get_description(self, lang):
        return getattr(self, f'description_{lang}', self.description_ru)

    @classmethod
    def filter_tours(cls, lang: str, category_id: int = None, category_name: str = None):
        query_filter = Q()

        if category_id:
            query_filter &= Q(category_id=category_id)

        if category_name:
            query_filter &= Q(**{f"category__name_{lang}": category_name})

        return cls.objects.filter(query_filter).distinct()
