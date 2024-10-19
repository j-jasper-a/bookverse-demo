import { z } from "zod/v4";

export enum GenreName {
  "self-help" = "Self-help",
  "horror" = "Horror",
  "sci-fi" = "Science Fiction",
  "biography" = "Biography",
  "romance" = "Romance",
  "fantasy" = "Fantasy",
  "mystery" = "Mystery",
  "poetry" = "Poetry",
}

export const GenreSchema = z.object({
  id: z.string(),
  name: z.enum(Object.keys(GenreName) as [keyof typeof GenreName]),
  slug: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime().optional(),
});

export type Genre = z.infer<typeof GenreSchema>;
