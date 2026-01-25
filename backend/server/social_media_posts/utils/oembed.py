"""
oEmbed utilities for fetching embed data from Instagram and TikTok.
"""

import logging
import requests
from typing import Optional
from dataclasses import dataclass

logger = logging.getLogger(__name__)


@dataclass
class OEmbedData:
    """Data returned from oEmbed API."""

    html: str
    thumbnail_url: Optional[str] = None
    title: Optional[str] = None
    author_name: Optional[str] = None
    author_url: Optional[str] = None


def fetch_tiktok_oembed(url: str) -> Optional[OEmbedData]:
    """
    Fetch oEmbed data from TikTok.
    TikTok's oEmbed API is free and doesn't require authentication.

    Args:
        url: TikTok video URL (e.g., https://www.tiktok.com/@user/video/123)

    Returns:
        OEmbedData or None if failed
    """
    try:
        oembed_url = f"https://www.tiktok.com/oembed?url={url}"
        response = requests.get(oembed_url, timeout=10)
        response.raise_for_status()

        data = response.json()
        return OEmbedData(
            html=data.get("html", ""),
            thumbnail_url=data.get("thumbnail_url"),
            title=data.get("title"),
            author_name=data.get("author_name"),
            author_url=data.get("author_url"),
        )
    except Exception as e:
        logger.error(f"Failed to fetch TikTok oEmbed for {url}: {e}")
        return None


def fetch_instagram_oembed(url: str) -> Optional[OEmbedData]:
    """
    Fetch oEmbed data from Instagram.

    Note: Instagram's official oEmbed API requires Facebook Graph API access token.
    We use an alternative approach - constructing the embed URL directly.

    Args:
        url: Instagram post URL (e.g., https://www.instagram.com/p/ABC123/)

    Returns:
        OEmbedData or None if failed
    """
    try:
        # Extract shortcode from URL
        # URLs can be like:
        # https://www.instagram.com/p/ABC123/
        # https://www.instagram.com/reel/ABC123/
        shortcode = None
        if "/p/" in url:
            shortcode = url.split("/p/")[1].split("/")[0].split("?")[0]
        elif "/reel/" in url:
            shortcode = url.split("/reel/")[1].split("/")[0].split("?")[0]

        if not shortcode:
            logger.error(f"Could not extract shortcode from Instagram URL: {url}")
            return None

        # Build embed HTML directly (Instagram's embed iframe)
        embed_html = f'''<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="{url}" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>'''

        return OEmbedData(
            html=embed_html,
            thumbnail_url=None,  # Instagram doesn't provide this easily
            title=None,
            author_name=None,
            author_url=None,
        )
    except Exception as e:
        logger.error(f"Failed to create Instagram embed for {url}: {e}")
        return None


def fetch_oembed(url: str, platform: str) -> Optional[OEmbedData]:
    """
    Fetch oEmbed data based on platform.

    Args:
        url: Post URL
        platform: 'Instagram' or 'TikTok'

    Returns:
        OEmbedData or None if failed
    """
    if platform.lower() == "tiktok":
        return fetch_tiktok_oembed(url)
    elif platform.lower() == "instagram":
        return fetch_instagram_oembed(url)
    else:
        logger.error(f"Unknown platform: {platform}")
        return None
