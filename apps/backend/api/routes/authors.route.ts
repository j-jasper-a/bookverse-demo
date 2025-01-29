import {
  getAuthors,
  getAuthorBySlug,
  getAuthorById,
  getAuthorsByGenreId,
} from "../controllers/authors.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", getAuthors);
router.get("/slug/:authorSlug", getAuthorBySlug);
router.get("/id/:authorId", getAuthorById);
router.get("/genre/:genreId", getAuthorsByGenreId);

export const authorsRouter = router;
