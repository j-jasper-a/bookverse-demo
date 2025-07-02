"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { CheckCircleIcon as AppliedIcon } from "@phosphor-icons/react";

export function OrderSummary() {
  return (
    <Box className="flex flex-col gap-4">
      <Typography variant="h2">Order Summary</Typography>
      <Box className="flex flex-col gap-2">
        <Box>
          <Typography variant="body1" className="mb-2">
            Promo Code Applied
          </Typography>

          <Typography>
            Use JASPER2025 to get 50% off your first order!
          </Typography>
          <Box
            component={"div"}
            className="py-2.25 border-success bg-success/10 flex items-center justify-between rounded-md border-[1px] px-3"
          >
            <Box component={"span"} className="flex items-center gap-2">
              <AppliedIcon size={20} weight="fill" className="text-success" />
              <Typography variant="subtitle2" color="success">
                JASPER2025
              </Typography>
            </Box>
            <Button variant="text" size="small" color="error">
              Remove
            </Button>
          </Box>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            placeholder="Enter promo code"
          />
        </Box>
        <Box className="flex justify-between">
          <Typography variant="body1">Subtotal</Typography>
          <Typography variant="body1">$0.00</Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography variant="body1">Discount</Typography>
          <Typography variant="body1">$0.00</Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography variant="body1">Total</Typography>
          <Typography variant="body1">$0.00</Typography>
        </Box>
      </Box>
    </Box>
  );
}
