"""
Celery tasks for refreshing social media posts.
"""

import logging
from celery import shared_task

logger = logging.getLogger(__name__)


@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def refresh_all_posts_task(self):
    """
    Refresh oEmbed data for all active social media posts.
    This fetches fresh CDN URLs that won't be expired.
    """
    from server.social_media_posts.models import SocialMediaPost

    posts = SocialMediaPost.objects.filter(is_active=True)
    success_count = 0
    failed_count = 0

    for post in posts:
        try:
            if post.fetch_oembed():
                success_count += 1
                logger.info(f"Refreshed oEmbed for {post.url}")
            else:
                failed_count += 1
                logger.warning(f"Failed to refresh oEmbed for {post.url}")
        except Exception as e:
            failed_count += 1
            logger.error(f"Error refreshing {post.url}: {e}")

    logger.info(f"Refresh complete: {success_count} success, {failed_count} failed")
    return {"success": success_count, "failed": failed_count}


@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def refresh_instagram_posts_task(self):
    """Refresh oEmbed data for all active Instagram posts."""
    from server.social_media_posts.models import SocialMediaPost

    posts = SocialMediaPost.objects.filter(
        is_active=True, social_media=SocialMediaPost.INSTAGRAM
    )
    success_count = 0
    failed_count = 0

    for post in posts:
        try:
            if post.fetch_oembed():
                success_count += 1
                logger.info(f"Refreshed Instagram oEmbed for {post.url}")
            else:
                failed_count += 1
        except Exception as e:
            failed_count += 1
            logger.error(f"Error refreshing Instagram {post.url}: {e}")

    logger.info(f"Instagram refresh: {success_count} success, {failed_count} failed")
    return {"success": success_count, "failed": failed_count}


@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def refresh_tiktok_posts_task(self):
    """Refresh oEmbed data for all active TikTok posts."""
    from server.social_media_posts.models import SocialMediaPost

    posts = SocialMediaPost.objects.filter(
        is_active=True, social_media=SocialMediaPost.TIKTOK
    )
    success_count = 0
    failed_count = 0

    for post in posts:
        try:
            if post.fetch_oembed():
                success_count += 1
                logger.info(f"Refreshed TikTok oEmbed for {post.url}")
            else:
                failed_count += 1
        except Exception as e:
            failed_count += 1
            logger.error(f"Error refreshing TikTok {post.url}: {e}")

    logger.info(f"TikTok refresh: {success_count} success, {failed_count} failed")
    return {"success": success_count, "failed": failed_count}


@shared_task(bind=True)
def refresh_single_post_task(self, post_id: int):
    """Refresh oEmbed data for a single post."""
    from server.social_media_posts.models import SocialMediaPost

    try:
        post = SocialMediaPost.objects.get(id=post_id)
        if post.fetch_oembed():
            logger.info(f"Refreshed oEmbed for post {post_id}")
            return {"success": True, "post_id": post_id}
        else:
            logger.warning(f"Failed to refresh oEmbed for post {post_id}")
            return {"success": False, "post_id": post_id}
    except SocialMediaPost.DoesNotExist:
        logger.error(f"Post {post_id} not found")
        return {"success": False, "error": "Post not found"}
    except Exception as e:
        logger.error(f"Error refreshing post {post_id}: {e}")
        return {"success": False, "error": str(e)}
