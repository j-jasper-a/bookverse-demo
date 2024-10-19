import { BookCard } from "@/components/books/book-card/book-card";
import { BookDto } from "@bookverse-demo/schemas";
import { Box, Typography } from "@mui/material";

type MoreByAuthorProps = {
  book: BookDto;
  moreBooks: BookDto[] | undefined;
};

export function MoreByAuthor({ book, moreBooks }: MoreByAuthorProps) {
  const author = book.authors?.[0];

  return (
    <Box className="flex w-full flex-col gap-4 md:items-end">
      <Typography variant="h2">More by {author.name}</Typography>
      <Box className="grid w-full grid-cols-3 gap-4 md:justify-self-end">
        {moreBooks &&
          moreBooks.map((book) => (
            <BookCard key={book.id} book={book} titleOnly />
          ))}
      </Box>
    </Box>
  );
}
