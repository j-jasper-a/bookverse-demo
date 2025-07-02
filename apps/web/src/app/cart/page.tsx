import { PageClient } from "@/app/cart/components/page-client";
import { Box } from "@mui/material";

export const metadata = {
  title: "Cart",
  description: "Your shopping cart",
};

export default function CartPage() {
  return (
    <Box maxWidth="lg" className="mx-auto px-4 py-8 md:px-8">
      <PageClient />
    </Box>
  );
}
