"use client";

import { addToCart, isInCart } from "@/utils/addToCart";
import formatPrice from "@/utils/formatPrice";
import { AuthorSimpleDTOType, BookSimpleDTOType } from "@bookverse-demo/libs";
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
  author: AuthorSimpleDTOType;
};

const AuthorCard = ({ author }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Grid
      key={author.id}
      size={{ xs: 6, md: 4, lg: pathname === "/authors" ? 3 : 2 }}
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
          <Link component={NextLink} href={`/books?authorId=${author.id}`}>
            <Image
              src={author.imageUrl}
              alt={author.name}
              width={512}
              height={512}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Link>
        </Paper>
        <Stack direction={"column"}>
          <Link
            component={NextLink}
            href={`/books?authorId=${author.id}`}
            variant="h3"
          >
            {author.name}
          </Link>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default AuthorCard;
