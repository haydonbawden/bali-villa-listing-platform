import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { PriceRangeSlider } from "./common/PriceRangeSlider";
import { RangeSlider } from "./common/RangeSlider";
import { PROPERTY_FEATURES, PROPERTY_TYPES } from "../data/constants";
import { SearchFilters } from "../utils/propertyFilters";

interface FilterSidebarProps {
  filters: SearchFilters;
  onFiltersChange: (updates: Partial<SearchFilters>) => void;
  onReset: () => void;
}

export function FilterSidebar({ filters, onFiltersChange, onReset }: FilterSidebarProps) {
  const handleFeatureToggle = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter((f) => f !== feature)
      : [...filters.features, feature];
    onFiltersChange({ features: newFeatures });
  };

  const hasActiveFilters = 
    filters.features.length > 0 || 
    filters.bedrooms > 0 || 
    filters.bathrooms > 0 || 
    filters.parking > 0 ||
    filters.priceRange !== "any";
  return (
    <aside className="bg-white border rounded-lg p-6 sticky top-20 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg">
          Filters
          {hasActiveFilters && (
            <span className="ml-2 text-sm text-emerald-600">
              (Active)
            </span>
          )}
        </h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onReset}
          disabled={!hasActiveFilters}
        >
          Clear all
        </Button>
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b">
        <h3 className="mb-4">Price range</h3>
        <PriceRangeSlider 
          value={filters.priceRange}
          onChange={(value) => onFiltersChange({ priceRange: value })}
        />
      </div>

      {/* Bedrooms */}
      <RangeSlider 
        label="Bedrooms" 
        value={filters.bedrooms}
        onChange={(value) => onFiltersChange({ bedrooms: value })}
      />

      {/* Bathrooms */}
      <RangeSlider 
        label="Bathrooms"
        value={filters.bathrooms}
        onChange={(value) => onFiltersChange({ bathrooms: value })}
      />

      {/* Parking */}
      <RangeSlider 
        label="Parking spaces"
        value={filters.parking}
        onChange={(value) => onFiltersChange({ parking: value })}
      />

      {/* Property Features */}
      <div className="mb-6 pb-6 border-b">
        <h3 className="mb-4">Property features</h3>
        <div className="space-y-3">
          {PROPERTY_FEATURES.map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox 
                id={feature}
                checked={filters.features.includes(feature)}
                onCheckedChange={() => handleFeatureToggle(feature)}
              />
              <Label
                htmlFor={feature}
                className="text-sm cursor-pointer"
              >
                {feature}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Property Type - Info only, main control in search bar */}
      <div className="mb-6">
        <h3 className="mb-4">Property type</h3>
        <div className="text-sm text-gray-600">
          {filters.propertyType === "all" ? "All types" : PROPERTY_TYPES.find(t => t.value === filters.propertyType)?.label}
        </div>
      </div>
    </aside>
  );
}
