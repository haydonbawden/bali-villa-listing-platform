import { Heart, Trash2 } from "lucide-react";
import { PropertyCard, PropertyData } from "./PropertyCard";
import { PropertyListCard } from "./PropertyListCard";
import { Button } from "./ui/button";
import { useFavorites } from "../contexts/FavoritesContext";
import { useState } from "react";

interface SavedPropertiesPageProps {
  properties: PropertyData[];
  currency: "USD" | "IDR" | "AUD";
  onPropertyClick: (property: PropertyData) => void;
  onBack: () => void;
}

export function SavedPropertiesPage({
  properties,
  currency,
  onPropertyClick,
  onBack,
}: SavedPropertiesPageProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter properties to only show favorites
  const savedProperties = properties.filter((p) => favorites.includes(p.id));

  const handleClearAll = () => {
    if (window.confirm("Remove all saved properties?")) {
      savedProperties.forEach((property) => toggleFavorite(property.id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            ← Back to browse
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Saved Properties</h1>
              <p className="text-gray-600">
                {savedProperties.length} {savedProperties.length === 1 ? "property" : "properties"} saved
              </p>
            </div>

            {savedProperties.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearAll}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Properties Grid/List */}
        {savedProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-gray-400" />
            </div>
            
            <h3 className="text-2xl font-semibold mb-2">No saved properties yet</h3>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              Start adding properties to your favorites by clicking the heart icon on any property card.
            </p>
            
            <Button
              onClick={onBack}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Browse Properties
            </Button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                : "space-y-4"
            }
          >
            {savedProperties.map((property) => (
              viewMode === "grid" ? (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={() => onPropertyClick(property)}
                  currency={currency}
                />
              ) : (
                <PropertyListCard
                  key={property.id}
                  property={property}
                  onClick={() => onPropertyClick(property)}
                  currency={currency}
                />
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
