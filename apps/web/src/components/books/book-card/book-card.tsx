import { BookDto } from "@bookverse-demo/schemas";
import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type BookCardProps = {
  book: BookDto;
  titleOnly?: boolean;
};

export function BookCard({ book, titleOnly = false }: BookCardProps) {
  return (
    <Link href={`/books/${book.slug}`}>
      <Box component={"article"} className="flex flex-col gap-2">
        <Paper className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={book.imageUrl}
            alt={book.name}
            fill
            className="size-full object-cover"
          />
        </Paper>
        <Box className="flex flex-col">
          <Typography variant="subtitle1">{book.name}</Typography>
          {!titleOnly && <Typography>{book.authors[0].name}</Typography>}
        </Box>
      </Box>
    </Link>
  );
}
