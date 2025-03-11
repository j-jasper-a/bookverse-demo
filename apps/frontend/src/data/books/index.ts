import { BookDTOType, BookSimpleDTOType, BookType } from "@bookverse-demo/libs";

export const getBooks = async ({
  page = 1,
  pageSize = 8,
  authorId,
  genreId,
}: {
  page?: number;
  pageSize?: number;
  authorId?: string;
  genreId?: string;
} = {}): Promise<{
  books: BookSimpleDTOType[];
  total: number;
  page: number;
  pageSize: number;
}> => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("pageSize", String(pageSize));

  if (authorId) {
    params.append("authorId", authorId);
  }
  if (genreId) {
    params.append("genreId", genreId);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BOOKVERSE_API_URL}/books?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return await response.json();
};

export const getBooksByIds = async (ids: string[]) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BOOKVERSE_API_URL}/books/ids?bookIds=${ids.join(",")}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return await response.json();
};

export const createBooksBatch = async ({ books }: { books: BookType[] }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BOOKVERSE_API_URL}/books/batch`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(books),
    },
  );

  return response.json();
};

export const getBookBySlug = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BOOKVERSE_API_URL}/books/slug/${slug}`,
  );

  const data: BookDTOType = await response.json();

  return data;
};
