import { Router } from "express";
import { createAuthor } from "../controllers/authorsControllers.js";

const router = Router();

router.post("/", createAuthor as any);

export const authorsRoutes = router;
