import { BookSimpleDTOType } from "@bookverse-demo/libs";

export const searchBooks = async (query: string | null) => {
  try {
    if (!query || typeof query !== "string") {
      throw new Error("Search query is required and must be a string.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BOOKVERSE_API_URL}/search?query=${encodeURIComponent(
        query,
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch search results.");
    }

    const data = (await response.json()) as BookSimpleDTOType[];
    return data;
  } catch (error) {
    console.error("Error searching for books:", error);
    throw error;
  }
};
