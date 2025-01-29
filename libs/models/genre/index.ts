import { z } from "zod";

const GenreSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.record(z.string()),
  metadata: z.object({
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime().optional(),
  }),
});

const GenreDTOSchema = GenreSchema.pick({
  id: true,
  slug: true,
  name: true,
});

type GenreType = z.infer<typeof GenreSchema>;
type GenreDTOType = z.infer<typeof GenreDTOSchema>;

export { GenreSchema, GenreDTOSchema };
export type { GenreType, GenreDTOType };
