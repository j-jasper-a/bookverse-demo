import { authorsRouter } from "./routes/authors.route.js";
import { booksRouter } from "./routes/books.route.js";
import { genresRouter } from "./routes/genres.route.js";
import { searchRouter } from "./routes/search.route.js";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";

dotenv.config({ path: `.env.local` });

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/genres", genresRouter);
app.use("/authors", authorsRouter);
app.use("/books", booksRouter);
app.use("/search", searchRouter);

if (process.env.NODE_ENV === "development") {
  const port = 3000;
  app.listen(port, () => {
    console.log(`\n✓ The API is active → http://localhost:${port}`);
  });
}

export default app;
