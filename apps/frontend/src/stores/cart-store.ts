import { getBooksByIds } from "@/data/books";
import { BookSimpleDTOType } from "@bookverse-demo/libs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartStore = {
  cartItems: string[];
  addCartItem: (id: string) => void;
  removeCartItem: (id: string) => void;
  clearCart: () => void;
  getCartBooks: () => Promise<BookSimpleDTOType[]>;
  isInCart: (id: string) => boolean;
  cartItemCount: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addCartItem: (id) =>
        set((state) => ({ cartItems: [...state.cartItems, id] })),
      removeCartItem: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item !== id),
        })),
      clearCart: () => set({ cartItems: [] }),
      getCartBooks: async () => {
        const books = await getBooksByIds(get().cartItems);
        return books as BookSimpleDTOType[];
      },
      isInCart: (id) => get().cartItems.includes(id),
      cartItemCount: () => get().cartItems.length,
    }),
    {
      name: "cart",
      skipHydration: true,
    },
  ),
);
