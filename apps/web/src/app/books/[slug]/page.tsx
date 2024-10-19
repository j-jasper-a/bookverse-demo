"use client";

import { AuthorSection } from "@/components/books/author-section/author-section";
import { ReviewsSection } from "@/components/books/reviews-section/reviews-section";
import { findBookBySlug } from "@/lib/api/books";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import { useParams } from "next/navigation";

export default function BookPage() {
  const params = useParams<{ slug: string }>();
  const { slug } = params;
  const { data: book, isLoading } = useQuery({
    queryKey: ["book", slug],
    queryFn: () => findBookBySlug(slug),
  });

  return (
    <Box
      maxWidth="lg"
      className="mx-auto flex flex-col gap-8 px-4 py-8 md:px-8"
    >
      {isLoading || !book ? (
        <div>Loading...</div>
      ) : (
        <>
          <Breadcrumbs>
            <Link component={NextLink} href={"/books"}>
              Books
            </Link>
            <Typography variant="body2" color="textPrimary">
              {book.name}
            </Typography>
          </Breadcrumbs>
          <AuthorSection book={book} />
          <ReviewsSection book={book} />
        </>
      )}
    </Box>
  );
}
