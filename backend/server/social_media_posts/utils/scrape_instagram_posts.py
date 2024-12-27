from itertools import islice
from typing import List

import instaloader
from django.utils.timezone import make_aware

from server.social_media_posts.dtos.social_media_post_dto import SocialMediaPostDTO


def scrape_instagram_posts(username: str) -> List[SocialMediaPostDTO]:
    loader = instaloader.Instaloader()
    profile = instaloader.Profile.from_username(loader.context, username)

    social_media_post_dto_list = []
    for post in islice(profile.get_posts(), 20):
        social_media_post_dto_list.append(
            SocialMediaPostDTO(
                image_url=post.url,
                description=post.caption,
                url=f"https://www.instagram.com/p/{post.shortcode}",
                post_date=make_aware(post.date),
                social_media="Instagram",
            )
        )

    return social_media_post_dto_list
