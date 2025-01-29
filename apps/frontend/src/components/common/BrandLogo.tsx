import { Box, Link } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";

const BrandLogo = () => {
  return (
    <Link
      component={NextLink}
      variant="h3"
      href="/"
      sx={{
        height: "2rem",
        width: "auto",
      }}
    >
      <Image
        style={{ width: "auto", height: "100%", objectFit: "contain" }}
        src="/assets/logos/brand-logo.svg"
        alt="BookVerse Logo"
        width={512}
        height={512}
      />
    </Link>
  );
};

export default BrandLogo;
