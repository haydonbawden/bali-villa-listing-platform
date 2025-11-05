import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PRICE_RANGES } from "../../data/constants";

interface PriceRangeSliderProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function PriceRangeSlider({
  value = "any",
  onChange,
}: PriceRangeSliderProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select price range" />
      </SelectTrigger>
      <SelectContent>
        {PRICE_RANGES.map((range) => (
          <SelectItem key={range.value} value={range.value}>
            {range.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
