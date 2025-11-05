import { useState } from "react";
import { Slider } from "../ui/slider";

interface RangeSliderProps {
  label: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  formatLabel?: (value: number, max: number) => string;
}

export function RangeSlider({
  label,
  min = 0,
  max = 10,
  step = 1,
  defaultValue = [0, 10],
  onValueChange,
  formatLabel = (value: number, maxVal: number) => {
    if (value === 0) return "Any";
    if (value >= maxVal) return `${maxVal}+`;
    return value.toString();
  },
}: RangeSliderProps) {
  const [range, setRange] = useState(defaultValue);

  const handleValueChange = (value: number[]) => {
    const newRange = value as [number, number];
    setRange(newRange);
    onValueChange?.(newRange);
  };

  return (
    <div className="mb-6 pb-6 border-b">
      <h3 className="mb-4">{label}</h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Min: {formatLabel(range[0], max)}
          </span>
          <span className="text-gray-600">
            Max: {formatLabel(range[1], max)}
          </span>
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
    </div>
  );
}
