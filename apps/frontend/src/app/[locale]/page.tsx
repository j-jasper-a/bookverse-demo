import AuthorCard from "@/components/authors/AuthorCard";
import BookCard from "@/components/books/BookCard";
import GenreCard from "@/components/genres/GenreCard";
import { getAuthors } from "@/data/authors";
import { getBooks } from "@/data/books";
import { getGenres } from "@/data/genres";
import {
  Box,
  Container,
  Grid2 as Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";

export default async function Home() {
  const authors = await getAuthors();
  const booksResponse = await getBooks();
  const genres = await getGenres();

  return (
    <Container maxWidth={"xl"} component={"main"} sx={{ p: 2 }}>
      <Stack direction={"column"} sx={{ gap: 8 }}>
        <Box
          sx={{
            width: "100%",
            borderRadius: 8,
            aspectRatio: { xs: "1/1", sm: "auto" },
            overflow: "hidden",
            boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
          }}
        >
          <Image
            src="/ad.webp"
            alt="BookVerse Logo"
            width={1920}
            height={1920}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
        <Stack direction={"column"}>
          <Stack
            direction={"row"}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography variant={"h2"}>Books</Typography>
            <Link component={NextLink} variant="button" href="/books">
              Explore All Books
            </Link>
          </Stack>
          <Grid container spacing={2}>
            {booksResponse.books.slice(0, 6).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </Grid>
        </Stack>
        <Stack direction={"column"}>
          <Stack
            direction={"row"}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography variant={"h2"}>Authors</Typography>
            <Link component={NextLink} variant="button" href="/authors">
              Explore Authors
            </Link>
          </Stack>
          <Grid container spacing={2}>
            {authors.slice(0, 6).map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </Grid>
        </Stack>
        <Stack direction={"column"}>
          <Stack
            direction={"row"}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography variant={"h2"}>Genres</Typography>
            <Link component={NextLink} variant="button" href="/genres">
              Explore Genres
            </Link>
          </Stack>
          <Grid container spacing={2}>
            {genres.slice(0, 6).map((genre) => (
              <GenreCard key={genre.id} genre={genre} />
            ))}
          </Grid>
        </Stack>
        <footer>
          <Typography variant="subtitle1" align="center">
            Copyright © 2023. All rights reserved.
          </Typography>
        </footer>
      </Stack>
    </Container>
  );
}
