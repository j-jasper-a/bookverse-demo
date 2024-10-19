import express from "express";
import cors from "cors";
import { helloFromLibs } from "@bookverse-demo/libs";
import { helloFromLibsInside } from "@bookverse-demo/libs/hello/hello.js";

/*
import admin from "firebase-admin";
import dotenv from "dotenv";


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

*/

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).json({
    local: `✅ "@bookverse-demo/backend" is active.`,
    importOne: helloFromLibs(),
    importTwo: helloFromLibsInside(),
  });
});

if (process.env.NODE_ENV === "development") {
  const port = 3000;
  app.listen(port, () => {
    console.log(`\n🚀 Server running at http://localhost:${port}`);
  });
}

export default app;
