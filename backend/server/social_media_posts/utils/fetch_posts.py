"""
Utilities for adding social media posts from URLs.
"""

import logging
from typing import List

logger = logging.getLogger(__name__)


def add_posts_from_urls(urls: List[str], social_media: str) -> tuple[int, int]:
    """
    Add posts to database from URLs and fetch oEmbed data.
    Returns (added_count, skipped_count).
    """
    from server.social_media_posts.models import SocialMediaPost

    added = 0
    skipped = 0

    for url in urls:
        if SocialMediaPost.objects.filter(url=url).exists():
            skipped += 1
            continue

        try:
            post = SocialMediaPost.objects.create(
                url=url,
                social_media=social_media,
                is_active=True,
            )
            post.fetch_oembed()
            added += 1
        except Exception as e:
            logger.error(f"Failed to add post {url}: {e}")
            skipped += 1

    return added, skipped
