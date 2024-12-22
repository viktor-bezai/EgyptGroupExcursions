export const fetchToursAndCategories = async (lang: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const [toursRes, categoriesRes] = await Promise.all([
      fetch(`${apiUrl}/tours/?lang=${lang}`),
      fetch(`${apiUrl}/tours/categories/?lang=${lang}`),
    ]);

    const [tours, categories] = await Promise.all([toursRes.json(), categoriesRes.json()]);

    return {
      tours: Array.isArray(tours) ? tours : [],
      categories: Array.isArray(categories) ? categories : [],
    };
  } catch (error) {
    console.error("Error fetching tours and categories:", error);
    return { tours: [], categories: [] };
  }
};
