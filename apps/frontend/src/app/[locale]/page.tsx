import { helloFromLibsInside } from "@bookverse-demo/libs/hello/hello";
import { Card, Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container component={"main"} sx={{ p: 2 }}>
      <Card sx={{ p: 2 }}>
        <Typography>{helloFromLibsInside()}</Typography>
      </Card>
    </Container>
  );
}
