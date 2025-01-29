import { GenreDTOSchema } from "../genre";
import { z } from "zod";

const AuthorSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  genreIds: z.array(z.string()),
  biography: z.record(z.string()),
  imageUrl: z.string().url(),
  metadata: z.object({
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime().optional(),
  }),
});

const AuthorDTOSchema = AuthorSchema.pick({
  id: true,
  slug: true,
  name: true,
  biography: true,
  imageUrl: true,
}).extend({
  genres: z.array(GenreDTOSchema),
});

const AuthorSimpleDTOSchema = AuthorSchema.pick({
  id: true,
  slug: true,
  name: true,
  imageUrl: true,
});

type AuthorType = z.infer<typeof AuthorSchema>;
type AuthorDTOType = z.infer<typeof AuthorDTOSchema>;
type AuthorSimpleDTOType = z.infer<typeof AuthorSimpleDTOSchema>;

export { AuthorSchema, AuthorDTOSchema, AuthorSimpleDTOSchema };
export type { AuthorType, AuthorDTOType, AuthorSimpleDTOType };
