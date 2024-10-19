import {
  FindManyReviewsQuery,
  ReviewDto,
  ReviewStats,
} from "@bookverse-demo/schemas";

const BASE_URL = `${process.env.NEXT_PUBLIC_BOOKVERSE_API_URL}/api/reviews`;

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

export async function findManyReviews(
  query: FindManyReviewsQuery,
): Promise<{ reviews: ReviewDto[]; totalPages: number }> {
  const params = new URLSearchParams();

  if (query.userId) params.set("userId", query.userId);
  if (query.bookId) params.set("bookId", query.bookId);
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));

  const url = `${BASE_URL}${params.toString() ? `?${params.toString()}` : ""}`;
  return apiFetch<{ reviews: ReviewDto[]; totalPages: number }>(url);
}

export async function calculateReviewStats(
  bookId: string,
): Promise<ReviewStats> {
  const url = `${BASE_URL}/stats/${bookId}`;
  return apiFetch<ReviewStats>(url);
}
