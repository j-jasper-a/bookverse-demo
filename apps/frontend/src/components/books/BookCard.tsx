"use client";

import { useCart } from "@/hooks/useCart";
import formatPrice from "@/utils/formatPrice";
import { BookSimpleDTOType } from "@bookverse-demo/libs";
import {
  Grid2 as Grid,
  Button,
  Paper,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  book: BookSimpleDTOType;
};

const BookCard = ({ book }: Props) => {
  const router = useRouter();
  const { addCartItem, isInCart } = useCart();
  const isHome = usePathname().slice(3) === "";

  const handleCart = () => {
    addCartItem(book.id);
    router.refresh();
  };

  return (
    <Grid
      key={book.id}
      size={{ xs: 6, md: 4, lg: isHome ? 2 : 3 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <Stack direction={"column"} spacing={1}>
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
        <Stack direction={"column"}>
          <Link component={NextLink} href={`/books/${book.slug}`} variant="h3">
            {book.title}
          </Link>
          <Link
            component={NextLink}
            href={`/books?authorId=${book.authors[0].id}`}
            variant="body2"
            color={"text.secondary"}
          >
            {book.authors[0].name}
          </Link>
        </Stack>
      </Stack>
      <Stack direction={"column"}>
        <Typography>{formatPrice(book.price)}</Typography>
        <Button
          variant={"contained"}
          size={"small"}
          fullWidth
          color={"primary"}
          onClick={handleCart}
          disabled={isInCart(book.id)}
        >
          {isInCart(book.id) ? "Already in Cart" : "Add to Cart"}
        </Button>
      </Stack>
    </Grid>
  );
};

export default BookCard;
