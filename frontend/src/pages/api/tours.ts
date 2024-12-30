import {Tour} from "@/pages/tours";

export const fetchTourBySlug = async (slug: string, lang: string): Promise<Tour> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tours/slug/${slug}/?lang=${lang}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch tour data: ${response.statusText}`);
    }

    const data: Tour = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tour data:", error);
    throw error;
  }
};

export const fetchAllTours = async (lang: string = 'ru'): Promise<Tour[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const response = await fetch(`${apiUrl}/tours/?lang=${lang}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch tours: ${response.statusText}`);
    }

    const tours = await response.json();
    return Array.isArray(tours) ? tours : [];
  } catch (error) {
    console.error('Error fetching tours:', error);
    return [];
  }
};
