import { useState } from "react";
import { Slider } from "../ui/slider";

interface PriceRangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  formatLabel?: (value: number) => string;
}

export function PriceRangeSlider({
  min = 0,
  max = 10000000,
  step = 100000,
  defaultValue = [0, 10000000],
  onValueChange,
  formatLabel = (value: number) => {
    if (value === 0) return "Any";
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  },
}: PriceRangeSliderProps) {
  const [range, setRange] = useState(defaultValue);

  const handleValueChange = (value: number[]) => {
    const newRange = value as [number, number];
    setRange(newRange);
    onValueChange?.(newRange);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Min: {formatLabel(range[0])}</span>
        <span className="text-gray-600">Max: {formatLabel(range[1])}</span>
      </div>
      <Slider
        value={range}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={step}
        className="py-4"
      />
    </div>
  );
}
