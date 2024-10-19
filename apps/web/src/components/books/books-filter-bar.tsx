"use client";

import { findManyGenres } from "@/lib/api/genres";
import { GenreName } from "@bookverse-demo/schemas";
import { Box, Link, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import NextLink from "next/link";

export function BooksFilterBar() {
  const { data: genres, isLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: findManyGenres,
  });

  return (
    <Box className="hidden w-48 flex-col gap-4 md:flex">
      <Typography className="font-heading text-2xl">Genres</Typography>
      <Box className="flex flex-col gap-1">
        <Link
          component={NextLink}
          href={`/books`}
          className="font-main text-primary text-nowrap text-sm no-underline"
        >
          All
        </Link>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Skeleton
                variant="text"
                key={index}
                className="font-main max-w-3/5 text-sm"
              />
            ))
          : genres?.map((genre) => (
              <Link
                component={NextLink}
                key={genre.id}
                href={`/books/?genreId=${genre.id}`}
                className="font-main text-primary text-nowrap text-sm no-underline"
              >
                {GenreName[genre.name]}
              </Link>
            ))}
      </Box>
    </Box>
  );
}
