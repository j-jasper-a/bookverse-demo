import { searchBooks } from "../controllers/search.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", searchBooks);

export const searchRouter = router;
