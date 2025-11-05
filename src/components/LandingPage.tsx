import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { PropertyCard, PropertyData } from "./PropertyCard";
import { QuickSearch } from "./QuickSearch";
import { ChevronRight, Search } from "lucide-react";

interface LandingPageProps {
  featuredProperties: PropertyData[];
  onPropertyClick: (property: PropertyData) => void;
  onExploreClick: () => void;
}

export function LandingPage({
  featuredProperties,
  onPropertyClick,
  onExploreClick,
}: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 z-10" />
        
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-aerial-view-of-beautiful-resort-2547/1080p.mp4"
            type="video/mp4"
          />
          {/* Fallback image if video doesn't load */}
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1728050829093-9ee62013968a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYWxpJTIwdmlsbGElMjBwb29sfGVufDF8fHx8MTc2MjAzODc1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury Bali Villa"
            className="w-full h-full object-cover"
          />
        </video>
        
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl mb-6">
            Your Dream Villa in Bali
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Discover exclusive luxury properties in paradise
          </p>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg"
            onClick={onExploreClick}
          >
            Explore Properties
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Quick Search Section */}
      <QuickSearch />

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="mb-2">Featured Villas</h2>
              <p className="text-gray-600">
                Explore our hand-selected premium properties
              </p>
            </div>
            <Button
              variant="outline"
              onClick={onExploreClick}
              className="hidden md:flex"
            >
              View All Properties
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProperties.slice(0, 6).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={() => onPropertyClick(property)}
              />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" onClick={onExploreClick} className="w-full">
              View All Properties
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Locations Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Explore Bali's Finest Regions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From vibrant coastal towns to serene mountain retreats, find your perfect location
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Seminyak */}
            <div className="group relative h-[300px] rounded-lg overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10 group-hover:from-black/80 transition-all" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1711783005778-65026f32694e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwc3Vuc2V0JTIwb2NlYW58ZW58MXx8fHwxNzYyMDM4NzU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Seminyak"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-white mb-2">Seminyak</h3>
                <p className="text-white/90 text-sm">Beach clubs & luxury living</p>
              </div>
            </div>

            {/* Ubud */}
            <div className="group relative h-[300px] rounded-lg overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10 group-hover:from-black/80 transition-all" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1656247203824-3d6f99461ba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwcmljZSUyMHRlcnJhY2VzfGVufDF8fHx8MTc2MjAzODc1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Ubud"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-white mb-2">Ubud</h3>
                <p className="text-white/90 text-sm">Cultural heart & rice terraces</p>
              </div>
            </div>

            {/* Canggu */}
            <div className="group relative h-[300px] rounded-lg overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10 group-hover:from-black/80 transition-all" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1627357059324-0346e7f7fb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdHJvcGljYWwlMjB2aWxsYXxlbnwxfHx8fDE3NjIwMzg3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Canggu"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-white mb-2">Canggu</h3>
                <p className="text-white/90 text-sm">Surf & digital nomad hub</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-white mb-4">Ready to Find Your Paradise?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Browse our extensive collection of premium villas or get in touch with our expert agents
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8"
              onClick={onExploreClick}
            >
              <Search className="w-5 h-5 mr-2" />
              Browse Properties
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8"
            >
              Contact an Agent
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
