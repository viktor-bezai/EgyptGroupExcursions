# Generated by Django 5.1.4 on 2024-12-30 00:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0007_tour_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tour',
            name='slug',
            field=models.SlugField(blank=True, max_length=120, unique=True),
        ),
    ]
