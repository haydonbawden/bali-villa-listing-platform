import { SearchX } from "lucide-react";
import { Button } from "./ui/button";

interface NoResultsProps {
  onReset: () => void;
}

export function NoResults({ onReset }: NoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <SearchX className="w-10 h-10 text-gray-400" />
      </div>
      
      <h3 className="text-2xl font-semibold mb-2">No properties found</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        We couldn't find any properties matching your search criteria. Try adjusting your filters or search terms.
      </p>
      
      <Button
        onClick={onReset}
        className="bg-emerald-600 hover:bg-emerald-700"
      >
        Clear all filters
      </Button>
    </div>
  );
}
