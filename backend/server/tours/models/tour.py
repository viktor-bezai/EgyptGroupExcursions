from django.db import models
from django.db.models import Q

from server.tours.models.category import Category


class Tour(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='tours')
    title = models.CharField(max_length=100)
    description = models.TextField()
    cost_from = models.IntegerField()
    cost_to = models.IntegerField()
    is_available = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    @classmethod
    def filter_tours(cls, category_id: int, category_name: str):
        query_filter = Q()

        if category_id:
            query_filter &= Q(category_id=category_id)
        if category_name:
            query_filter &= Q(category__name=category_name)

        return cls.objects.filter(query_filter).distinct()
