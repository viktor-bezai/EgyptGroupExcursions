# Generated by Django 5.1.4 on 2024-12-28 20:51

import django_ckeditor_5.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0004_alter_socialmediapost_image_url'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title_ru', models.CharField(max_length=100, verbose_name='Название (Русский)')),
                ('title_ukr', models.CharField(max_length=100, verbose_name='Назва (Украiнська)')),
                ('title_en', models.CharField(max_length=100, verbose_name='Title (English)')),
                ('description_ru', django_ckeditor_5.fields.CKEditor5Field(verbose_name='Описание (Русский)')),
                ('description_ukr', django_ckeditor_5.fields.CKEditor5Field(verbose_name='Опис (Украiнська)')),
                ('description_en', django_ckeditor_5.fields.CKEditor5Field(verbose_name='Description (English)')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Уведомление',
                'verbose_name_plural': 'Уведомления',
            },
        ),
    ]
