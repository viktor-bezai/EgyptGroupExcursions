// Use internal URL for SSR (server-side), public URL for client-side
const getApiUrl = () => {
  if (typeof window === "undefined") {
    // Server-side: use Docker service name
    return process.env.INTERNAL_API_URL || "http://backend:8000/api/v1";
  }
  // Client-side: use public URL
  return process.env.NEXT_PUBLIC_API_BASE_URL;
};

export const fetchHomePageData = async (lang: string) => {
  const apiUrl = getApiUrl();

  try {
    const [toursRes, categoriesRes, typesRes] = await Promise.all([
      fetch(`${apiUrl}/tours/?lang=${lang}`),
      fetch(`${apiUrl}/tours/categories/?lang=${lang}`),
      fetch(`${apiUrl}/tours/types/?lang=${lang}`),
    ]);

    const [tours, tourCategories, tourTypes] = await Promise.all([
      toursRes.json(),
      categoriesRes.json(),
      typesRes.json(),
    ]);

    return {
      tours: Array.isArray(tours) ? tours : [],
      tourCategories: Array.isArray(tourCategories) ? tourCategories : [],
      tourTypes: Array.isArray(tourTypes) ? tourTypes : [],
    };
  } catch (error) {
    console.error("Error fetching tours, tourCategories and tourTypes:", error);
    return { tours: [], tourCategories: [], tourTypes: [] };
  }
};

export const fetchAboutMePageData = async () => {
  const apiUrl = getApiUrl();

  try {
    const socialMediaPostsRes = await fetch(`${apiUrl}/social-media-posts/`);

    if (!socialMediaPostsRes.ok) {
      console.error(
        "Failed to fetch social media posts:",
        socialMediaPostsRes.statusText,
      );
      return { socialMediaPosts: [] };
    }

    const rawSocialMediaPosts = await socialMediaPostsRes.json();

    // Map to rename keys
    const socialMediaPosts = Array.isArray(rawSocialMediaPosts)
      ? rawSocialMediaPosts.map((post) => ({
          id: post.id,
          url: post.url,
          socialMedia: post.social_media,
          oembedHtml: post.oembed_html,
          thumbnailUrl: post.thumbnail_url,
          title: post.title,
        }))
      : [];

    return {
      socialMediaPosts,
    };
  } catch (error) {
    console.error("Error fetching social media posts:", error);
    return { socialMediaPosts: [] };
  }
};

export const fetchNotificationsData = async (lang: string) => {
  const apiUrl = getApiUrl();

  try {
    const [notificationsRes] = await Promise.all([
      fetch(`${apiUrl}/notifications/?lang=${lang}`),
    ]);

    const [notifications] = await Promise.all([notificationsRes.json()]);

    return {
      notifications: Array.isArray(notifications) ? notifications : [],
    };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return { notifications: [] };
  }
};
