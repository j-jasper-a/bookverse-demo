import { BrandLogo } from "@/components/common/brand-logo";
import { AccountMenu } from "@/components/common/header/account-menu";
import { CartButton } from "@/components/common/header/cart-button";
import { Box } from "@mui/material";

export function MobileNav() {
  return (
    <Box className="flex items-center justify-between px-4 md:hidden">
      <Box>
        <BrandLogo />
      </Box>
      <Box className="flex items-center gap-4">
        <CartButton />
        <AccountMenu />
      </Box>
    </Box>
  );
}
