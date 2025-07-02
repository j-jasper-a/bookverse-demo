export type PromoCode = {
  id: string;
  discountPercent: number;
  expiresAt?: string;
  usageLimit?: number;
};

export const promoCodes: PromoCode[] = [
  {
    id: "JASPER2025",
    discountPercent: 50,
  },
];
