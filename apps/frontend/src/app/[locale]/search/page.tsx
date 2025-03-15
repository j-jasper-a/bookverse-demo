"use client";

import BookCard from "@/components/books/BookCard";
import { searchBooks } from "@/data/search";
import { BookSimpleDTOType } from "@bookverse-demo/libs";
import {
  Container,
  Typography,
  CircularProgress,
  List,
  Grid2 as Grid,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

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
  });

  return (
    <Container component={"main"} sx={{ p: 2 }}>
      <Typography variant={"h2"}>You are searching: {query}</Typography>

      {isLoading && <CircularProgress />}

      {isError && (
        <Typography color="error" variant="body1">
          No results found.
        </Typography>
      )}

      {!isLoading && !isError && results && results.length > 0 && (
        <Grid container spacing={6} sx={{ width: "100%" }}>
          {results.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </Grid>
      )}

      {!isLoading && !isError && results && results.length === 0 && (
        <Typography variant="body1">No results found.</Typography>
      )}
    </Container>
  );
}
