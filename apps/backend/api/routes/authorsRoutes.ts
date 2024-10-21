import { Router } from "express";
import { createAuthor, getAuthors } from "../controllers/authorsControllers.js";

const router = Router();

router.get("/", getAuthors as any);
router.post("/", createAuthor as any);

export const authorsRoutes = router;
