import { AuthorDTOSchema } from "../author";
import { GenreDTOSchema } from "../genre";
import { z } from "zod";

const FormatSchema = z.object({
  format: z.string(),
  isbn: z.string(),
  pageCount: z.number(),
  stockCount: z.number(),
  publisher: z.string(),
  publicationDate: z.string(),
  price: z.number(),
});

const BookSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  overview: z.record(z.string()),
  languages: z.array(z.string()),
  genreIds: z.array(z.string()),
  authorIds: z.array(z.string()),
  formats: z.array(FormatSchema),
  imageUrl: z.string().url(),
  metadata: z.object({
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime().optional(),
  }),
});

const BookDTOSchema = BookSchema.pick({
  id: true,
  slug: true,
  title: true,
  overview: true,
  languages: true,
  formats: true,
  imageUrl: true,
}).extend({
  authors: z.array(
    AuthorDTOSchema.pick({
      id: true,
      slug: true,
      name: true,
      biography: true,
      imageUrl: true,
    }),
  ),
  genres: z.array(GenreDTOSchema),
});

const BookSimpleDTOSchema = BookSchema.pick({
  id: true,
  slug: true,
  title: true,
  imageUrl: true,
}).extend({
  authors: z.array(AuthorDTOSchema.pick({ id: true, slug: true, name: true })),
  genres: z.array(GenreDTOSchema),
  price: FormatSchema.shape.price,
  stockCount: FormatSchema.shape.stockCount,
  isbn: FormatSchema.shape.isbn,
});

type BookType = z.infer<typeof BookSchema>;
type BookDTOType = z.infer<typeof BookDTOSchema>;
type BookSimpleDTOType = z.infer<typeof BookSimpleDTOSchema>;

export { BookSchema, BookDTOSchema, BookSimpleDTOSchema };
export type { BookType, BookDTOType, BookSimpleDTOType };
