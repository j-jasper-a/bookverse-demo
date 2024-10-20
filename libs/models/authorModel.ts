import { z } from "zod";

export const AuthorSchema = z.object({
  id: z.string(),
  slug: z.string(),
  full_name: z.string(),
  display_name: z.string().nullable(),
  birth_date: z.string().datetime(),
  death_date: z.string().datetime().nullable(),
  birth_place: z.string(),
  genres: z.array(z.string()),
  biography: z.string(),
  image_url: z.string().url().nullable(),
  metadata: z.object({
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  }),
});

export type AuthorType = z.infer<typeof AuthorSchema>;
