import { useState } from "react";
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

export default function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null);
  const [currency, setCurrency] = useState<"USD" | "IDR" | "AUD">("USD");
  const [language, setLanguage] = useState<"en" | "id">("en");

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
      <SearchBar />

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block w-[280px] flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Listings */}
          <div className="flex-1">
            {/* Results Bar */}
            <div className="bg-white border rounded-lg p-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <h2>
                  {properties.length} properties in Bali
                </h2>

                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Sort */}
                <Select defaultValue="newest">
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
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                  : "space-y-4"
              }
            >
              {properties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  onClick={() => setSelectedProperty(property)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700">
                  1
                </Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
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
