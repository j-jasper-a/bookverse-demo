"use client";

import { BrandLogo } from "@/components/common/brand-logo";
import { AccountMenu } from "@/components/common/header/account-menu";
import { CartButton } from "@/components/common/header/cart-button";
import { navLinks } from "@/data/nav-links";
import { Box, Button } from "@mui/material";
import NextLink from "next/link";

export function DesktopNav() {
  return (
    <Box maxWidth="lg" className="mx-auto hidden flex-col px-4 md:flex">
      <Box className="flex items-center justify-between">
        <Box component={"ul"} className="flex items-center">
          <BrandLogo className="mr-8" />
          {navLinks.map((navLink) => (
            <li key={navLink.href}>
              <Button
                variant="text"
                component={NextLink}
                href={navLink.href}
                className="py-4"
                disabled={navLink.disabled}
              >
                {navLink.label}
              </Button>
            </li>
          ))}
        </Box>
        <Box className="flex items-center gap-4">
          <AccountMenu />
          <CartButton />
        </Box>
      </Box>
    </Box>
  );
}
