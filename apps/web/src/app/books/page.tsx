"use client";

import { BookCard } from "@/components/books/book-card/book-card";
import { BookCardSkeleton } from "@/components/books/book-card/book-card-skeleton";
import { BooksFilterBar } from "@/components/books/books-filter-bar";
import { BooksFilterSelect } from "@/components/books/books-filter-select";
import { findManyBooks } from "@/lib/api/books";
import {
  FindManyBooksQuery,
  FindManyBooksQuerySchema,
} from "@bookverse-demo/schemas";
import { Box, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function BooksPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query: FindManyBooksQuery = FindManyBooksQuerySchema.parse({
    genreId: searchParams.get("genreId") || undefined,
    authorId: searchParams.get("authorId") || undefined,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 8,
  });

  const { data: booksData, isLoading } = useQuery({
    queryKey: ["books", query],
    queryFn: () => findManyBooks(query),
  });

  const handlePageChange = (_: unknown, newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Box maxWidth="lg" className="mx-auto px-4 py-8 md:px-8">
      <Box className="flex justify-between gap-8">
        <BooksFilterBar />
        <Box className="flex w-full flex-col gap-4">
          <BooksFilterSelect />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <BookCardSkeleton key={index} />
                ))
              : booksData?.books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
          </div>
          <Pagination
            count={booksData?.totalPages || 1}
            page={Number(query.page) || 1}
            onChange={handlePageChange}
            className="self-center"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default function BooksPage() {
  return (
    <Suspense>
      <BooksPageContent />
    </Suspense>
  );
}
