"use client";

import { useCartStore } from "@/stores/useCartStore";
import { Badge, IconButton } from "@mui/material";
import { ShoppingCartIcon } from "@phosphor-icons/react";
import NextLink from "next/link";

export function CartButton() {
  const { books } = useCartStore();

  return (
    <IconButton component={NextLink} href="/cart">
      <Badge badgeContent={books.length} color="primary">
        <ShoppingCartIcon size={20} />
      </Badge>
    </IconButton>
  );
}
