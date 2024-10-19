import { z } from "zod/v4";

export const FindManyReviewsQuerySchema = z.object({
  userId: z.string().optional(),
  bookId: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(16).default(8),
});

export type FindManyReviewsQuery = z.infer<typeof FindManyReviewsQuerySchema>;
