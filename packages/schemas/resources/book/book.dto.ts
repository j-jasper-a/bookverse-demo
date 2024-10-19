import { z } from "zod/v4";
import { AuthorDtoSchema } from "../author";
import { GenreDtoSchema } from "../genre";
import { BookSchema } from "./book.schema";

export const BookDtoSchema = BookSchema.pick({
  id: true,
  name: true,
  slug: true,
  overview: true,
  isbn: true,
  pageCount: true,
  publisherName: true,
  publishedAt: true,
  price: true,
  imageUrl: true,
}).extend({
  genres: z.array(GenreDtoSchema),
  authors: z.array(AuthorDtoSchema),
});

export type BookDto = z.infer<typeof BookDtoSchema>;
