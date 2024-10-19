import { BrandLogo } from "@/components/common/brand-logo";
import { navLinks } from "@/data/nav-links";
import { Box, Button } from "@mui/material";
import NextLink from "next/link";

export function DesktopNav() {
  return (
    <Box maxWidth="lg" className="mx-auto hidden flex-col px-4 md:flex">
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
    </Box>
  );
}
