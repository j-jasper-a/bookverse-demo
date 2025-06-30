import { Cover } from "@/components/books/main-section/cover";
import { Info } from "@/components/books/main-section/info";
import { Sales } from "@/components/books/main-section/sales";
import { BookDto } from "@bookverse-demo/schemas";
import { Box } from "@mui/material";

type MainSectionProps = {
  book: BookDto;
};

export function MainSection({ book }: MainSectionProps) {
  return (
    <Box className="grid grid-cols-1 gap-8 md:grid-cols-[16rem_1fr_12rem]">
      <Cover book={book} />
      <Info book={book} />
      <Sales book={book} />
    </Box>
  );
}
