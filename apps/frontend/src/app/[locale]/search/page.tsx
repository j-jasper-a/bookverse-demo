"use client";

import { Container, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  return (
    <Container component={"main"} sx={{ p: 2 }}>
      <Typography variant={"h2"}>You are searching: {query}</Typography>
    </Container>
  );
}
