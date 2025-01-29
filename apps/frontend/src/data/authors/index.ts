import { AuthorSimpleDTOType } from "@bookverse-demo/libs";

export const getAuthors = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BOOKVERSE_API_URL}/authors`,
  );
  const data = (await response.json()) as AuthorSimpleDTOType[];

  return data;
};
