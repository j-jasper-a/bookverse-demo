"use client";

import BookCard from "@/components/books/BookCard";
import BooksFilter from "@/components/books/BooksFilter";
import { getBooks } from "@/data/books";
import {
  Breadcrumbs,
  Container,
  Grid2 as Grid,
  Link,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  // Read filters from URL using the new keys
  const authorId = searchParams.get("authorId");
  const genreId = searchParams.get("genreId");
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 8;
  const sortOption = searchParams.get("sort") || "title";

  const { data: booksResponse, isLoading } = useQuery({
    queryKey: [
      "books",
      { authorId, genreId, page, pageSize, sort: sortOption },
    ],
    queryFn: () =>
      getBooks({
        page,
        pageSize,
        authorId: authorId || undefined,
        genreId: genreId || undefined,
      }),
  });

  const handlePageChange = (_: any, newPage: number) => {
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const handlePageSizeChange = (e: SelectChangeEvent) => {
    params.delete("page");
    params.set("pageSize", e.target.value);
    router.push(`?${params.toString()}`);
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    params.delete("page");
    params.set("sort", e.target.value);
    router.push(`?${params.toString()}`);
  };

  const sortedBooks = booksResponse?.books.slice().sort((a, b) => {
    switch (sortOption) {
      case "title":
        return a.title.localeCompare(b.title);
      case "price-low-to-high":
        return a.price - b.price;
      case "price-high-to-low":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        py: 2,
        gap: 2,
        alignItems: "center",
      }}
    >
      <Breadcrumbs>
        <Link component={NextLink} href="/">
          Home
        </Link>
        <Link component={NextLink} href="/books">
          Books
        </Link>
      </Breadcrumbs>

      <Stack direction="row" sx={{ width: "100%" }}>
        <Stack direction="row" sx={{ gap: "2rem", width: "100%" }}>
          <BooksFilter />
          <Stack
            direction="column"
            spacing={2}
            sx={{ alignItems: "center", width: "100%" }}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {!booksResponse ? (
                <Skeleton width={200} />
              ) : (
                <Typography variant="body2">
                  {`${booksResponse.page * booksResponse.pageSize - booksResponse.pageSize + 1} - ${
                    booksResponse.page * booksResponse.pageSize
                  } of ${booksResponse.total} results`}
                </Typography>
              )}
              <Stack direction="row" sx={{ gap: "0.5rem" }}>
                <Select
                  variant="filled"
                  size="small"
                  value={booksResponse?.pageSize.toString() || "8"}
                  onChange={handlePageSizeChange}
                >
                  <MenuItem value={8}>Show: 8</MenuItem>
                  <MenuItem value={16}>Show: 16</MenuItem>
                </Select>
                <Select
                  variant="filled"
                  size="small"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <MenuItem value="title">Sort by: Title</MenuItem>
                  <MenuItem value="price-low-to-high">
                    Sort by: Price - Low to High
                  </MenuItem>
                  <MenuItem value="price-high-to-low">
                    Sort by: Price - High to Low
                  </MenuItem>
                </Select>
              </Stack>
            </Stack>
            <Grid container spacing={6} sx={{ width: "100%" }}>
              {isLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <Grid
                      key={i}
                      size={{ xs: 6, md: 4, lg: 3 }}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                      }}
                    >
                      <Skeleton
                        variant="rounded"
                        sx={{
                          aspectRatio: "1/1.65",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                      <Skeleton variant="rounded" />
                      <Skeleton variant="rounded" sx={{ width: "75%" }} />
                      <Skeleton variant="rounded" sx={{ width: "50%" }} />
                      <Skeleton variant="rounded" sx={{ width: "25%" }} />
                      <Skeleton variant="rounded" />
                    </Grid>
                  ))
                : sortedBooks?.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
            </Grid>
            {!booksResponse ? (
              <Skeleton width={200} />
            ) : (
              <Pagination
                count={Math.ceil(booksResponse.total / booksResponse.pageSize)}
                page={page}
                color="primary"
                onChange={handlePageChange}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
