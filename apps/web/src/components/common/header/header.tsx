import { DesktopNav } from "@/components/common/header/desktop-nav";
import { MobileNav } from "@/components/common/header/mobile-nav";
import { Box } from "@mui/material";

export function Header() {
  return (
    <Box className="bg-background bg-background-default border-b-divider sticky left-0 top-0 z-10 w-full border-b-2">
      <DesktopNav />
      <MobileNav />
    </Box>
  );
}
