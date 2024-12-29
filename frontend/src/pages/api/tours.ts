import {Tour} from "@/pages/tours";

export const fetchTourBySlug = async (slug: string): Promise<Tour> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tours/slug/${slug}`);

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
