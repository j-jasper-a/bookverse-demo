import { BookDto } from "@bookverse-demo/schemas";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

type InfoProps = {
  book: BookDto;
};

export function Info({ book }: InfoProps) {
  return (
    <Box className="flex flex-col">
      <Typography variant="h1">{book.name}</Typography>
      <Typography variant="subtitle2" className="mb-8">
        {book.authors[0].name}
      </Typography>
      <Typography variant="body1" className="mb-8">
        {book.overview}
      </Typography>
      <Box className="flex w-fit gap-4">
        <Box className="flex flex-col">
          <Typography variant="subtitle2">ISBN</Typography>
          <Typography variant="subtitle2">Publisher</Typography>
          <Typography variant="subtitle2">Date of Publishing</Typography>
          <Typography variant="subtitle2">Pages</Typography>
        </Box>
        <Box className="flex flex-col">
          <Typography variant="body1">{book.isbn}</Typography>
          <Typography variant="body1">{book.publisherName}</Typography>
          <Typography variant="body1">
            {dayjs(book.publishedAt).format("MMMM D, YYYY")}
          </Typography>
          <Typography variant="body1">{book.pageCount}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
