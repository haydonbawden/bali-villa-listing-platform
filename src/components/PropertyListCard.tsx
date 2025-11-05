import { Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { PropertyFeatures } from "./common/PropertyFeatures";
import { PropertyData } from "./PropertyCard";
import { getPropertyPrice } from "../utils/formatCurrency";
import { useFavorites } from "../contexts/FavoritesContext";
import { toast } from "sonner";

interface PropertyListCardProps {
  property: PropertyData;
  onClick?: () => void;
  currency?: "USD" | "IDR" | "AUD";
}

export function PropertyListCard({ property, onClick, currency = "USD" }: PropertyListCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-shadow group cursor-pointer flex"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative w-64 flex-shrink-0">
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
      <div className="flex-1 p-4 flex flex-col">
        {/* Price */}
        <div className="mb-2">
          <span className="text-2xl font-semibold">{getPropertyPrice(property, currency)}</span>
        </div>

        {/* Title & Address */}
        <div className="mb-3">
          <h3 className="text-lg font-medium hover:text-emerald-600 transition-colors mb-1">
            {property.title}
          </h3>
          <p className="text-gray-600 text-sm">{property.address}</p>
          <p className="text-gray-600 text-sm">{property.suburb}</p>
        </div>

        {/* Description */}
        {property.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {property.description}
          </p>
        )}

        {/* Features */}
        <div className="mb-4 pb-4 border-b">
          <PropertyFeatures
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            parking={property.parking}
            landSize={property.landSize}
          />
        </div>

        {/* Agent - pushed to bottom */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs">{property.agent?.charAt(0) || "A"}</span>
            </div>
            <span className="text-sm text-gray-600">{property.agent}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
