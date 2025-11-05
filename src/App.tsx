import { useState, useMemo } from "react";
import "./styles/globals.css";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { PropertyCard, PropertyData } from "./components/PropertyCard";
import { PropertyDetail } from "./components/PropertyDetail";
import { FilterSidebar } from "./components/FilterSidebar";
import { LandingPage } from "./components/LandingPage";
import { properties } from "./data/properties";
import { Button } from "./components/ui/button";
import { LayoutGrid, List, Map, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/ui/sheet";
import { useSearch } from "./contexts/SearchContext";
import { filterProperties, sortProperties } from "./utils/propertyFilters";
import { PropertyCardSkeletonGrid } from "./components/PropertyCardSkeleton";
import { NoResults } from "./components/NoResults";

export default function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null);
  const [currency, setCurrency] = useState<"USD" | "IDR" | "AUD">("USD");
  const [language, setLanguage] = useState<"en" | "id">("en");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const { filters, updateFilters, resetFilters } = useSearch();
  const itemsPerPage = 12;

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    const filtered = filterProperties(properties, filters);
    return sortProperties(filtered, filters.sortBy);
  }, [filters]);

  // Paginate results
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProperties, currentPage]);

  // Reset to page 1 when filters change
  const handleFiltersChange = (updates: Partial<typeof filters>) => {
    updateFilters(updates);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // If a property is selected, show detail view
  if (selectedProperty) {
    // Get similar properties (same suburb or similar price range)
    const similarProperties = properties.filter(
      (p) => p.id !== selectedProperty.id && 
      (p.suburb === selectedProperty.suburb || Math.abs(parseInt(p.price.replace(/[$,]/g, '')) - parseInt(selectedProperty.price.replace(/[$,]/g, ''))) < 500000)
    );

    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          currency={currency}
          setCurrency={setCurrency}
          language={language}
          setLanguage={setLanguage}
        />
        <PropertyDetail 
          property={selectedProperty} 
          onBack={() => setSelectedProperty(null)}
          similarProperties={similarProperties}
          currency={currency}
        />
      </div>
    );
  }

  // Show landing page
  if (showLandingPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          currency={currency}
          setCurrency={setCurrency}
          language={language}
          setLanguage={setLanguage}
        />
        <LandingPage
          featuredProperties={properties}
          onPropertyClick={(property) => {
            setSelectedProperty(property);
            setShowLandingPage(false);
          }}
          onExploreClick={() => setShowLandingPage(false)}
        />
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-[1400px] mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="mb-4">About BaliVillas</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white">About us</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Media</a></li>
                  <li><a href="#" className="hover:text-white">Investor centre</a></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4">Using BaliVillas</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white">Help centre</a></li>
                  <li><a href="#" className="hover:text-white">Property data</a></li>
                  <li><a href="#" className="hover:text-white">Suburb profiles</a></li>
                  <li><a href="#" className="hover:text-white">Market insights</a></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4">Agents & Services</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white">Find agents</a></li>
                  <li><a href="#" className="hover:text-white">Property management</a></li>
                  <li><a href="#" className="hover:text-white">Developers</a></li>
                  <li><a href="#" className="hover:text-white">Mortgage brokers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4">Tools & Resources</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white">Property guides</a></li>
                  <li><a href="#" className="hover:text-white">Buying guide</a></li>
                  <li><a href="#" className="hover:text-white">Selling guide</a></li>
                  <li><a href="#" className="hover:text-white">Renting guide</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
              <p>&copy; 2025 BaliVillas. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Show listings page
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currency={currency}
        setCurrency={setCurrency}
        language={language}
        setLanguage={setLanguage}
      />
      <SearchBar 
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block w-[280px] flex-shrink-0">
            <FilterSidebar 
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onReset={resetFilters}
            />
          </div>

          {/* Listings */}
          <div className="flex-1">
            {/* Results Bar */}
            <div className="bg-white border rounded-lg p-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <h2>
                  {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} in Bali
                </h2>

                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                      {(filters.features.length > 0 || filters.bedrooms > 0 || filters.bathrooms > 0) && (
                        <span className="ml-2 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {filters.features.length + (filters.bedrooms > 0 ? 1 : 0) + (filters.bathrooms > 0 ? 1 : 0)}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar 
                        filters={filters}
                        onFiltersChange={handleFiltersChange}
                        onReset={resetFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Sort */}
                <Select 
                  value={filters.sortBy} 
                  onValueChange={(value) => handleFiltersChange({ sortBy: value })}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="price-low">Price: Low to high</SelectItem>
                    <SelectItem value="price-high">Price: High to low</SelectItem>
                    <SelectItem value="bedrooms">Most bedrooms</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="hidden sm:flex items-center gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Map className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Property Grid */}
            {isLoading ? (
              <PropertyCardSkeletonGrid count={itemsPerPage} />
            ) : filteredProperties.length === 0 ? (
              <NoResults onReset={resetFilters} />
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                    : "space-y-4"
                }
              >
                {paginatedProperties.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property}
                    onClick={() => setSelectedProperty(property)}
                    currency={currency}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!isLoading && filteredProperties.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    // Show first 3, last 1, and current page context
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        className={currentPage === pageNum ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  
                  <Button 
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-[1400px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="mb-4">About BaliVillas</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">About us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Media</a></li>
                <li><a href="#" className="hover:text-white">Investor centre</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4">Using BaliVillas</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Help centre</a></li>
                <li><a href="#" className="hover:text-white">Property data</a></li>
                <li><a href="#" className="hover:text-white">Suburb profiles</a></li>
                <li><a href="#" className="hover:text-white">Market insights</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4">Agents & Services</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Find agents</a></li>
                <li><a href="#" className="hover:text-white">Property management</a></li>
                <li><a href="#" className="hover:text-white">Developers</a></li>
                <li><a href="#" className="hover:text-white">Mortgage brokers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4">Tools & Resources</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Property guides</a></li>
                <li><a href="#" className="hover:text-white">Buying guide</a></li>
                <li><a href="#" className="hover:text-white">Selling guide</a></li>
                <li><a href="#" className="hover:text-white">Renting guide</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 BaliVillas. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
