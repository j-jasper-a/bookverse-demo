import { db } from "../index.js";
import {
  GenreType,
  GenreDTOType,
  AuthorType,
  AuthorDTOType,
  AuthorSimpleDTOType,
  BookType,
  BookDTOType,
  BookSimpleDTOType,
} from "@bookverse-demo/libs";

export const transform = {
  genres: {
    rawToDTO: async (genreRaw: GenreType): Promise<GenreDTOType> => {
      const genreDTO: GenreDTOType = {
        id: genreRaw.id,
        slug: genreRaw.slug,
        name: genreRaw.name,
      };
      return genreDTO;
    },
  },
  authors: {
    rawToDTO: async (authorRaw: AuthorType): Promise<AuthorDTOType> => {
      const genres: AuthorDTOType["genres"] = await Promise.all(
        authorRaw.genreIds.map(async (genreId) => {
          const genreSnapshot = await db
            .collection("genres")
            .doc(genreId)
            .get();
          const genreRaw = genreSnapshot.data() as GenreType;
          const genreAuthorDTO: AuthorDTOType["genres"][number] = {
            id: genreId,
            slug: genreRaw.slug,
            name: genreRaw.name,
          };
          return genreAuthorDTO;
        }),
      );
      const authorDTO: AuthorDTOType = {
        id: authorRaw.id,
        slug: authorRaw.slug,
        name: authorRaw.name,
        biography: authorRaw.biography,
        imageUrl: authorRaw.imageUrl,
        genres,
      };
      return authorDTO;
    },
    rawToSimpleDTO: async (
      authorRaw: AuthorType,
    ): Promise<AuthorSimpleDTOType> => {
      const authorSimpleDTO: AuthorSimpleDTOType = {
        id: authorRaw.id,
        slug: authorRaw.slug,
        name: authorRaw.name,
        imageUrl: authorRaw.imageUrl,
      };
      return authorSimpleDTO;
    },
  },
  books: {
    rawToDTO: async (bookRaw: BookType): Promise<BookDTOType> => {
      const authors: BookDTOType["authors"] = await Promise.all(
        bookRaw.authorIds.map(async (authorId) => {
          const authorSnapshot = await db
            .collection("authors")
            .doc(authorId)
            .get();
          const authorRaw = authorSnapshot.data() as AuthorType;
          const authorBookDTO: BookDTOType["authors"][number] = {
            id: authorId,
            slug: authorRaw.slug,
            name: authorRaw.name,
            biography: authorRaw.biography,
            imageUrl: authorRaw.imageUrl,
          };

          return authorBookDTO;
        }),
      );
      const genres: BookDTOType["genres"] = await Promise.all(
        bookRaw.genreIds.map(async (genreId) => {
          const genreSnapshot = await db
            .collection("genres")
            .doc(genreId)
            .get();
          const genreRaw = genreSnapshot.data() as GenreType;

          const genreBookDTO: BookDTOType["genres"][number] = {
            id: genreId,
            slug: genreRaw.slug,
            name: genreRaw.name,
          };
          return genreBookDTO;
        }),
      );
      const bookDTO: BookDTOType = {
        id: bookRaw.id,
        slug: bookRaw.slug,
        title: bookRaw.title,
        overview: bookRaw.overview,
        languages: bookRaw.languages,
        formats: bookRaw.formats,
        authors,
        imageUrl: bookRaw.imageUrl,
        genres,
      };

      return bookDTO;
    },
    rawToSimpleDTO: async (bookRaw: BookType): Promise<BookSimpleDTOType> => {
      const authors: BookSimpleDTOType["authors"] = await Promise.all(
        bookRaw.authorIds.map(async (authorId) => {
          const authorSnapshot = await db
            .collection("authors")
            .doc(authorId)
            .get();
          const authorRaw = authorSnapshot.data() as AuthorType;
          const authorBookSimpleDTO: BookSimpleDTOType["authors"][number] = {
            id: authorId,
            slug: authorRaw.slug,
            name: authorRaw.name,
          };

          return authorBookSimpleDTO;
        }),
      );
      const bookSimpleDTO: BookSimpleDTOType = {
        id: bookRaw.id,
        slug: bookRaw.slug,
        title: bookRaw.title,
        imageUrl: bookRaw.imageUrl,
        price: bookRaw.formats[0].price,
        stockCount: bookRaw.formats.reduce(
          (acc, format) => acc + format.stockCount,
          0,
        ),
        authors,
      };

      return bookSimpleDTO;
    },
  },
};
