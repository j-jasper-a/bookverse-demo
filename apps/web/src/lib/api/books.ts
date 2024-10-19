import { BookDto, FindManyBooksQuery } from "@bookverse-demo/schemas";

const BASE_URL = `${process.env.NEXT_PUBLIC_BOOKVERSE_API_URL}/api/books`;

async function apiFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `API error: ${res.status} ${res.statusText} - ${errorText}`,
    );
  }
  return res.json() as Promise<T>;
}

export async function findManyBooks(
  query?: FindManyBooksQuery,
): Promise<{ books: BookDto[]; totalPages: number }> {
  const params = new URLSearchParams();

  if (query?.genreId) params.set("genreId", query.genreId);
  if (query?.authorId) params.set("authorId", query.authorId);
  if (query?.page) params.set("page", String(query.page));
  if (query?.limit) params.set("limit", String(query.limit));

  const url = `${BASE_URL}${params.toString() ? `?${params.toString()}` : ""}`;
  return apiFetch<{ books: BookDto[]; totalPages: number }>(url);
}

export async function findBookById(id: string): Promise<BookDto> {
  if (!id) throw new Error("id is required");
  return apiFetch<BookDto>(`${BASE_URL}/${encodeURIComponent(id)}`);
}

export async function findBookBySlug(slug: string): Promise<BookDto> {
  if (!slug) throw new Error("slug is required");
  return apiFetch<BookDto>(`${BASE_URL}/slug/${encodeURIComponent(slug)}`);
}

export async function findBooksByIds(ids: string[]): Promise<BookDto[]> {
  if (!ids.length) return [];
  return apiFetch<BookDto[]>(`${BASE_URL}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
  });
}
