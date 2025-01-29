const formatPrice = (price: number, currency = "USD") => {
  const EXCHANGE_RATE = 0.95;

  if (currency === "EUR") {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format((price * EXCHANGE_RATE) / 100);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
};

export default formatPrice;
