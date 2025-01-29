import { getBooksByIds } from "@/data/books";
import { BookSimpleDTOType } from "@bookverse-demo/libs";

// add to cart in local storage
export const addToCart = (id: string) => {
  const cart = localStorage.getItem("cart") || "[]";
  const cartItems = JSON.parse(cart);
  const updatedCart = [...cartItems, id];
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const removeFromCart = (id: string) => {
  const cart = localStorage.getItem("cart") || "[]";
  const cartItems = JSON.parse(cart);
  const updatedCart = cartItems.filter((item: string) => item !== id);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};

export const getCart = () => {
  const cart = localStorage.getItem("cart") || "[]";
  const cartItems = JSON.parse(cart) as string[];
  return cartItems;
};

export const getCartBooks = async () => {
  const cartBookIds = getCart();
  const books = (await getBooksByIds(cartBookIds)) as BookSimpleDTOType[];

  return books;
};

export const isInCart = (id: string) => {
  const cart = localStorage.getItem("cart") || "[]";
  const cartItems = JSON.parse(cart);
  return cartItems.includes(id);
};

export const getCartCount = () => {
  const cart = localStorage.getItem("cart") || "[]";
  const cartItems = JSON.parse(cart);
  return cartItems.length;
};
