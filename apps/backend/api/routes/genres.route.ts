import {
  getGenres,
  getGenreById,
  getGenreBySlug,
} from "../controllers/genres.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", getGenres);
router.get("/slug/:genreSlug", getGenreBySlug);
router.get("/id/:genreId", getGenreById);

export const genresRouter = router;
