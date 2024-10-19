import { z } from "zod/v4";
import { AuthorSchema } from "./author.schema";

export const AuthorDtoSchema = AuthorSchema.pick({
  id: true,
  name: true,
  slug: true,
  biography: true,
  imageUrl: true,
});

export type AuthorDto = z.infer<typeof AuthorDtoSchema>;
