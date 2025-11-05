// Property Types
export const PROPERTY_TYPES = [
  { value: "all", label: "All types" },
  { value: "villa", label: "Villa" },
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" },
  { value: "townhouse", label: "Townhouse" },
] as const;

// Bali Locations
export const BALI_LOCATIONS = [
  { value: "all", label: "Select locations" },
  { value: "seminyak", label: "Seminyak" },
  { value: "canggu", label: "Canggu" },
  { value: "ubud", label: "Ubud" },
  { value: "sanur", label: "Sanur" },
  { value: "uluwatu", label: "Uluwatu" },
  { value: "nusa-dua", label: "Nusa Dua" },
  { value: "jimbaran", label: "Jimbaran" },
  { value: "pererenan", label: "Pererenan" },
  { value: "kerobokan", label: "Kerobokan" },
  { value: "berawa", label: "Berawa" },
] as const;

// Ownership & Rent Types
export const OWNERSHIP_TYPES = [
  { value: "any", label: "Any Type" },
  { value: "freehold", label: "Freehold" },
  { value: "leasehold", label: "Leasehold" },
  { value: "rent-yearly", label: "Yearly Rent" },
  { value: "rent-monthly", label: "Monthly Rent" },
] as const;

// Land Size Ranges
export const LAND_SIZE_RANGES = [
  { value: "any", label: "Any Size" },
  { value: "0-200", label: "0 - 200 m²" },
  { value: "200-500", label: "200 - 500 m²" },
  { value: "500-1000", label: "500 - 1,000 m²" },
  { value: "1000-2000", label: "1,000 - 2,000 m²" },
  { value: "2000+", label: "2,000+ m²" },
] as const;

// Price Ranges for Dropdown
export const PRICE_RANGES = [
  { value: "any", label: "Any price" },
  { value: "0-500k", label: "Under $500k" },
  { value: "500k-1m", label: "$500k - $1M" },
  { value: "1m-2m", label: "$1M - $2M" },
  { value: "2m-5m", label: "$2M - $5M" },
  { value: "5m+", label: "$5M+" },
] as const;

// Property Features for Filters
export const PROPERTY_FEATURES = [
  "Pool",
  "Ocean view",
  "Rice field view",
  "Air conditioning",
  "Gym",
  "Garden",
  "Furnished",
  "Pets allowed",
] as const;

// Currencies
export const CURRENCIES = [
  { value: "USD", label: "USD" },
  { value: "IDR", label: "IDR" },
  { value: "AUD", label: "AUD" },
] as const;

// Languages
export const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "id", label: "Indonesian" },
] as const;
