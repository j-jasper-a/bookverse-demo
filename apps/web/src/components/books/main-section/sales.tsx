"use client";

import { useCart } from "@/hooks/useCart";
import { BookDto } from "@bookverse-demo/schemas";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SalesSectionProps = {
  book: BookDto;
};

export function Sales({ book }: SalesSectionProps) {
  const [activeFormat, setActiveFormat] = useState<"paperback" | "hardcover">(
    "paperback",
  );
  const { addBook, books } = useCart();
  const router = useRouter();

  function handleBuyNow() {
    addBook({ bookId: book.id });
    router.push("/cart");
  }

  const isBookInCart = books.some((b) => b.bookId === book.id);

  return (
    <Box className="flex w-full flex-col gap-4">
      <Box className="flex justify-center gap-4 md:justify-between">
        <Button
          className="flex aspect-square flex-col gap-1 shadow-none"
          onClick={() => setActiveFormat("paperback")}
          variant={activeFormat === "paperback" ? "contained" : "outlined"}
        >
          <span>Paperback</span>
          <span>{`$${book.price / 100}`}</span>
        </Button>
        <Button
          className="flex aspect-square flex-col gap-1 shadow-none"
          onClick={() => setActiveFormat("hardcover")}
          variant={activeFormat === "hardcover" ? "contained" : "outlined"}
        >
          <span>Hardcover</span>
          <span>{`$${((book.price / 100) * 1.25).toFixed(2)}`}</span>
        </Button>
      </Box>
      <Box className="flex w-full flex-col gap-2">
        <Button
          variant="contained"
          size="large"
          className="bg-primary/15"
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
        <Button
          onClick={() => addBook({ bookId: book.id })}
          disabled={isBookInCart}
        >
          {isBookInCart ? "Added to Cart" : "Add to Cart"}
        </Button>
      </Box>
    </Box>
  );
}
