"""
Management command to set up periodic tasks for social media post refreshing.
"""

from django.core.management.base import BaseCommand
from django_celery_beat.models import PeriodicTask, CrontabSchedule
import json


class Command(BaseCommand):
    help = "Set up periodic Celery tasks for refreshing social media posts"

    def handle(self, *args, **options):
        # Create crontab schedules
        # Daily at 6:00 AM UTC
        morning_schedule, _ = CrontabSchedule.objects.get_or_create(
            minute="0",
            hour="6",
            day_of_week="*",
            day_of_month="*",
            month_of_year="*",
        )

        # Daily at 18:00 (6 PM) UTC
        evening_schedule, _ = CrontabSchedule.objects.get_or_create(
            minute="0",
            hour="18",
            day_of_week="*",
            day_of_month="*",
            month_of_year="*",
        )

        # Create periodic task for refreshing all posts (morning)
        task_all_morning, created = PeriodicTask.objects.update_or_create(
            name="Refresh All Social Media Posts (Morning)",
            defaults={
                "task": "server.social_media_posts.tasks.refresh_all_posts_task",
                "crontab": morning_schedule,
                "enabled": True,
                "kwargs": json.dumps({}),
            },
        )

        if created:
            self.stdout.write(
                self.style.SUCCESS(
                    f"Created task: {task_all_morning.name}"
                )
            )
        else:
            self.stdout.write(
                self.style.WARNING(
                    f"Updated task: {task_all_morning.name}"
                )
            )

        # Create periodic task for refreshing all posts (evening)
        task_all_evening, created = PeriodicTask.objects.update_or_create(
            name="Refresh All Social Media Posts (Evening)",
            defaults={
                "task": "server.social_media_posts.tasks.refresh_all_posts_task",
                "crontab": evening_schedule,
                "enabled": True,
                "kwargs": json.dumps({}),
            },
        )

        if created:
            self.stdout.write(
                self.style.SUCCESS(
                    f"Created task: {task_all_evening.name}"
                )
            )
        else:
            self.stdout.write(
                self.style.WARNING(
                    f"Updated task: {task_all_evening.name}"
                )
            )

        self.stdout.write(
            self.style.SUCCESS(
                "\nPeriodic tasks setup complete!\n"
                "Tasks will run at 6:00 AM and 6:00 PM UTC daily.\n"
                "You can manage them in Django Admin > Periodic Tasks"
            )
        )
