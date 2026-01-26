from rest_framework.throttling import SimpleRateThrottle


class MysticalEgyptThrottle(SimpleRateThrottle):
    scope = "default"

    def allow_request(self, request, view):
        # Dynamically determine rate based on the referer
        referer = request.META.get("HTTP_REFERER", "")
        if referer.startswith("https://mystical-egypt-travels.online"):
            self.rate = "6/s"  # 2 requests per second
        else:
            self.rate = "2/s"  # 1 request per second

        # Call the parent method to enforce throttling
        return super().allow_request(request, view)

    def get_cache_key(self, request, view):
        # Generate a unique cache key based on the client IP
        if self.scope == "default":
            ident = self.get_ident(request)
            return f"throttle_{self.scope}_{ident}"
        return None
