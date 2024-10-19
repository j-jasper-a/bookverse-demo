import { z } from "zod/v4";

export const BookSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  overview: z.string(),
  genreIds: z.array(z.string()),
  authorIds: z.array(z.string()),
  isbn: z.string(),
  pageCount: z.number(),
  publisherName: z.string(),
  publishedAt: z.string(),
  price: z.number(),
  imageUrl: z.url(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime().optional(),
});

export type Book = z.infer<typeof BookSchema>;
