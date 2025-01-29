import { z } from "zod";

const OrderItemSchema = z.object({
  id: z.string(),
  format: z.enum(["Paperback", "Hardcover"]),
});

const PaymentSchema = z.object({
  transactionId: z.string(),
  method: z.enum(["Cash on delivery"]),
  amount: z.number(),
});

const OrderSchema = z.object({
  id: z.string(),
  items: z.array(OrderItemSchema),
  name: z.string(),
  shippingAddress: z.string(),
  billingAddress: z.string().optional(),
  payment: PaymentSchema,
  status: z.enum([
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]),
  metadata: z.object({
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime().optional(),
  }),
});

type OrderType = z.infer<typeof OrderSchema>;

export { OrderSchema };
export type { OrderType };
