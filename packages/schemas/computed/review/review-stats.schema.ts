import { z } from "zod/v4";

export const ReviewStatsSchema = z.object({
  bookId: z.string(),
  averageRating: z.number().min(0).max(5),
  reviewCount: z.number().int().nonnegative(),
  starDistribution: z.object({
    one: z.int().nonnegative().default(0),
    two: z.int().nonnegative().default(0),
    three: z.int().nonnegative().default(0),
    four: z.int().nonnegative().default(0),
    five: z.int().nonnegative().default(0),
  }),
});

export type ReviewStats = z.infer<typeof ReviewStatsSchema>;
