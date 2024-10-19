import { z } from "zod/v4";
import { GenreSchema } from "./genre.schema";

export const GenreDtoSchema = GenreSchema.pick({
  id: true,
  name: true,
  slug: true,
});

export type GenreDto = z.infer<typeof GenreDtoSchema>;
