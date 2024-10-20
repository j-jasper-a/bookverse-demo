import { z } from "zod";

export const BookSchema = z.object({
  id: z.string(),
  isbn: z.string(),
  asin: z.string().nullable(),
  slug: z.string(),
  title: z.string(),
  language: z.string(),
  author_id: z.string(),
  publisher: z.string(),
  published_date: z.string().datetime(),
  genres: z.array(z.string()),
  biography: z.string(),
  cover_image_url: z.string().url().nullable(),
  metadata: z.object({
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  }),
});
export type BookType = z.infer<typeof BookSchema>;
