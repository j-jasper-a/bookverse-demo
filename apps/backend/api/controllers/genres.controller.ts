import { transform } from "../helpers/transform.js";
import { db } from "../index.js";
import { GenreType } from "@bookverse-demo/libs";
import { NextFunction, Request, Response } from "express";

export const getGenres = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const genresSnapshot = await db.collection("genres").get();
    const genresDTO = await Promise.all(
      genresSnapshot.docs.map(async (doc) => {
        const genreRaw = doc.data() as GenreType;
        const genreDTO = await transform.genres.rawToDTO(genreRaw);
        return genreDTO;
      }),
    );
    response.status(200).json(genresDTO);
  } catch (error) {
    next(error);
  }
};

export const getGenreBySlug = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const genreSlug = request.params.genreSlug;
    const genreSnapshot = await db
      .collection("genres")
      .where("slug", "==", genreSlug)
      .limit(1)
      .get();
    const genreRaw = genreSnapshot.docs[0].data() as GenreType;
    const genreDTO = await transform.genres.rawToDTO(genreRaw);

    response.status(200).json(genreDTO);
  } catch (error) {
    next(error);
  }
};

export const getGenreById = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const genreId = request.params.genreId;
    const genreSnapshot = await db.collection("genres").doc(genreId).get();
    const genreRaw = genreSnapshot.data() as GenreType;
    const genreDTO = await transform.genres.rawToDTO(genreRaw);

    response.status(200).json(genreDTO);
  } catch (error) {
    next(error);
  }
};
