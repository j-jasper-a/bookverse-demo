import { helloFromLibsInside } from "@bookverse-demo/libs/hello/hello";
import { Card, Container, Typography } from "@mui/material";

export default async function Home() {
  const response = await fetch(`${process.env.BOOKVERSE_API_URL}`);
  const messageFromBackend = await response.text();

  return (
    <Container component={"main"} sx={{ p: 2 }}>
      <Card sx={{ p: 2 }}>
        <Typography>{helloFromLibsInside()}</Typography>
        <Typography>{messageFromBackend}</Typography>
      </Card>
    </Container>
  );
}
