import { BookDto } from "@bookverse-demo/schemas";
import { Box, Paper } from "@mui/material";
import Image from "next/image";

type CoverProps = {
  book: BookDto;
};

export function Cover({ book }: CoverProps) {
  return (
    <Box className="flex w-full flex-col items-center gap-4 md:items-start">
      <Paper className="shadow-none">
        <Image
          src={book.imageUrl}
          alt={book.name}
          width={300}
          height={450}
          className="size-full object-contain"
        />
      </Paper>
    </Box>
  );
}
