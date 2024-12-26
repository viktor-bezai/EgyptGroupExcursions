export const fetchHomePageData = async (lang: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const [toursRes, categoriesRes, typesRes] = await Promise.all([
      fetch(`${apiUrl}/tours/?lang=${lang}`),
      fetch(`${apiUrl}/tours/categories/?lang=${lang}`),
      fetch(`${apiUrl}/tours/types/?lang=${lang}`),
    ]);

    const [tours, tourCategories, tourTypes] = await Promise.all([toursRes.json(), categoriesRes.json(), typesRes.json()]);

    return {
      tours: Array.isArray(tours) ? tours : [],
      tourCategories: Array.isArray(tourCategories) ? tourCategories : [],
      tourTypes: Array.isArray(tourTypes) ? tourTypes : [],
    };
  } catch (error) {
    console.error("Error fetching tours and categories:", error);
    return { tours: [], tourCategories: [], tourTypes: [] };
  }
};
