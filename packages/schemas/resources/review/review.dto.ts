import { z } from "zod/v4";
import { ReviewSchema } from "./review.schema";

const UserDtoSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  avatarUrl: z.string().optional(),
});

export const ReviewDtoSchema = ReviewSchema.pick({
  id: true,
  bookId: true,
  rating: true,
  title: true,
  body: true,
  helpfulCount: true,
  isVerifiedPurchase: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  user: UserDtoSchema,
});

export type ReviewDto = z.infer<typeof ReviewDtoSchema>;
