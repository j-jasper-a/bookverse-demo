import { z } from "zod/v4";

export const AuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  biography: z.string(),
  imageUrl: z.url(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime().optional(),
});

export type Author = z.infer<typeof AuthorSchema>;
