import {
  getBooks,
  getBooksByIds,
  getBookById,
  getBookBySlug,
  getBooksByAuthorId,
  getBooksByGenreId,
  createBooksBatch,
  createBook,
  getBooksRaw,
} from "../controllers/books.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", getBooks);
router.get("/ids", getBooksByIds);
router.get("/raw", getBooksRaw);
router.get("/slug/:bookSlug", getBookBySlug);
router.get("/id/:bookId", getBookById);
router.get("/author/:authorId", getBooksByAuthorId);
router.get("/genre/:genreId", getBooksByGenreId);
router.post("/", createBook);
router.post("/batch/", createBooksBatch);

export const booksRouter = router;
