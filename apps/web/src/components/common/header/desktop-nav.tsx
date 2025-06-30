"use client";

import { BrandLogo } from "@/components/common/brand-logo";
import { navLinks } from "@/data/nav-links";
import { Avatar, Badge, Box, Button } from "@mui/material";
import { ShoppingCartIcon } from "@phosphor-icons/react";
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
                LinkComponent={NextLink}
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
          <Avatar src="/assets/demo/user-avatar.webp" className="size-6">
            JJ
          </Avatar>
          <Badge badgeContent={3} color="primary">
            <ShoppingCartIcon className="size-6" />
          </Badge>
        </Box>
      </Box>
    </Box>
  );
}
