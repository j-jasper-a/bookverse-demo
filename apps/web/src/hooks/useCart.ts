import { useCartStore } from "@/stores/useCartStore";

export function useCart() {
  const userId = useCartStore((state) => state.userId);
  const books = useCartStore((state) => state.books);
  const addBook = useCartStore((state) => state.addBook);
  const removeBook = useCartStore((state) => state.removeBook);
  const clearCart = useCartStore((state) => state.clearCart);
  const hydrated = useCartStore((state) => state.hydrated);

  return {
    userId,
    books,
    addBook,
    removeBook,
    clearCart,
    hydrated,
  };
}
