import { GenreDTOType } from "@bookverse-demo/libs";
import { Box, Typography, Link, Grid2 as Grid } from "@mui/material";
import NextLink from "next/link";

type Props = {
  genre: GenreDTOType;
};

const GenreCard = ({ genre }: Props) => {
  return (
    <Grid key={genre.id} size={{ xs: 6, sm: 6, md: 2 }}>
      <Link component={NextLink} href={`/books?genreId=${genre.id}`}>
        <Box
          sx={{
            p: "0.5rem",
            backgroundColor: "#e0e0e0",
            aspectRatio: "1/1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant={"h3"}>{genre.name.en}</Typography>
        </Box>
      </Link>
    </Grid>
  );
};

export default GenreCard;
