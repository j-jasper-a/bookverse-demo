"use client";

import { RatingStack } from "@/components/books/reviews-section/rating-stack";
import { calculateReviewStats } from "@/lib/api/reviews";
import { ReviewDto } from "@bookverse-demo/schemas";
import { Box, CircularProgress, Rating, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

type CustomerReviewsSummaryProps = {
  reviews: ReviewDto[];
};

export function ReviewsOverview({ reviews }: CustomerReviewsSummaryProps) {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["reviews-stats", reviews[0]?.bookId],
    queryFn: () => calculateReviewStats(reviews[0]?.bookId || ""),
    enabled: !!reviews.length,
  });

  return (
    <Box className="flex w-full flex-col gap-2">
      <Typography variant="h2">Reception</Typography>
      {isLoading ? (
        <Box className="flex h-40 w-full items-center justify-center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box className="flex items-center gap-2">
            <Rating
              name="average-rating"
              value={stats?.averageRating || 0}
              readOnly
              className="text-primary"
              precision={0.1}
            />
            <Typography variant="subtitle2">{`${stats?.averageRating} out of 5`}</Typography>
          </Box>
          <Typography
            variant="body2"
            color="textSecondary"
          >{`${stats?.reviewCount} global ratings`}</Typography>
          {stats && <RatingStack stats={stats} />}
        </>
      )}
    </Box>
  );
}
