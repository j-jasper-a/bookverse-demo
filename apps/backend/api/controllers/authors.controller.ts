import { transform } from "../helpers/transform.js";
import { db } from "../index.js";
import { AuthorType } from "@bookverse-demo/libs";
import { NextFunction, Request, Response } from "express";

export const getAuthors = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const authorsSnapshot = await db.collection("authors").get();
    const authorsSimpleDTO = await Promise.all(
      authorsSnapshot.docs.map(async (doc) => {
        const authorRaw = doc.data() as AuthorType;
        const authorSimpleDTO =
          await transform.authors.rawToSimpleDTO(authorRaw);
        return authorSimpleDTO;
      }),
    );

    response.status(200).json(authorsSimpleDTO);
  } catch (error) {
    next(error);
  }
};

export const getAuthorBySlug = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const authorSlug = request.params.authorSlug;
    const authorSnapshot = await db
      .collection("authors")
      .where("slug", "==", authorSlug)
      .limit(1)
      .get();
    const authorRaw = authorSnapshot.docs[0].data() as AuthorType;
    const authorDTO = await transform.authors.rawToDTO(authorRaw);

    response.status(200).json(authorDTO);
  } catch (error) {
    next(error);
  }
};

export const getAuthorById = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const authorId = request.params.authorId;
    const authorSnapshot = await db.collection("authors").doc(authorId).get();
    const authorRaw = authorSnapshot.data() as AuthorType;
    const authorDTO = await transform.authors.rawToDTO(authorRaw);

    response.status(200).json(authorDTO);
  } catch (error) {
    next(error);
  }
};

export const getAuthorsByGenreId = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const genreId = request.params.genreId;
    const authorsSnapshot = await db
      .collection("authors")
      .where("genreIds", "array-contains", genreId)
      .get();
    const authorsSimpleDTO = await Promise.all(
      authorsSnapshot.docs.map(async (doc) => {
        const authorRaw = doc.data() as AuthorType;
        const authorSimpleDTO =
          await transform.authors.rawToSimpleDTO(authorRaw);
        return authorSimpleDTO;
      }),
    );

    response.status(200).json(authorsSimpleDTO);
  } catch (error) {
    next(error);
  }
};
