import { transform } from "../helpers/transform.js";
import { db } from "../index.js";
import { BookDTOType, BookType, BookSimpleDTOType } from "@bookverse-demo/libs";
import { NextFunction, Request, Response } from "express";

export const searchBooks = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { query } = request.query;
    if (!query || typeof query !== "string") {
      response.status(400).json({ message: "Search query is required" });
    }

    const snapshot = await db.collection("books").get();
    if (snapshot.empty) {
      response.status(404).json({ message: "No books found" });
    }

    const lowerQuery = (query as string).toLowerCase();

    const booksSimpleDTO = (
      await Promise.all(
        snapshot.docs.map(async (doc) => {
          const bookRaw = doc.data() as BookType;
          const bookDTO = await transform.books.rawToDTO(bookRaw);

          if (
            bookDTO.formats.some((format) =>
              format.isbn.toLowerCase().includes(lowerQuery),
            ) ||
            bookDTO.title.toLowerCase().includes(lowerQuery) ||
            bookDTO.authors.some((author) =>
              author.name.toLowerCase().includes(lowerQuery),
            ) ||
            bookDTO.genres.some((genre) =>
              genre.name.en.toLowerCase().includes(lowerQuery),
            )
          ) {
            const bookSimpleDTO = await transform.books.rawToSimpleDTO(bookRaw);
            return { ...bookSimpleDTO };
          }
          return null;
        }),
      )
    ).filter((book) => book !== null) as BookSimpleDTOType[];

    if (booksSimpleDTO.length === 0) {
      response.status(404).json({ message: "No matching books found" });
    }

    response.status(200).json(booksSimpleDTO);
  } catch (error) {
    next(error);
  }
};
