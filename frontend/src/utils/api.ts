export const fetchHomePageData = async (lang: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const [toursRes, categoriesRes, typesRes, notificationsRes] = await Promise.all([
      fetch(`${apiUrl}/tours/?lang=${lang}`),
      fetch(`${apiUrl}/tours/categories/?lang=${lang}`),
      fetch(`${apiUrl}/tours/types/?lang=${lang}`),
      fetch(`${apiUrl}/notifications/?lang=${lang}`),
    ]);

    const [tours, tourCategories, tourTypes, notifications] = await Promise.all(
      [toursRes.json(), categoriesRes.json(), typesRes.json(), notificationsRes.json()]
    );

    return {
      tours: Array.isArray(tours) ? tours : [],
      tourCategories: Array.isArray(tourCategories) ? tourCategories : [],
      tourTypes: Array.isArray(tourTypes) ? tourTypes : [],
      notifications: Array.isArray(notifications) ? notifications : [],
    };
  } catch (error) {
    console.error("Error fetching tours and categories:", error);
    return { tours: [], tourCategories: [], tourTypes: [], notifications: [] };
  }
};

export const fetchAboutMePageData = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const socialMediaPostsRes = await fetch(`${apiUrl}/social-media-posts/`);

    if (!socialMediaPostsRes.ok) {
      console.error("Failed to fetch social media posts:", socialMediaPostsRes.statusText);
      return { socialMediaPosts: [] };
    }

    const rawSocialMediaPosts = await socialMediaPostsRes.json();

    // Map to rename keys
    const socialMediaPosts = Array.isArray(rawSocialMediaPosts)
      ? rawSocialMediaPosts.map(post => ({
          id: post.id,
          imageUrl: post.image_url,
          description: post.description,
          url: post.url,
          postDate: post.post_date,
          socialMedia: post.social_media,
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


