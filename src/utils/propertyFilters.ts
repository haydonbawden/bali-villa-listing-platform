import { PropertyData } from "../components/PropertyCard";

export interface SearchFilters {
  location: string;
  propertyType: string;
  priceRange: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  features: string[];
  sortBy: string;
}

/**
 * Parse price range string to min and max values
 */
function parsePriceRange(priceRange: string): { min: number; max: number } {
  if (priceRange === "any") return { min: 0, max: Infinity };
  
  const ranges: { [key: string]: { min: number; max: number } } = {
    "0-500k": { min: 0, max: 500000 },
    "500k-1m": { min: 500000, max: 1000000 },
    "1m-2m": { min: 1000000, max: 2000000 },
    "2m-5m": { min: 2000000, max: 5000000 },
    "5m+": { min: 5000000, max: Infinity },
  };
  
  return ranges[priceRange] || { min: 0, max: Infinity };
}

/**
 * Filter properties based on search criteria
 */
export function filterProperties(
  properties: PropertyData[],
  filters: SearchFilters
): PropertyData[] {
  return properties.filter((property) => {
    // Location filter
    if (filters.location && filters.location !== "all" && filters.location !== "Bali, Indonesia") {
      const locationLower = filters.location.toLowerCase();
      const suburbLower = property.suburb?.toLowerCase() || "";
      const localityLower = property.locality?.toLowerCase() || "";
      
      if (!suburbLower.includes(locationLower) && !localityLower.includes(locationLower)) {
        return false;
      }
    }

    // Property type filter
    if (filters.propertyType && filters.propertyType !== "all") {
      // For now, all properties are villas/houses
      // In a real implementation, we'd have a propertyType field
    }

    // Price range filter
    if (filters.priceRange && filters.priceRange !== "any") {
      const { min, max } = parsePriceRange(filters.priceRange);
      const price = property.priceUSD || 0;
      
      if (price < min || price > max) {
        return false;
      }
    }

    // Bedrooms filter
    if (filters.bedrooms > 0 && property.bedrooms < filters.bedrooms) {
      return false;
    }

    // Bathrooms filter
    if (filters.bathrooms > 0 && property.bathrooms < filters.bathrooms) {
      return false;
    }

    // Parking filter
    if (filters.parking > 0 && property.parking < filters.parking) {
      return false;
    }

    // Features filter
    if (filters.features && filters.features.length > 0) {
      const hasAllFeatures = filters.features.every((feature) => {
        const featureLower = feature.toLowerCase();
        
        // Check in features object
        if (property.features) {
          if (featureLower.includes("pool") && property.features.pool) {
            return true;
          }
          
          if (featureLower.includes("ocean view") || featureLower.includes("rice field view")) {
            return property.features.views?.some((view) =>
              view.toLowerCase().includes(featureLower.replace(" view", ""))
            );
          }
          
          if (featureLower.includes("furnished") && property.features.furnishing) {
            return true;
          }
          
          if (featureLower.includes("garden") || featureLower.includes("air conditioning")) {
            return property.features.other?.some((item) =>
              item.toLowerCase().includes(featureLower)
            );
          }
        }
        
        // Check in description
        if (property.description) {
          return property.description.toLowerCase().includes(featureLower);
        }
        
        return false;
      });
      
      if (!hasAllFeatures) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sort properties based on sort criteria
 */
export function sortProperties(
  properties: PropertyData[],
  sortBy: string
): PropertyData[] {
  const sorted = [...properties];
  
  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => (a.priceUSD || 0) - (b.priceUSD || 0));
    
    case "price-high":
      return sorted.sort((a, b) => (b.priceUSD || 0) - (a.priceUSD || 0));
    
    case "bedrooms":
      return sorted.sort((a, b) => b.bedrooms - a.bedrooms);
    
    case "newest":
    default:
      // Keep original order or sort by listed date if available
      return sorted;
  }
}
