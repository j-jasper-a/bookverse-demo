import {
  AuthorSchema,
  AuthorType,
} from "@bookverse-demo/libs/models/authorModel.js";
import { NextFunction, Request, Response } from "express";
import { db } from "../index.js";

export const createAuthor = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const validatedBody = AuthorSchema.parse(request.body);
    const docRef = await db.collection("authors").add(validatedBody);
    await docRef.update({ id: docRef.id });
    const updatedDoc = await docRef.get();
    return response.status(201).json(updatedDoc.data());
  } catch (error) {
    return next(error);
  }
};
