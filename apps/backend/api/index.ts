import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";
import { authorsRoutes } from "@/routes/authorsRoutes.js";

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

app.use("/authors", authorsRoutes);

if (process.env.NODE_ENV === "development") {
  const port = 3000;
  app.listen(port, () => {
    console.log(`\n🚀 Server running at http://localhost:${port}`);
  });
}

export default app;
