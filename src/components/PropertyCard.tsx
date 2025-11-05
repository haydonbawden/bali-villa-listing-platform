import { Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { PropertyFeatures } from "./common/PropertyFeatures";

export interface PropertyData {
  // Basic Info
  id: string;
  title: string;
  price: string;
  priceIDR?: number;
  priceUSD?: number;
  priceAUD?: number;
  address: string;
  suburb: string;
  locality?: string;
  subdistrict?: string;
  regency?: string;
  
  // Property Details
  bedrooms: number;
  bathrooms: number;
  parking: number;
  landSize: string;
  buildingSize?: string;
  transactionType: "sale" | "lease" | "rent";
  ownershipType?: "freehold" | "leasehold";
  leaseUntil?: string;
  
  // Media
  image: string;
  gallery?: string[];
  
  // Description
  description?: string;
  
  // Features & Amenities
  features?: {
    pool?: boolean;
    furnishing?: string;
    kitchen?: string;
    views?: string[];
    ecoFeatures?: string[];
    other?: string[];
  };
  
  // Utilities
  utilities?: {
    electricity?: string;
    water?: string;
    internet?: string;
  };
  
  // Staff & Services
  staff?: {
    role: string;
    frequency: string;
  }[];
  
  // Lease Terms (if leasehold)
  leaseTerms?: {
    monthlyRate?: string;
    deposit?: string;
    minimumStay?: string;
    availability?: string;
  };
  
  // Legal (if sale)
  legal?: {
    titleType?: string;
    zoningStatus?: string;
    permitStatus?: string;
  };
  
  // Location
  latitude?: number;
  longitude?: number;
  travelTimes?: {
    beach?: string;
    airport?: string;
    center?: string;
  };
  
  // Advertiser
  advertiserType: "agency" | "owner";
  
  // Agency Info
  agencyName?: string;
  agencyLogo?: string;
  agentName?: string;
  agentPhone?: string;
  agentEmail?: string;
  agentWhatsApp?: string;
  agencyLicenseId?: string;
  agencyAddress?: string;
  contactHours?: string;
  
  // Owner Info
  ownerName?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  ownerWhatsApp?: string;
  
  // Listing Meta
  listingSource?: string;
  listingSourceLogo?: string;
  lastSeenAt?: string;
  listedDate?: string;
  
  // Display Flags
  featured?: boolean;
  badges?: string[];
  
  // Legacy (for backward compatibility)
  agent?: string;
  listingType?: "sale" | "rent";
}

import { getPropertyPrice } from "../utils/formatCurrency";
import { useFavorites } from "../contexts/FavoritesContext";
import { toast } from "sonner";

interface PropertyCardProps {
  property: PropertyData;
  onClick?: () => void;
  currency?: "USD" | "IDR" | "AUD";
}

export function PropertyCard({ property, onClick, currency = "USD" }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-shadow group cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {property.featured && (
          <Badge className="absolute top-3 left-3 bg-emerald-600">
            Featured
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(property.id);
            toast.success(
              isFavorite(property.id) 
                ? "Removed from favorites" 
                : "Added to favorites"
            );
          }}
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite(property.id) ? "fill-red-500 text-red-500" : ""}`} 
          />
        </Button>
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded text-sm">
          {property.listingType === "sale" ? "For Sale" : "For Rent"}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="mb-2">
          <span className="text-2xl font-semibold">{getPropertyPrice(property, currency)}</span>
        </div>

        {/* Address */}
        <div className="mb-3">
          <h3 className="hover:text-emerald-600 transition-colors">
            {property.title}
          </h3>
          <p className="text-gray-600 text-sm">{property.address}</p>
          <p className="text-gray-600 text-sm">{property.suburb}</p>
        </div>

        {/* Features */}
        <div className="mb-4 pb-4 border-b">
          <PropertyFeatures
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            parking={property.parking}
            landSize={property.landSize}
          />
        </div>

        {/* Agent */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs">{property.agent.charAt(0)}</span>
            </div>
            <span className="text-sm text-gray-600">{property.agent}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
