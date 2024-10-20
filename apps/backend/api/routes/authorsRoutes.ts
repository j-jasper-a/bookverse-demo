import { createAuthor } from "@/controllers/authorsControllers.js";
import { Router } from "express";

const router = Router();

router.post("/", createAuthor as any);

export const authorsRoutes = router;
