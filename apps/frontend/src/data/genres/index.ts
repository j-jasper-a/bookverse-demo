import { GenreDTOType } from "@bookverse-demo/libs";

export const getGenres = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BOOKVERSE_API_URL}/genres`,
  );
  const data = (await response.json()) as GenreDTOType[];

  return data;
};
