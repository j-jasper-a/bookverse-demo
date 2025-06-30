"use client";

import { BookDto } from "@bookverse-demo/schemas";
import { Box, Button } from "@mui/material";
import { useState } from "react";

type SalesSectionProps = {
  book: BookDto;
};

export function Sales({ book }: SalesSectionProps) {
  const [activeFormat, setActiveFormat] = useState<"paperback" | "hardcover">(
    "paperback",
  );

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
        <Button variant="contained" size="large" className="bg-primary/15">
          Buy Now
        </Button>
        <Button>Add to Cart</Button>
      </Box>
    </Box>
  );
}
