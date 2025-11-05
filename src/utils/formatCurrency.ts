/**
 * Format currency with proper symbols and formatting
 */
export function formatCurrency(
  value: number,
  currency: "USD" | "IDR" | "AUD"
): string {
  switch (currency) {
    case "USD":
      return `$${value.toLocaleString("en-US")}`;
    case "IDR":
      return `Rp ${value.toLocaleString("id-ID")}`;
    case "AUD":
      return `A$${value.toLocaleString("en-AU")}`;
    default:
      return `$${value.toLocaleString("en-US")}`;
  }
}

/**
 * Get property price in the specified currency
 */
export function getPropertyPrice(
  property: {
    price?: string;
    priceUSD?: number;
    priceIDR?: number;
    priceAUD?: number;
  },
  currency: "USD" | "IDR" | "AUD"
): string {
  switch (currency) {
    case "USD":
      if (property.priceUSD) return formatCurrency(property.priceUSD, "USD");
      break;
    case "IDR":
      if (property.priceIDR) return formatCurrency(property.priceIDR, "IDR");
      break;
    case "AUD":
      if (property.priceAUD) return formatCurrency(property.priceAUD, "AUD");
      break;
  }
  
  // Fallback to default price string
  return property.price || "$0";
}
