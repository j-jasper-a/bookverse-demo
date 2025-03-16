import { transform } from "../helpers/transform.js";
import { db } from "../index.js";
import { BookType, BookSimpleDTOType } from "@bookverse-demo/libs";
import { NextFunction, Request, Response } from "express";

export const searchBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const snapshot = await db.collection("books").get();
    if (snapshot.empty) {
      return res.status(404).json({ message: "No books found" });
    }

    const lowerQuery = query.toLowerCase();

    const booksSimpleDTO: BookSimpleDTOType[] = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const bookRaw = doc.data() as BookType;
        return transform.books.rawToSimpleDTO(bookRaw);
      }),
    );

    const filteredBooks = booksSimpleDTO.filter((book) => {
      const matchesTitle = book.title.toLowerCase().includes(lowerQuery);
      const matchesAuthor = book.authors.some((author) =>
        author.name.toLowerCase().includes(lowerQuery),
      );
      const matchesGenre = book.genres.some((genre) =>
        genre.name.en.toLowerCase().includes(lowerQuery),
      );
      const matchesISBN = book.isbn.toLowerCase().includes(lowerQuery);
      return matchesTitle || matchesAuthor || matchesGenre || matchesISBN;
    });

    if (filteredBooks.length === 0) {
      return res.status(404).json({ message: "No matching books found" });
    }

    return res.status(200).json(filteredBooks);
  } catch (error) {
    next(error);
  }
};
