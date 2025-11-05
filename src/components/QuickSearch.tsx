import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search, ChevronRight } from "lucide-react";
import { PropertyTypeSelect } from "./common/PropertyTypeSelect";
import { LocationSelect } from "./common/LocationSelect";
import { OWNERSHIP_TYPES, LAND_SIZE_RANGES } from "../data/constants";

export function QuickSearch() {
  const [keywords, setKeywords] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <section className="py-12 bg-white border-t border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg p-6 md:p-8 border border-teal-100">
          <h2 className="text-teal-600 mb-6">SEARCH PROPERTY</h2>
          
          <div className="space-y-4">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Keywords */}
              <div>
                <label className="block text-sm mb-2">Keywords</label>
                <Input
                  placeholder="Property Name, Property Title, or ID"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="bg-white"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm mb-2">Property Type</label>
                <PropertyTypeSelect
                  defaultValue="any"
                  className="bg-white"
                  placeholder="Any Type"
                />
              </div>

              {/* Ownership & Rent Type */}
              <div>
                <label className="block text-sm mb-2">Ownership & Rent Type</label>
                <Select defaultValue="any">
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {OWNERSHIP_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Land Size */}
              <div>
                <label className="block text-sm mb-2">Land Size</label>
                <Select defaultValue="any">
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LAND_SIZE_RANGES.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm mb-2">
                  Location <span className="text-gray-500 text-xs">(can choose more than 1)</span>
                </label>
                <LocationSelect
                  defaultValue="all"
                  className="bg-white"
                  showMultipleNote
                />
              </div>

              {/* Min Price */}
              <div>
                <label className="block text-sm mb-2">Min. Price</label>
                <div className="flex gap-2">
                  <div className="bg-gray-100 border border-gray-300 rounded-md px-3 flex items-center text-sm">
                    IDR
                  </div>
                  <Input
                    placeholder="No Minimum"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="bg-white"
                  />
                </div>
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-sm mb-2">Max. Price</label>
                <div className="flex gap-2">
                  <div className="bg-gray-100 border border-gray-300 rounded-md px-3 flex items-center text-sm">
                    IDR
                  </div>
                  <Input
                    placeholder="No Maximum"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                SEARCH PROPERTY
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-teal-500 text-teal-600 hover:bg-teal-50"
              >
                More Search Option
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
