import AuthorCard from "@/components/authors/AuthorCard";
import BookCard from "@/components/books/BookCard";
import { getAuthors } from "@/data/authors";
import { getBooks } from "@/data/books";
import { Container, Grid2 as Grid, Typography } from "@mui/material";

export default async function Home() {
  const authors = await getAuthors();

  return (
    <Container component={"main"} sx={{ py: 2 }}>
      <Grid container spacing={2}>
        {authors.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </Grid>
    </Container>
  );
}
