import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { PriceRangeSlider } from "./common/PriceRangeSlider";
import { RangeSlider } from "./common/RangeSlider";
import { PROPERTY_FEATURES, PROPERTY_TYPES } from "../data/constants";

export function FilterSidebar() {
  return (
    <aside className="bg-white border rounded-lg p-6 sticky top-20 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg">Filters</h2>
        <Button variant="ghost" size="sm">
          Clear all
        </Button>
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b">
        <h3 className="mb-4">Price range</h3>
        <PriceRangeSlider />
      </div>

      {/* Bedrooms */}
      <RangeSlider label="Bedrooms" />

      {/* Bathrooms */}
      <RangeSlider label="Bathrooms" />

      {/* Parking */}
      <RangeSlider label="Parking spaces" />

      {/* Property Features */}
      <div className="mb-6 pb-6 border-b">
        <h3 className="mb-4">Property features</h3>
        <div className="space-y-3">
          {PROPERTY_FEATURES.map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox id={feature} />
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

      {/* Property Type */}
      <div className="mb-6">
        <h3 className="mb-4">Property type</h3>
        <div className="space-y-3">
          {PROPERTY_TYPES.filter(type => type.value !== "all").map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <Checkbox id={type.value} />
              <Label
                htmlFor={type.value}
                className="text-sm cursor-pointer"
              >
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
        Apply filters
      </Button>
    </aside>
  );
}
