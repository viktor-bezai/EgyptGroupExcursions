from django.db import models
from django.db.models import Q
from django.utils.text import slugify
from django_ckeditor_5.fields import CKEditor5Field

from server.tours.models.tour_category import TourCategory
from server.tours.models.tour_type import TourType


class Tour(models.Model):
    image = models.ImageField(upload_to='tours', null=True, blank=True)
    title_ru = models.CharField(max_length=100, verbose_name="Название (Русский)")
    title_ua = models.CharField(max_length=100, verbose_name="Назва (Украiнська)")
    title_en = models.CharField(max_length=100, verbose_name="Title (English)")
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    category = models.ForeignKey(TourCategory, on_delete=models.CASCADE, related_name='tours')
    types = models.ManyToManyField(TourType, related_name='tours')
    description_ru = CKEditor5Field(verbose_name="Описание (Русский)")
    description_ua = CKEditor5Field(verbose_name="Опис (Украiнська)")
    description_en = CKEditor5Field(verbose_name="Description (English)")
    cost_from = models.IntegerField()
    cost_to = models.IntegerField()
    is_available = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Тур'
        verbose_name_plural = 'Туры'

    def __str__(self):
        return self.title_ru

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title_en)
        super().save(*args, **kwargs)

    def description_image_upload_to(self, filename):
        return f'tours/{self.id}/{filename}'

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
