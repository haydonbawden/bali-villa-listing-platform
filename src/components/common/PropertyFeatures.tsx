import { Bed, Bath, Car, Maximize } from "lucide-react";

interface PropertyFeaturesProps {
  bedrooms: number;
  bathrooms: number;
  parking: number;
  landSize: string;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function PropertyFeatures({
  bedrooms,
  bathrooms,
  parking,
  landSize,
  className = "flex items-center gap-4",
  iconClassName = "w-4 h-4 text-gray-600",
  textClassName = "text-sm",
}: PropertyFeaturesProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-1">
        <Bed className={iconClassName} />
        <span className={textClassName}>{bedrooms}</span>
      </div>
      <div className="flex items-center gap-1">
        <Bath className={iconClassName} />
        <span className={textClassName}>{bathrooms}</span>
      </div>
      <div className="flex items-center gap-1">
        <Car className={iconClassName} />
        <span className={textClassName}>{parking}</span>
      </div>
      <div className="flex items-center gap-1">
        <Maximize className={iconClassName} />
        <span className={textClassName}>{landSize}</span>
      </div>
    </div>
  );
}
