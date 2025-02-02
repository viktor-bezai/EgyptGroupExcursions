from django.contrib import admin

from .notifications.admin.notification_admin import NotificationAdmin
from .notifications.models import Notification
from .social_media_posts.admin.social_media_post_admin import SocialMediaPostAdmin
from .social_media_posts.models import SocialMediaPost
from .tours.admin.tour_admin import TourAdmin
from .tours.admin.tour_category_admin import TourCategoryAdmin
from .tours.admin.tour_type_admin import TourTypeAdmin
from .tours.models import Tour, TourCategory, TourType

admin.site.register(Tour, TourAdmin)
admin.site.register(TourCategory, TourCategoryAdmin)
admin.site.register(TourType, TourTypeAdmin)
admin.site.register(SocialMediaPost, SocialMediaPostAdmin)
admin.site.register(Notification, NotificationAdmin)
