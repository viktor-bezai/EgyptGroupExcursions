# Generated by Django 5.1.4 on 2024-12-27 17:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0002_tourtype_rename_category_tourcategory_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='SocialMediaPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_url', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('url', models.URLField()),
                ('post_date', models.DateTimeField(blank=True, null=True)),
                ('social_media', models.CharField(choices=[('Instagram', 'Instagram'), ('TikTok', 'TikTok')], max_length=100)),
            ],
            options={
                'verbose_name': 'Пост Социальной Сети',
                'verbose_name_plural': 'Посты Социальной Сети',
            },
        ),
    ]
