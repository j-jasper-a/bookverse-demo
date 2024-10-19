import { BookDto } from "@bookverse-demo/schemas";
import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";

type AboutAuthorProps = {
  book: BookDto;
};

export function AboutAuthor({ book }: AboutAuthorProps) {
  const author = book.authors?.[0];

  return (
    <Box className="flex w-full flex-col gap-4">
      <Typography variant="h2">About Author</Typography>
      <Box className="flex flex-col justify-center gap-4">
        <Paper className="relative aspect-[2/3] w-full max-w-32 overflow-hidden">
          <Image
            src={author.imageUrl}
            alt={author.name}
            fill
            className="size-full object-cover"
          />
        </Paper>
        <Typography variant="subtitle2">{author.name}</Typography>
        <Typography>{author.biography}</Typography>
      </Box>
    </Box>
  );
}
