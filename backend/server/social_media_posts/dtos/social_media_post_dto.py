import datetime
from dataclasses import dataclass
from typing import Optional


@dataclass
class SocialMediaPostDTO:
    image_url: str
    description: Optional[str]
    url: str
    post_date: datetime
    social_media: str
