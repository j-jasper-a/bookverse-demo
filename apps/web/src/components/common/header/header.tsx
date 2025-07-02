"use client";

import { DesktopNav } from "@/components/common/header/desktop-nav";
import { MobileNav } from "@/components/common/header/mobile-nav";
import { cn } from "@/lib/utils/cn";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <Box
      className={cn(
        "bg-background bg-background-default border-b-divider sticky left-0 top-0 z-10 w-full border-b-2",
        pathname === "/" ? "hidden" : "block",
      )}
    >
      <DesktopNav />
      <MobileNav />
    </Box>
  );
}
