import { AuthorDto } from "@bookverse-demo/schemas";

const BASE_URL = `${process.env.NEXT_PUBLIC_BOOKVERSE_API_URL}/api/authors`;

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

export async function findManyAuthors(): Promise<AuthorDto[]> {
  return apiFetch<AuthorDto[]>(BASE_URL);
}

export async function findAuthorById(id: string): Promise<AuthorDto> {
  if (!id) throw new Error("id is required");
  return apiFetch<AuthorDto>(`${BASE_URL}/${encodeURIComponent(id)}`);
}

export async function findAuthorBySlug(slug: string): Promise<AuthorDto> {
  if (!slug) throw new Error("slug is required");
  return apiFetch<AuthorDto>(`${BASE_URL}/slug/${encodeURIComponent(slug)}`);
}
