"use client";

import { clearCart } from "@/utils/addToCart";
import { OrderSchema, OrderType } from "@bookverse-demo/libs";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  Typography,
  TextField,
  Select,
  Button,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuCheck as CheckIcon } from "react-icons/lu";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const { handleSubmit } = useForm<OrderType>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      id: "",
      status: "Pending",
      shippingAddress: "",
      billingAddress: "",
      name: "",
      payment: {
        transactionId: "",
        method: "Cash on delivery",
        amount: 0,
      },
      items: [],
      metadata: {
        createdAt: new Date().toISOString(),
      },
    },
  });

  const submitOrder = async (data: OrderType) => {
    console.log(data);
  };

  const handleTemporarySubmit = async () => {
    clearCart();
    setSubmitted(true);
    router.refresh();
  };

  if (submitted) {
    return (
      <Container
        component={"main"}
        sx={{
          display: "flex",
          flexDirection: "column",
          py: 2,
          gap: 2,
          alignItems: "center",
        }}
      >
        <Stack direction={"column"} sx={{ gap: 2, alignItems: "center" }}>
          <CheckIcon style={{ fontSize: "10rem", color: "green" }} />
          <Typography variant={"h2"} sx={{ fontSize: "3rem" }}>
            Congratulations!
          </Typography>
          <Typography variant={"h3"}>Your order has been placed.</Typography>
          <Button variant="contained" onClick={() => router.push("/books")}>
            Go Back to Store
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container
      component={"main"}
      maxWidth={"lg"}
      sx={{ display: "flex", flexDirection: "column", py: 2, gap: 2 }}
    >
      <Typography variant={"h2"}>Checkout</Typography>
      <form onSubmit={handleSubmit(submitOrder)}>
        <Stack direction={"column"} spacing={2}>
          <TextField label="Name" name="name" />
          <TextField label="Shipping Address" name="shippingAddress" />
          <TextField label="Billing Address" name="billingAddress" />
          <Select label="Payment Method" name="payment.method">
            <option value="Cash on delivery">Cash on delivery</option>
            <option value="Credit card">Credit card</option>
            <option value="Debit card">Debit card</option>
            <option value="PayPal">PayPal</option>
          </Select>
          <Button
            variant="contained"
            type="submit"
            onClick={handleTemporarySubmit}
          >
            Confirm
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
