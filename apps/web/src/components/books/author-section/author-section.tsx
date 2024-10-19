import { AboutAuthor } from "@/components/books/author-section/about-author";
import { MoreByAuthor } from "@/components/books/author-section/more-by-author";
import { findManyBooks } from "@/lib/api/books";
import { BookDto } from "@bookverse-demo/schemas";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

type AboutAuthorProps = {
  book: BookDto;
};

export function AuthorSection({ book }: AboutAuthorProps) {
  const author = book.authors?.[0];
  const { data: moreBooks } = useQuery({
    queryKey: ["more-books", author?.id],
    queryFn: () => findManyBooks({ authorId: author?.id, limit: 4, page: 1 }),
  });

  const moreBooksFiltered = moreBooks?.books.filter((b) => b.id !== book.id);

  return (
    <Box className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
      <AboutAuthor book={book} />
      <MoreByAuthor book={book} moreBooks={moreBooksFiltered} />
    </Box>
  );
}
