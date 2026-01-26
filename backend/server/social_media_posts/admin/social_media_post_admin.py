from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import path, reverse
from django.utils.html import format_html

from server.social_media_posts.models import SocialMediaPost


class SocialMediaPostAdmin(admin.ModelAdmin):
    change_list_template = "admin/server/socialmediapost/change_list.html"
    list_display = [
        "id",
        "social_media",
        "short_url",
        "title_preview",
        "thumbnail_preview",
        "is_active",
        "display_order",
    ]
    list_display_links = ["id", "short_url"]
    list_filter = ("social_media", "is_active")
    list_editable = ("is_active", "display_order")
    search_fields = ("url", "title")
    ordering = ["display_order", "-id"]
    readonly_fields = ("oembed_preview", "thumbnail_preview_large")

    fieldsets = (
        (None, {"fields": ("url", "social_media", "is_active", "display_order")}),
        (
            "oEmbed Data (auto-fetched)",
            {
                "fields": ("oembed_html", "thumbnail_url", "title"),
                "classes": ("collapse",),
            },
        ),
        (
            "Preview",
            {
                "fields": ("thumbnail_preview_large", "oembed_preview"),
            },
        ),
    )

    actions = ["fetch_oembed_data", "activate_posts", "deactivate_posts"]

    def short_url(self, obj):
        """Display shortened URL."""
        if len(obj.url) > 50:
            return f"{obj.url[:50]}..."
        return obj.url

    short_url.short_description = "URL"

    def title_preview(self, obj):
        """Display shortened title."""
        if obj.title:
            if len(obj.title) > 40:
                return f"{obj.title[:40]}..."
            return obj.title
        return "-"

    title_preview.short_description = "Title"

    def thumbnail_preview(self, obj):
        """Display small thumbnail in list view."""
        if obj.thumbnail_url:
            return format_html(
                '<img src="{}" style="max-height: 50px; max-width: 80px; object-fit: cover;"/>',
                obj.thumbnail_url,
            )
        return "-"

    thumbnail_preview.short_description = "Thumbnail"

    def thumbnail_preview_large(self, obj):
        """Display larger thumbnail in detail view."""
        if obj.thumbnail_url:
            return format_html(
                '<img src="{}" style="max-height: 200px; max-width: 300px;"/>',
                obj.thumbnail_url,
            )
        return "No thumbnail available"

    thumbnail_preview_large.short_description = "Thumbnail Preview"

    def oembed_preview(self, obj):
        """Display oEmbed HTML preview."""
        if obj.oembed_html:
            return format_html(
                '<div style="max-width: 400px; border: 1px solid #ccc; padding: 10px;">{}</div>',
                obj.oembed_html,
            )
        return "No oEmbed data - save the post to fetch it"

    oembed_preview.short_description = "Embed Preview"

    def save_model(self, request, obj, form, change):
        """Auto-fetch oEmbed data when saving a new post."""
        super().save_model(request, obj, form, change)

        # Fetch oEmbed data if not present
        if not obj.oembed_html:
            if obj.fetch_oembed():
                self.message_user(request, f"oEmbed data fetched for {obj.url}")
            else:
                self.message_user(
                    request,
                    f"Could not fetch oEmbed data for {obj.url}",
                    level="WARNING",
                )

    @admin.action(description="Fetch oEmbed data for selected posts")
    def fetch_oembed_data(self, request, queryset):
        success_count = 0
        for post in queryset:
            if post.fetch_oembed():
                success_count += 1
        self.message_user(
            request, f"Fetched oEmbed data for {success_count}/{queryset.count()} posts"
        )

    @admin.action(description="Activate selected posts")
    def activate_posts(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, f"Activated {queryset.count()} posts")

    @admin.action(description="Deactivate selected posts")
    def deactivate_posts(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, f"Deactivated {queryset.count()} posts")

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "bulk-add/",
                self.admin_site.admin_view(self.bulk_add_posts_view),
                name="socialmediapost_bulk_add",
            ),
            path(
                "refresh-all/",
                self.admin_site.admin_view(self.refresh_all_posts_view),
                name="socialmediapost_refresh_all",
            ),
            path(
                "refresh-instagram/",
                self.admin_site.admin_view(self.refresh_instagram_posts_view),
                name="socialmediapost_refresh_instagram",
            ),
            path(
                "refresh-tiktok/",
                self.admin_site.admin_view(self.refresh_tiktok_posts_view),
                name="socialmediapost_refresh_tiktok",
            ),
        ]
        return custom_urls + urls

    def refresh_all_posts_view(self, request):
        """Trigger Celery task to refresh all posts."""
        from server.social_media_posts.tasks import refresh_all_posts_task

        refresh_all_posts_task.delay()
        self.message_user(
            request,
            "Refresh task started! Check Celery logs for progress.",
            level="SUCCESS",
        )
        return HttpResponseRedirect(
            reverse("admin:server_socialmediapost_changelist")
        )

    def refresh_instagram_posts_view(self, request):
        """Trigger Celery task to refresh Instagram posts."""
        from server.social_media_posts.tasks import refresh_instagram_posts_task

        refresh_instagram_posts_task.delay()
        self.message_user(
            request,
            "Instagram refresh task started! Check Celery logs for progress.",
            level="SUCCESS",
        )
        return HttpResponseRedirect(
            reverse("admin:server_socialmediapost_changelist")
        )

    def refresh_tiktok_posts_view(self, request):
        """Trigger Celery task to refresh TikTok posts."""
        from server.social_media_posts.tasks import refresh_tiktok_posts_task

        refresh_tiktok_posts_task.delay()
        self.message_user(
            request,
            "TikTok refresh task started! Check Celery logs for progress.",
            level="SUCCESS",
        )
        return HttpResponseRedirect(
            reverse("admin:server_socialmediapost_changelist")
        )

    def bulk_add_posts_view(self, request):
        """Bulk add posts from URLs."""
        from django.shortcuts import render
        from server.social_media_posts.utils.fetch_posts import add_posts_from_urls

        if request.method == "POST":
            urls_text = request.POST.get("urls", "")
            urls = [u.strip() for u in urls_text.split("\n") if u.strip()]

            instagram_urls = [u for u in urls if "instagram.com" in u]
            tiktok_urls = [u for u in urls if "tiktok.com" in u]

            total_added = 0
            total_skipped = 0

            if instagram_urls:
                added, skipped = add_posts_from_urls(
                    instagram_urls, SocialMediaPost.INSTAGRAM
                )
                total_added += added
                total_skipped += skipped

            if tiktok_urls:
                added, skipped = add_posts_from_urls(
                    tiktok_urls, SocialMediaPost.TIKTOK
                )
                total_added += added
                total_skipped += skipped

            self.message_user(
                request,
                f"Added {total_added} posts, skipped {total_skipped} (duplicates or errors)",
            )
            return HttpResponseRedirect(
                reverse("admin:server_socialmediapost_changelist")
            )

        context = {
            **self.admin_site.each_context(request),
            "title": "Bulk Add Social Media Posts",
            "opts": self.model._meta,
        }
        return render(request, "admin/server/socialmediapost/bulk_add.html", context)
