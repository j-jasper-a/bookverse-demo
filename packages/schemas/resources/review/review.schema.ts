import { z } from "zod/v4";

export const ReviewSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  userId: z.string(),
  rating: z.int().min(1).max(5),
  title: z.string(),
  body: z.string(),
  helpfulCount: z.int().nonnegative(),
  isVerifiedPurchase: z.boolean(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime().optional(),
});

export type Review = z.infer<typeof ReviewSchema>;
