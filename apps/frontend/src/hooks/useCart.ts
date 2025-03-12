import { useCartStore } from "@/stores/cart-store";
import { useShallow } from "zustand/shallow";

export const useCart = () => {
  const cart = useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      addCartItem: state.addCartItem,
      removeCartItem: state.removeCartItem,
      clearCart: state.clearCart,
      getCartBooks: state.getCartBooks,
      isInCart: state.isInCart,
      cartItemCount: state.cartItemCount,
    })),
  );

  return cart;
};
