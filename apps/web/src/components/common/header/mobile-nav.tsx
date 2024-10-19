import { BrandLogo } from "@/components/common/brand-logo";
import { Box } from "@mui/material";

export function MobileNav() {
  return (
    <Box className="px-4 md:hidden">
      <Box>
        <BrandLogo />
      </Box>
    </Box>
  );
}
