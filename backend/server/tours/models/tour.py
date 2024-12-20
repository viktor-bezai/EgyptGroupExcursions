from django.db import models


class Tour(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    cost_from = models.IntegerField()
    cost_to = models.IntegerField()
    is_available = models.BooleanField(default=False)

    def __str__(self):
        return self.title
