import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PROPERTY_TYPES } from "../../data/constants";

interface PropertyTypeSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  showIcon?: boolean;
  icon?: React.ReactNode;
}

export function PropertyTypeSelect({
  value,
  onValueChange,
  defaultValue = "all",
  placeholder = "Property type",
  className,
  showIcon = false,
  icon,
}: PropertyTypeSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className={className}>
        {showIcon && icon}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {PROPERTY_TYPES.map((type) => (
          <SelectItem key={type.value} value={type.value}>
            {type.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
