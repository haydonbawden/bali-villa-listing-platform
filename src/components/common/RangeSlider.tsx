import { Slider } from "../ui/slider";

interface RangeSliderProps {
  label: string;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  formatLabel?: (value: number, max: number) => string;
}

export function RangeSlider({
  label,
  value = 0,
  onChange,
  min = 0,
  max = 10,
  step = 1,
  formatLabel = (val: number, maxVal: number) => {
    if (val === 0) return "Any";
    if (val >= maxVal) return `${maxVal}+`;
    return val.toString();
  },
}: RangeSliderProps) {
  const handleValueChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <div className="mb-6 pb-6 border-b">
      <h3 className="mb-4">{label}</h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Minimum: {formatLabel(value, max)}
          </span>
        </div>
        <Slider
          value={[value]}
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
