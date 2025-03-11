import { transform } from "../helpers/transform.js";
import { db } from "../index.js";
import { BookType } from "@bookverse-demo/libs";
import { NextFunction, Request, Response } from "express";

export const getBooksRaw = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const booksSnapshot = await db.collection("books").get();
    const booksData = await Promise.all(
      booksSnapshot.docs.map(async (doc) => doc.data()),
    );
    response.status(200).json(booksData);
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const page = parseInt(request.query.page as string) || 1;
    const pageSize = parseInt(request.query.pageSize as string) || 8;

    const booksRef = db.collection("books");
    let query: FirebaseFirestore.Query = booksRef;

    // Use array-contains for filtering based on array fields in your schema
    if (request.query.authorId) {
      query = query.where(
        "authorIds",
        "array-contains",
        request.query.authorId,
      );
    }
    if (request.query.genreId) {
      query = query.where("genreIds", "array-contains", request.query.genreId);
    }

    // Order by title and prepare the paginated query
    const filteredQuery = query.orderBy("title");

    // Get the total count for the filtered query
    const totalBooksSnapshot = await filteredQuery.get();
    const totalBooksCount = totalBooksSnapshot.size;

    // Get the paginated result
    const booksSnapshot = await filteredQuery
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .get();

    const booksSimpleDTO = await Promise.all(
      booksSnapshot.docs.map(async (doc) => {
        const bookRaw = doc.data() as BookType;
        const bookSimpleDTO = await transform.books.rawToSimpleDTO(bookRaw);
        return bookSimpleDTO;
      }),
    );

    response.status(200).json({
      books: booksSimpleDTO,
      total: totalBooksCount,
      page,
      pageSize,
    });
  } catch (error) {
    next(error);
  }
};

export const getBooksByIds = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const bookIds = request.query.bookIds as string;

    if (!bookIds)
      response.status(400).json("booksIds query parameter is required");

    const bookIdsArray = bookIds.split(",");
    const booksSnapshot = await db
      .collection("books")
      .where("id", "in", bookIdsArray)
      .get();

    if (booksSnapshot.empty)
      response.status(404).json("No books found for the given IDs");

    const booksSimpleDTO = await Promise.all(
      booksSnapshot.docs.map(async (doc) => {
        const bookRaw = doc.data() as BookType;
        const bookSimpleDTO = await transform.books.rawToSimpleDTO(bookRaw);
        return bookSimpleDTO;
      }),
    );

    response.status(200).json(booksSimpleDTO);
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const bookId = request.params.bookId;
    const bookSnapshot = await db.collection("books").doc(bookId).get();
    const bookRaw = bookSnapshot.data() as BookType;
    const bookDTO = await transform.books.rawToDTO(bookRaw);

    response.status(200).json(bookDTO);
  } catch (error) {
    next(error);
  }
};

export const getBookBySlug = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const bookSlug = request.params.bookSlug;
    const bookSnapshot = await db
      .collection("books")
      .where("slug", "==", bookSlug)
      .limit(1)
      .get();
    const bookRaw = bookSnapshot.docs[0].data() as BookType;
    const bookDTO = await transform.books.rawToDTO(bookRaw);

    response.status(200).json(bookDTO);
  } catch (error) {
    next(error);
  }
};

export const getBooksByAuthorId = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const authorId = request.params.authorId;
    const booksSnapshot = await db
      .collection("books")
      .where("authorIds", "array-contains", authorId)
      .get();
    const books = await Promise.all(
      booksSnapshot.docs.map(async (doc) => {
        const bookRaw = doc.data() as BookType;
        const bookSimpleDTO = await transform.books.rawToSimpleDTO(bookRaw);
        return bookSimpleDTO;
      }),
    );

    response.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const getBooksByGenreId = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const genreId = request.params.genreId;
    const booksSnapshot = await db
      .collection("books")
      .where("genreIds", "array-contains", genreId)
      .get();
    const booksSimpleDTO = await Promise.all(
      booksSnapshot.docs.map(async (doc) => {
        const bookRaw = doc.data() as BookType;
        const bookSimpleDTO = await transform.books.rawToSimpleDTO(bookRaw);
        return bookSimpleDTO;
      }),
    );
    response.status(200).json(booksSimpleDTO);
  } catch (error) {
    next(error);
  }
};

export const createBook = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const book = request.body as BookType;
    const bookRef = db.collection("books").doc(book.id);
    await bookRef.set(book);
    response.status(200).json("The book has been created successfully.");
  } catch (error) {
    next(error);
  }
};

export const createBooksBatch = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const books = request.body as BookType[];
    const batch = db.batch();
    for (const book of books) {
      const bookRef = db.collection("books").doc(book.id);
      batch.set(bookRef, book);
    }
    await batch.commit();
    response.status(200).json("All books have been created successfully.");
  } catch (error) {
    next(error);
  }
};
