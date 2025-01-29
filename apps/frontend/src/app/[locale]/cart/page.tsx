"use client";

import { getCartBooks, removeFromCart } from "@/utils/addToCart";
import formatPrice from "@/utils/formatPrice";
import {
  Button,
  Container,
  IconButton,
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
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { LuTrash as RemoveIcon } from "react-icons/lu";

export default function Home() {
  const router = useRouter();
  const {
    data: books,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartBooks,
  });

  if (isLoading) {
    return (
      <Container component={"main"} sx={{ py: 2 }}>
        <Typography variant={"h2"}>Loading...</Typography>
      </Container>
    );
  }

  if (!books || books.length === 0) {
    return (
      <Container component={"main"} sx={{ py: 2 }}>
        <Typography variant={"h2"}>Your cart is empty.</Typography>
      </Container>
    );
  }

  const handleRemove = (bookId: string) => {
    removeFromCart(bookId);
    refetch();
    router.refresh();
  };

  return (
    <Container
      component={"main"}
      maxWidth={"lg"}
      sx={{ display: "flex", flexDirection: "column", py: 2, gap: 2 }}
    >
      <Typography variant={"h2"}>Shopping Cart</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography sx={{ fontWeight: "700" }}>Item</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontWeight: "700" }}>Price</Typography>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>
                <Stack direction={"row"} gap={1}>
                  <Paper
                    sx={{
                      aspectRatio: "1/1.65",
                      width: "100%",
                      maxWidth: "8rem",
                      overflow: "hidden",
                      borderRadius: 2,
                      border: "2px solid #000000",
                      boxShadow: "0px 0px 0px rgba(0, 0, 0, 1)",
                      "&:hover": {
                        boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
                      },
                    }}
                  >
                    <Link component={NextLink} href={`/books/${book.slug}`}>
                      <Image
                        src={book.imageUrl}
                        alt={book.title}
                        width={512}
                        height={512}
                        style={{
                          objectFit: "fill",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </Link>
                  </Paper>
                  <Stack direction={"column"} sx={{ width: "100%" }}>
                    <Typography variant={"h4"}>{book.title}</Typography>
                    <Typography variant={"subtitle2"}>
                      {book.authors[0].name}
                    </Typography>
                  </Stack>
                </Stack>
              </TableCell>
              <TableCell align="right" sx={{ verticalAlign: "top" }}>
                <Typography>{formatPrice(book.price)}</Typography>
              </TableCell>
              <TableCell sx={{ verticalAlign: "top" }}>
                <IconButton
                  sx={{ padding: 0 }}
                  onClick={() => handleRemove(book.id)}
                >
                  <RemoveIcon size={24} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <Typography sx={{ fontWeight: "700" }}>Subtotal</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography sx={{ fontWeight: "700" }}>
                {formatPrice(books.reduce((acc, book) => acc + book.price, 0))}
              </Typography>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
      <Button variant="contained" onClick={() => router.push("/checkout")}>
        Checkout
      </Button>
      <Button variant="contained" onClick={() => router.push("/books")}>
        Continue Shopping
      </Button>
    </Container>
  );
}
