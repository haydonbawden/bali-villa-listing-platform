import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { SearchFilters } from "../utils/propertyFilters";

interface SearchContextType {
  filters: SearchFilters;
  updateFilters: (updates: Partial<SearchFilters>) => void;
  resetFilters: () => void;
}

const defaultFilters: SearchFilters = {
  location: "",
  propertyType: "all",
  priceRange: "any",
  bedrooms: 0,
  bathrooms: 0,
  parking: 0,
  features: [],
  sortBy: "newest",
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<SearchFilters>(() => {
    // Try to load from URL parameters on initial load
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return {
        location: params.get("location") || defaultFilters.location,
        propertyType: params.get("propertyType") || defaultFilters.propertyType,
        priceRange: params.get("priceRange") || defaultFilters.priceRange,
        bedrooms: parseInt(params.get("bedrooms") || "0"),
        bathrooms: parseInt(params.get("bathrooms") || "0"),
        parking: parseInt(params.get("parking") || "0"),
        features: params.get("features")?.split(",").filter(Boolean) || [],
        sortBy: params.get("sortBy") || defaultFilters.sortBy,
      };
    }
    return defaultFilters;
  });

  // Sync filters to URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      
      if (filters.location) params.set("location", filters.location);
      if (filters.propertyType !== "all") params.set("propertyType", filters.propertyType);
      if (filters.priceRange !== "any") params.set("priceRange", filters.priceRange);
      if (filters.bedrooms > 0) params.set("bedrooms", filters.bedrooms.toString());
      if (filters.bathrooms > 0) params.set("bathrooms", filters.bathrooms.toString());
      if (filters.parking > 0) params.set("parking", filters.parking.toString());
      if (filters.features.length > 0) params.set("features", filters.features.join(","));
      if (filters.sortBy !== "newest") params.set("sortBy", filters.sortBy);
      
      const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, [filters]);

  const updateFilters = (updates: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <SearchContext.Provider value={{ filters, updateFilters, resetFilters }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
