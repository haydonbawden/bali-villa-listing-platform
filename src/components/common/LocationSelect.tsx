import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BALI_LOCATIONS } from "../../data/constants";

interface LocationSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  showMultipleNote?: boolean;
}

export function LocationSelect({
  value,
  onValueChange,
  defaultValue = "all",
  placeholder = "Location",
  className,
  showMultipleNote = false,
}: LocationSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {BALI_LOCATIONS.map((location) => (
          <SelectItem key={location.value} value={location.value}>
            {location.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
