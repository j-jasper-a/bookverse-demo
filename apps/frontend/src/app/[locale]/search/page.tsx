"use client";

import BookCard from "@/components/books/BookCard";
import { searchBooks } from "@/data/search";
import { BookSimpleDTOType } from "@bookverse-demo/libs";
import {
  Container,
  Typography,
  CircularProgress,
  Grid2 as Grid,
  Box,
  Stack,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { LuSearchX as NotFoundIcon } from "react-icons/lu";

export default function Home() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const {
    data: results,
    isLoading,
    isError,
    error,
  } = useQuery<BookSimpleDTOType[]>({
    queryKey: ["searchBooks", query],
    queryFn: () => searchBooks(query),
    enabled: !!query,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <Container
      component={"main"}
      sx={{
        p: 2,
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Typography variant={"h2"}>
        {results?.length} results for "{query}"
      </Typography>

      {isLoading && (
        <CircularProgress sx={{ margin: "auto" }} size={64} color="warning" />
      )}

      {!isLoading && !isError && results && results.length > 0 && (
        <Grid container spacing={6} sx={{ width: "100%" }}>
          {results.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </Grid>
      )}
      {!isLoading && isError && (
        <Stack
          direction={"column"}
          sx={{
            margin: "auto",
            alignItems: "center",
            gap: 2,
          }}
        >
          <NotFoundIcon size={192} style={{ color: "#e0e0e0" }} />
          <Stack direction={"column"} sx={{ alignItems: "center", gap: 1 }}>
            <Typography variant="h3">No matching books were found.</Typography>
            <Typography color="text.secondary" variant="subtitle1">
              Please, try searching with a different keyword.
            </Typography>
          </Stack>
        </Stack>
      )}
    </Container>
  );
}
