import { BookDto } from "@bookverse-demo/schemas";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

type InfoSectionProps = {
  book: BookDto;
};

export function InfoSection({ book }: InfoSectionProps) {
  return (
    <Box className="flex flex-col justify-between gap-8 md:flex-row md:gap-16">
      <Box className="flex w-full flex-col gap-4">
        <Typography variant="h2">Details</Typography>
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
      <Box className="flex w-full flex-col gap-4">
        <Typography variant="h2">Overview</Typography>
        <Typography variant="body1">{book.overview}</Typography>
      </Box>
    </Box>
  );
}
