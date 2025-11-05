import { Search, MapPin, Home, DollarSign } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PropertyTypeSelect } from "./common/PropertyTypeSelect";
import { PRICE_RANGES } from "../data/constants";

export function SearchBar() {
  return (
    <div className="bg-white border-b">
      <div className="max-w-[1400px] mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Location Search */}
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search suburbs, postcodes or states"
              className="pl-10 h-12"
              defaultValue="Bali, Indonesia"
            />
          </div>

          {/* Property Type */}
          <PropertyTypeSelect
            defaultValue="villa"
            className="w-full md:w-[180px] h-12"
            showIcon
            icon={<Home className="w-4 h-4 mr-2" />}
          />

          {/* Price Range */}
          <Select defaultValue="any">
            <SelectTrigger className="w-full md:w-[180px] h-12">
              <DollarSign className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              {PRICE_RANGES.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search Button */}
          <Button className="h-12 bg-emerald-600 hover:bg-emerald-700 px-8">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
