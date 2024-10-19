import { z } from "zod/v4";

export const FindManyBooksQuerySchema = z.object({
  genreId: z.string().optional(),
  authorId: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(16).default(8),
});

export const FindBooksByIdsBodySchema = z.object({
  ids: z.array(z.string()).min(1).max(8),
});

export type FindManyBooksQuery = z.infer<typeof FindManyBooksQuerySchema>;
export type FindBooksByIdsBody = z.infer<typeof FindBooksByIdsBodySchema>;
