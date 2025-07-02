import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartBook = {
  bookId: string;
};

type CartState = {
  userId: string;
  books: CartBook[];
  addBook: (item: CartBook) => void;
  removeBook: (bookId: string) => void;
  clearCart: () => void;
  hydrated?: boolean;
  setHydrated: (hydrated: boolean) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      userId: "1",
      books: [],
      addBook: (book) =>
        set((state) => {
          if (state.books.some(({ bookId }) => bookId === book.bookId)) {
            return { books: state.books };
          }
          return { books: [...state.books, book] };
        }),
      removeBook: (bookId) =>
        set((state) => ({
          books: state.books.filter((book) => book.bookId !== bookId),
        })),
      clearCart: () => set({ books: [] }),
      hydrated: false,
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        userId: state.userId,
        books: state.books,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      },
    },
  ),
);
