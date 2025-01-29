"use client";

import BrandLogo from "../common/BrandLogo";
import { navigationLinks } from "@/constants/navigationLinks";
import { getCartCount } from "@/utils/addToCart";
import {
  AppBar,
  Container,
  Stack,
  TextField,
  IconButton,
  Link,
  Badge,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  LuMenu as MenuIcon,
  LuShoppingCart as CartIcon,
  LuUser as UserIcon,
  LuSearch as SearchIcon,
} from "react-icons/lu";

const Topbar = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <AppBar position="sticky" sx={{ py: 2 }} color="secondary" elevation={1}>
      <Container maxWidth="xl">
        <Stack direction={"column"} sx={{ gap: "0.5rem" }}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <BrandLogo />
            <Stack direction="row" sx={{ gap: "1rem", alignItems: "center" }}>
              {!isMobile &&
                navigationLinks.map((link) => (
                  <Link
                    key={link.label.en}
                    component={NextLink}
                    href={link.href}
                  >
                    {link.label.en}
                  </Link>
                ))}
            </Stack>
            <Stack direction="row" sx={{ gap: "1rem", alignItems: "center" }}>
              <Link component={NextLink} href="/cart">
                <Badge badgeContent={getCartCount()} color="success">
                  <CartIcon style={{ fontSize: "1.5rem" }} />
                </Badge>
              </Link>
            </Stack>
          </Stack>
          <form onSubmit={handleSearch}>
            <TextField
              placeholder="Search ISBN, books, authors, genres..."
              size="small"
              fullWidth
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleSearch}
                    edge="end"
                    aria-label="search"
                  >
                    <SearchIcon style={{ fontSize: "1.5rem" }} />
                  </IconButton>
                ),
              }}
              sx={{ mt: "0.5rem" }}
            />
          </form>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Topbar;
