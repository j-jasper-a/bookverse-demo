"use client";

// import { OrderSummary } from "@/app/cart/components/order-summary";
import { useCart } from "@/hooks/useCart";
import { findBooksByIds } from "@/lib/api/books";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TrashIcon as RemoveIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export function PageClient() {
  const { books, hydrated, removeBook } = useCart();
  const bookIds = books.map((book) => book.bookId);
  const { data: cartBooks, isLoading } = useQuery({
    queryKey: ["cart", bookIds],
    queryFn: () => findBooksByIds(bookIds),
    enabled: hydrated && bookIds.length > 0,
  });

  return (
    // <Box
    //   component={"section"}
    //   className="grid grid-cols-1 gap-8 md:grid-cols-[3fr_1fr]"
    // >
    <Box component={"section"}>
      <Box>
        <Typography variant="h2">Your Cart</Typography>
        <TableContainer component={Paper} className="mt-4">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className="font-bold">Product</TableCell>
                <TableCell className="font-bold">Price</TableCell>
                <TableCell className="font-bold">Quantity</TableCell>
                <TableCell className="font-bold">Subtotal</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Box className="flex h-full w-full items-center justify-center">
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {cartBooks?.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>
                        <Box className="flex items-center gap-4">
                          <Image
                            src={book.imageUrl}
                            alt={book.name}
                            width={50}
                            height={75}
                            className="rounded"
                          />
                          <Typography>{book.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>${(book.price / 100).toFixed(2)}</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>${(book.price / 100).toFixed(2)}</TableCell>
                      <TableCell>
                        <IconButton>
                          <RemoveIcon
                            size={20}
                            onClick={() => removeBook(book.id)}
                            className="text-error-500"
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* <OrderSummary /> */}
    </Box>
  );
}
