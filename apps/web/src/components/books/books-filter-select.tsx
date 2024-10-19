"use client";

import { findManyGenres } from "@/lib/api/genres";
import { GenreName } from "@bookverse-demo/schemas";
import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

export function BooksFilterSelect() {
  const { data: genres = [] } = useQuery({
    queryKey: ["genres"],
    queryFn: findManyGenres,
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedGenreId = searchParams.get("genreId") || "";

  const handleChange = (event: SelectChangeEvent) => {
    const genreId = event.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (genreId) {
      params.set("genreId", genreId);
    } else {
      params.delete("genreId");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Box className="flex w-48 flex-col gap-4 self-end md:hidden">
      <Select
        size="small"
        variant="outlined"
        displayEmpty
        onChange={handleChange}
        value={selectedGenreId}
        fullWidth
      >
        <MenuItem value="">All</MenuItem>
        {genres.map((genre) => (
          <MenuItem key={genre.id} value={genre.id}>
            {GenreName[genre.name] ?? genre.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
