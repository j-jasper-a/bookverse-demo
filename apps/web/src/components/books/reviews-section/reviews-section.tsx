"use client";

import { Review } from "@/components/books/reviews-section/review";
import { ReviewsOverview } from "@/components/books/reviews-section/reviews-overview";
import { findManyReviews } from "@/lib/api/reviews";
import { BookDto, FindManyReviewsQuery } from "@bookverse-demo/schemas";
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type ReviewsSectionProps = {
  book: BookDto;
};

export function ReviewsSection({ book }: ReviewsSectionProps) {
  const [activeReviewPage, setActiveReviewPage] = useState(1);

  const query: FindManyReviewsQuery = {
    bookId: book.id,
    page: activeReviewPage,
    limit: 4,
  };

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews", query.bookId, query.page, query.limit],
    queryFn: () => findManyReviews(query),
  });

  const handlePageChange = (_: unknown, newPage: number) => {
    setActiveReviewPage(newPage);
  };

  return (
    <Box>
      {isLoading ? (
        <Box className="flex h-40 w-full items-center justify-center">
          <CircularProgress />
        </Box>
      ) : (
        <Box className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
          <ReviewsOverview reviews={reviews?.reviews ?? []} />
          <Box className="flex flex-col gap-8 md:items-end">
            <Typography variant="h2">Reviews</Typography>
            {(reviews?.reviews ?? []).map((review) => (
              <Review key={review.id} review={review} />
            ))}
            <Pagination
              count={reviews?.totalPages || 1}
              page={Number(query.page) || 1}
              onChange={handlePageChange}
              className="mt-8 self-center"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
