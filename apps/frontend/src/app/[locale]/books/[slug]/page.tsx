"use client";

import { getBookBySlug } from "@/data/books";
import { addToCart, isInCart } from "@/utils/addToCart";
import formatPrice from "@/utils/formatPrice";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Grid2 as Grid,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function Home({ params }: Props) {
  const { slug } = params;
  const { data: book, isLoading } = useQuery({
    queryKey: ["book", slug],
    queryFn: () => getBookBySlug(slug),
  });
  const locale = useLocale();
  const router = useRouter();
  const [selectedFormat, setSelectedFormat] = useState<string>("Paperback");

  if (isLoading || !book) {
    return (
      <Container component={"main"} sx={{ py: 2 }}>
        <Typography variant={"h2"}>Loading...</Typography>
      </Container>
    );
  }

  const handleCart = () => {
    addToCart(book.id);
    router.refresh();
  };

  return (
    <Container component={"main"} sx={{ py: 2 }}>
      <Stack direction={"column"} sx={{ gap: 2 }}>
        <Breadcrumbs>
          <Link component={NextLink} href="/">
            Home
          </Link>
          <Link component={NextLink} href="/books">
            Books
          </Link>
          <Typography>{`-`}</Typography>
        </Breadcrumbs>
        <Grid container spacing={4}>
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Paper
              sx={{
                aspectRatio: "1/1.65",
                overflow: "hidden",
                borderRadius: 2,
                border: "2px solid #000000",
                boxShadow: "0px 0px 0px rgba(0, 0, 0, 1)",
                "&:hover": {
                  boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
                },
                width: { xs: "75%", sm: "100%" },
              }}
            >
              <Link component={NextLink} href={`/books/${book.slug}`}>
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  width={512}
                  height={512}
                  style={{ objectFit: "fill", width: "100%", height: "100%" }}
                />
              </Link>
            </Paper>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 6, md: 8 }}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Stack direction={"column"}>
              <Typography variant={"h2"}>{book?.title}</Typography>
              <Link
                component={NextLink}
                href={`/authors/${book.authors[0].slug}`}
                variant="body2"
                color={"text.secondary"}
              >
                {book.authors[0].name}
              </Link>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              {book.formats.map((format) => (
                <Box
                  key={format.format}
                  onClick={() => setSelectedFormat(format.format)}
                  sx={{
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      selectedFormat === format.format ? "#F0EBE7" : "#F5F5F5",
                    p: 2,
                    fontWeight: "700",
                    border: "2px solid #000000",
                    boxShadow:
                      selectedFormat === format.format
                        ? "4px 4px 0px rgba(0, 0, 0, 1)"
                        : "0px 0px 0px rgba(0, 0, 0, 1)",
                  }}
                >
                  <Typography variant={"body2"}>{format.format}</Typography>
                  <Typography>{formatPrice(format.price)}</Typography>
                </Box>
              ))}
            </Stack>
            <Typography variant={"body2"}>{book.overview["en"]}</Typography>
          </Grid>
          <Button
            variant={"contained"}
            size={"large"}
            fullWidth
            color={"primary"}
            onClick={handleCart}
            disabled={isInCart(book.id)}
          >
            {isInCart(book.id) ? "Already in Cart" : "Add to Cart"}
          </Button>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ mb: 2 }}>
              <Typography variant={"h3"}>Product Details</Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "700" }}>
                      ISBN (Paperback)
                    </TableCell>
                    <TableCell sx={{ fontWeight: "400" }}>
                      {book.formats[0].isbn}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "700" }}>
                      ISBN (Hardcover)
                    </TableCell>
                    <TableCell sx={{ fontWeight: "400" }}>
                      {book.formats[1].isbn}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <Stack direction={"column"} sx={{ gap: 2 }}>
                <Typography variant={"h3"}>About Author</Typography>
                <Typography variant={"body1"}>
                  {book.authors[0].biography[locale]}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
