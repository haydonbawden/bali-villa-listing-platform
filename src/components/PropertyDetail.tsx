import { useState } from "react";
import { PropertyData } from "./PropertyCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  ArrowLeft,
  Heart,
  Share2,
  Bed,
  Bath,
  Car,
  Maximize,
  MapPin,
  Phone,
  Mail,
  Home,
  Calendar,
  Check,
  Printer,
  Grid3x3,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Building2,
  Clock,
  Globe,
  Leaf,
  Wifi,
  Zap,
  Droplet,
  Users,
  FileText,
  Navigation,
  MessageCircle,
} from "lucide-react";
import { PropertyFeatures } from "./common/PropertyFeatures";
import { ImageGalleryModal } from "./common/ImageGalleryModal";

interface PropertyDetailProps {
  property: PropertyData;
  onBack: () => void;
  similarProperties?: PropertyData[];
  currency: "USD" | "IDR" | "AUD";
}

export function PropertyDetail({ property, onBack, similarProperties = [], currency }: PropertyDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const galleryImages = property.gallery || [property.image];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsGalleryOpen(true);
  };

  // Currency conversion
  const getPrice = () => {
    if (currency === "USD" && property.priceUSD) return `$${property.priceUSD.toLocaleString()}`;
    if (currency === "IDR" && property.priceIDR) return `Rp ${property.priceIDR.toLocaleString()}`;
    if (currency === "AUD" && property.priceAUD) return `A$${property.priceAUD.toLocaleString()}`;
    return property.price;
  };

  const description = property.description || "";
  const truncatedDescription = description.length > 300 ? description.substring(0, 300) + "..." : description;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb / Back Navigation */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button 
              onClick={onBack}
              className="text-gray-600 hover:text-emerald-600 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to search
            </button>
            <span className="text-gray-400">/</span>
            {property.regency && (
              <>
                <span className="text-gray-600">{property.regency}</span>
                <span className="text-gray-400">/</span>
              </>
            )}
            <span className="text-gray-600">{property.suburb}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{property.title}</span>
          </div>
        </div>
      </div>

      {/* Creative Image Gallery Layout */}
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="relative">
          {/* Desktop Gallery Grid */}
          <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-2 h-[600px] rounded-xl overflow-hidden">
            {/* Main large image */}
            <button
              onClick={() => openLightbox(0)}
              className="col-span-2 row-span-2 relative overflow-hidden group"
            >
              <ImageWithFallback
                src={galleryImages[0]}
                alt={`${property.title} - Main`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </button>

            {/* Top right images */}
            {galleryImages[1] && (
              <button
                onClick={() => openLightbox(1)}
                className="col-span-1 row-span-1 relative overflow-hidden group"
              >
                <ImageWithFallback
                  src={galleryImages[1]}
                  alt={`${property.title} - 2`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </button>
            )}

            {galleryImages[2] && (
              <button
                onClick={() => openLightbox(2)}
                className="col-span-1 row-span-1 relative overflow-hidden group"
              >
                <ImageWithFallback
                  src={galleryImages[2]}
                  alt={`${property.title} - 3`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </button>
            )}

            {/* Bottom right images */}
            {galleryImages[3] && (
              <button
                onClick={() => openLightbox(3)}
                className="col-span-1 row-span-1 relative overflow-hidden group"
              >
                <ImageWithFallback
                  src={galleryImages[3]}
                  alt={`${property.title} - 4`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </button>
            )}

            {galleryImages[4] && (
              <button
                onClick={() => openLightbox(4)}
                className="col-span-1 row-span-1 relative overflow-hidden group"
              >
                <ImageWithFallback
                  src={galleryImages[4]}
                  alt={`${property.title} - 5`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                {galleryImages.length > 5 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Grid3x3 className="w-8 h-8 mx-auto mb-2" />
                      <div className="text-lg">+{galleryImages.length - 5} more</div>
                    </div>
                  </div>
                )}
              </button>
            )}
          </div>

          {/* Mobile Gallery */}
          <div className="md:hidden">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <ImageWithFallback
                src={galleryImages[selectedImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {galleryImages.length}
              </div>
              {galleryImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full w-10 h-10"
                    onClick={() => setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full w-10 h-10"
                    onClick={() => setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length)}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* View All Photos Button */}
          {galleryImages.length > 1 && (
            <Button
              onClick={() => openLightbox(0)}
              variant="outline"
              className="hidden md:flex absolute bottom-6 right-6 bg-white hover:bg-gray-50 gap-2 shadow-lg"
            >
              <Grid3x3 className="w-4 h-4" />
              View all {galleryImages.length} photos
            </Button>
          )}
        </div>
      </div>

      {/* Lightbox Gallery Dialog */}
      <ImageGalleryModal
        images={galleryImages}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialIndex={lightboxIndex}
        propertyTitle={property.title}
      />

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Title & Overview */}
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl mb-3">{property.title}</h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">{property.address}, {property.suburb}</span>
                  </div>
                </div>
                <div className="hidden lg:flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Printer className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                {property.featured && (
                  <Badge className="bg-emerald-600 hover:bg-emerald-700">
                    Featured
                  </Badge>
                )}
                <Badge variant="outline" className="border-gray-300">
                  {property.transactionType === "sale" ? "For Sale" : property.transactionType === "lease" ? "For Lease" : "For Rent"}
                </Badge>
                {property.ownershipType && (
                  <Badge variant="outline" className="border-gray-300">
                    {property.ownershipType === "freehold" ? "Freehold" : `Leasehold${property.leaseUntil ? ` until ${property.leaseUntil}` : ""}`}
                  </Badge>
                )}
                {property.badges?.map((badge, idx) => (
                  <Badge key={idx} variant="outline" className="border-gray-300">
                    {badge}
                  </Badge>
                ))}
              </div>

              {/* Key Stats */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Bed className="w-5 h-5" />
                      <span className="text-sm">Bedrooms</span>
                    </div>
                    <div className="text-2xl">{property.bedrooms}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Bath className="w-5 h-5" />
                      <span className="text-sm">Bathrooms</span>
                    </div>
                    <div className="text-2xl">{property.bathrooms}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Car className="w-5 h-5" />
                      <span className="text-sm">Parking</span>
                    </div>
                    <div className="text-2xl">{property.parking}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Maximize className="w-5 h-5" />
                      <span className="text-sm">Land Size</span>
                    </div>
                    <div className="text-2xl">{property.landSize}</div>
                  </div>
                </div>
                {property.buildingSize && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Home className="w-4 h-4" />
                      <span className="text-sm">Building Size: {property.buildingSize}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Property Info */}
              <div className="flex items-center gap-6 text-sm text-gray-600 mt-4">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>ID: {property.id}</span>
                </div>
                {property.listedDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Listed: {property.listedDate}</span>
                  </div>
                )}
                {property.lastSeenAt && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Updated: {property.lastSeenAt}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* About Section */}
            <div>
              <h2 className="text-2xl mb-4">About this property</h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="whitespace-pre-line">
                  {showFullDescription ? description : truncatedDescription}
                </p>
                {description.length > 300 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-emerald-600 hover:text-emerald-700 mt-2 flex items-center gap-1"
                  >
                    {showFullDescription ? "Show less" : "Show more"}
                    <ChevronDown className={`w-4 h-4 transition-transform ${showFullDescription ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>
            </div>

            <Separator />

            {/* Expandable Sections */}
            <Accordion type="multiple" className="w-full">
              {/* Features Section */}
              {property.features && (
                <AccordionItem value="features">
                  <AccordionTrigger className="text-xl">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-600" />
                      <span>Features & Amenities</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 pt-2">
                      {property.features.pool && (
                        <div className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-gray-600" />
                          <div>
                            <div className="font-medium">Swimming Pool</div>
                          </div>
                        </div>
                      )}
                      {property.features.furnishing && (
                        <div className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-gray-600" />
                          <div>
                            <div className="font-medium">Furnishing</div>
                          </div>
                        </div>
                      )}
                      {property.features.kitchen && (
                        <div className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-gray-600" />
                          <div>
                            <div className="font-medium">Kitchen</div>
                          </div>
                        </div>
                      )}
                      {property.features.views && property.features.views.length > 0 && (
                        <div className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-gray-600" />
                          <div>
                            <div className="font-medium">Views</div>
                          </div>
                        </div>
                      )}
                      {property.features.ecoFeatures && property.features.ecoFeatures.length > 0 && (
                        <div className="flex items-center gap-3">
                          <Leaf className="w-4 h-4 text-gray-600" />
                          <div>
                            <div className="font-medium">Eco Features</div>
                          </div>
                        </div>
                      )}
                      {property.features.other && property.features.other.length > 0 && (
                        <>
                          {property.features.other.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-gray-600" />
                              <div>
                                <div className="font-medium">{feature}</div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Utilities Section */}
              {property.utilities && (
                <AccordionItem value="utilities">
                  <AccordionTrigger className="text-xl">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-emerald-600" />
                      <span>Utilities</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 pt-2">
                      {property.utilities.electricity && (
                        <div className="flex items-center gap-3">
                          <Zap className="w-4 h-4 text-gray-600" />
                          <div>
                            <div className="font-medium">Electricity</div>
                            <div className="text-sm text-gray-600">{property.utilities.electricity}</div>
                          </div>
                        </div>
                      )}
                      {property.utilities.water && (
                        <div className="flex items-center gap-3">
                          <Droplet className="w-4 h-4 text-gray-600" />
                          <div>
                            <div className="font-medium">Water</div>
                            <div className="text-sm text-gray-600">{property.utilities.water}</div>
                          </div>
                        </div>
                      )}
                      {property.utilities.internet && (
                        <div className="flex items-center gap-3">
                          <Wifi className="w-4 h-4 text-gray-600" />
                          <div>
                            <div className="font-medium">Internet</div>
                            <div className="text-sm text-gray-600">{property.utilities.internet}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Staff & Services */}
              {property.staff && property.staff.length > 0 && (
                <AccordionItem value="staff">
                  <AccordionTrigger className="text-xl">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-emerald-600" />
                      <span>Staff & Services</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 pt-2">
                      {property.staff.map((staff, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-gray-600" />
                          <div>
                            <div className="font-medium">{staff.role}</div>
                            <div className="text-sm text-gray-600">{staff.frequency}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Lease Terms */}
              {property.transactionType === "lease" && property.leaseTerms && (
                <AccordionItem value="lease">
                  <AccordionTrigger className="text-xl">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-emerald-600" />
                      <span>Lease Terms</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      {property.leaseTerms.monthlyRate && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">Monthly Rate</span>
                          <span className="font-medium">{property.leaseTerms.monthlyRate}</span>
                        </div>
                      )}
                      {property.leaseTerms.deposit && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">Security Deposit</span>
                          <span className="font-medium">{property.leaseTerms.deposit}</span>
                        </div>
                      )}
                      {property.leaseTerms.minimumStay && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">Minimum Stay</span>
                          <span className="font-medium">{property.leaseTerms.minimumStay}</span>
                        </div>
                      )}
                      {property.leaseTerms.availability && (
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Availability</span>
                          <span className="font-medium">{property.leaseTerms.availability}</span>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Legal */}
              {property.transactionType === "sale" && property.legal && (
                <AccordionItem value="legal">
                  <AccordionTrigger className="text-xl">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-emerald-600" />
                      <span>Legal Information</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 pt-2">
                      {property.legal.titleType && (
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-gray-600" />
                          <div>
                            <div className="font-medium">Title Type</div>
                            <div className="text-sm text-gray-600">{property.legal.titleType}</div>
                          </div>
                        </div>
                      )}
                      {property.legal.zoningStatus && (
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-gray-600" />
                          <div>
                            <div className="font-medium">Zoning Status</div>
                            <div className="text-sm text-gray-600">{property.legal.zoningStatus}</div>
                          </div>
                        </div>
                      )}
                      {property.legal.permitStatus && (
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-gray-600" />
                          <div>
                            <div className="font-medium">Permit Status</div>
                            <div className="text-sm text-gray-600">{property.legal.permitStatus}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Area & Lifestyle */}
              <AccordionItem value="location">
                <AccordionTrigger className="text-xl">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    <span>Area & Lifestyle</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 pt-2">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <div>
                        <div className="font-medium">Address</div>
                        <div className="text-sm text-gray-600">
                          {property.address}
                          {property.locality && <>, {property.locality}</>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <div>
                        <div className="font-medium">Location</div>
                        <div className="text-sm text-gray-600">
                          {property.suburb}
                          {property.subdistrict && <>, {property.subdistrict}</>}
                          {property.regency && <>, {property.regency}</>}
                        </div>
                      </div>
                    </div>

                    {property.travelTimes?.beach && (
                      <div className="flex items-center gap-3">
                        <Navigation className="w-4 h-4 text-gray-600" />
                        <div>
                          <div className="font-medium">Beach</div>
                          <div className="text-sm text-gray-600">{property.travelTimes.beach}</div>
                        </div>
                      </div>
                    )}

                    {property.travelTimes?.airport && (
                      <div className="flex items-center gap-3">
                        <Navigation className="w-4 h-4 text-gray-600" />
                        <div>
                          <div className="font-medium">Airport</div>
                          <div className="text-sm text-gray-600">{property.travelTimes.airport}</div>
                        </div>
                      </div>
                    )}

                    {property.travelTimes?.center && (
                      <div className="flex items-center gap-3">
                        <Navigation className="w-4 h-4 text-gray-600" />
                        <div>
                          <div className="font-medium">Town Center</div>
                          <div className="text-sm text-gray-600">{property.travelTimes.center}</div>
                        </div>
                      </div>
                    )}

                    {(property.latitude && property.longitude) && (
                      <div className="md:col-span-2 bg-gray-100 rounded-lg h-64 flex items-center justify-center border mt-4">
                        <div className="text-center text-gray-500">
                          <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>Map view</p>
                          <p className="text-xs mt-1">Lat: {property.latitude}, Lng: {property.longitude}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Separator />

            {/* Advertiser Section */}
            <div className="border rounded-lg p-6">
              <h2 className="text-2xl mb-4">
                {property.advertiserType === "agency" ? "Listed by Agency" : "Listed by Owner"}
              </h2>

              {property.advertiserType === "agency" ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    {property.agencyLogo ? (
                      <div className="w-16 h-16 rounded-lg border overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={property.agencyLogo}
                          alt={property.agencyName || "Agency"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                        {property.agencyName?.charAt(0) || "A"}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-lg">{property.agencyName}</div>
                      {property.agentName && (
                        <div className="text-gray-600">Agent: {property.agentName}</div>
                      )}
                      {property.agencyLicenseId && (
                        <div className="text-sm text-gray-500">License: {property.agencyLicenseId}</div>
                      )}
                    </div>
                  </div>

                  {property.agencyAddress && (
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <Building2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{property.agencyAddress}</span>
                    </div>
                  )}

                  {property.contactHours && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{property.contactHours}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {property.agentWhatsApp && (
                      <Button variant="outline" className="w-full gap-2">
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </Button>
                    )}
                    {property.agentPhone && (
                      <Button variant="outline" className="w-full gap-2">
                        <Phone className="w-4 h-4" />
                        {property.agentPhone}
                      </Button>
                    )}
                    {property.agentEmail && (
                      <Button variant="outline" className="w-full gap-2 col-span-full">
                        <Mail className="w-4 h-4" />
                        {property.agentEmail}
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium">Private Owner</div>
                      {property.ownerName && (
                        <div className="text-sm text-gray-600">{property.ownerName}</div>
                      )}
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                    This property is listed directly by the owner. Please exercise due diligence.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.ownerWhatsApp && (
                      <Button variant="outline" className="w-full gap-2">
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </Button>
                    )}
                    {property.ownerPhone && (
                      <Button variant="outline" className="w-full gap-2">
                        <Phone className="w-4 h-4" />
                        Call Owner
                      </Button>
                    )}
                    {property.ownerEmail && (
                      <Button variant="outline" className="w-full gap-2 col-span-full">
                        <Mail className="w-4 h-4" />
                        Email Owner
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Listing Source */}
              {property.listingSource && (
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Globe className="w-4 h-4" />
                    <span>Source: {property.listingSource}</span>
                    {property.lastSeenAt && (
                      <span className="text-gray-400">• Last seen {property.lastSeenAt}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Similar Properties - Mobile */}
            {similarProperties.length > 0 && (
              <div className="lg:hidden">
                <h2 className="text-2xl mb-4">Similar properties</h2>
                <div className="grid grid-cols-1 gap-4">
                  {similarProperties.slice(0, 3).map((similar) => (
                    <div key={similar.id} className="flex gap-4 border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="w-32 h-24 rounded overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={similar.image}
                          alt={similar.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="truncate mb-1">{similar.title}</h3>
                        <p className="text-sm text-gray-600 truncate mb-2">{similar.suburb}</p>
                        <p className="text-lg">{similar.price}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                          <span className="flex items-center gap-1">
                            <Bed className="w-4 h-4" />
                            {similar.bedrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath className="w-4 h-4" />
                            {similar.bathrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <Car className="w-4 h-4" />
                            {similar.parking}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Contact Card - Sticky */}
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="bg-white border rounded-lg p-6 shadow-sm">
                <div className="mb-4">
                  <div className="text-3xl">{getPrice()}</div>
                </div>
                
                {/* Agent/Owner Quick Info */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl">
                      {property.advertiserType === "agency" 
                        ? (property.agencyName?.charAt(0) || "A")
                        : (property.ownerName?.charAt(0) || "O")}
                    </div>
                    <div>
                      <div className="font-medium">
                        {property.advertiserType === "agency" 
                          ? (property.agencyName || "Agency")
                          : "Private Owner"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {property.advertiserType === "agency" && property.agentName
                          ? property.agentName
                          : "Licensed Agent"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  {property.advertiserType === "agency" && property.agentWhatsApp ? (
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 gap-2">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Agent
                    </Button>
                  ) : property.advertiserType === "owner" && property.ownerWhatsApp ? (
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 gap-2">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Owner
                    </Button>
                  ) : (
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 gap-2">
                      <Phone className="w-4 h-4" />
                      Call
                    </Button>
                  )}
                  
                  <Button variant="outline" className="w-full h-12 border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" className="w-full h-12">
                    Request inspection
                  </Button>
                </div>

                <Separator className="my-6" />

                {/* Contact Details */}
                <div className="space-y-3 text-sm">
                  {property.advertiserType === "agency" ? (
                    <>
                      {property.agentPhone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{property.agentPhone}</span>
                        </div>
                      )}
                      {property.agentEmail && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span className="break-all">{property.agentEmail}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {property.ownerPhone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{property.ownerPhone}</span>
                        </div>
                      )}
                      {property.ownerEmail && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span className="break-all">{property.ownerEmail}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Similar Properties - Desktop */}
              {similarProperties.length > 0 && (
                <div className="hidden lg:block bg-white border rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg mb-4">Similar properties</h3>
                  <div className="space-y-4">
                    {similarProperties.slice(0, 3).map((similar) => (
                      <div key={similar.id} className="group cursor-pointer">
                        <div className="flex gap-3">
                          <div className="w-24 h-20 rounded overflow-hidden flex-shrink-0">
                            <ImageWithFallback
                              src={similar.image}
                              alt={similar.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm truncate mb-1 group-hover:text-emerald-600 transition-colors">
                              {similar.title}
                            </div>
                            <div className="text-xs text-gray-600 truncate mb-2">{similar.suburb}</div>
                            <div className="font-medium">{similar.price}</div>
                            <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                              <span className="flex items-center gap-1">
                                <Bed className="w-3 h-3" />
                                {similar.bedrooms}
                              </span>
                              <span className="flex items-center gap-1">
                                <Bath className="w-3 h-3" />
                                {similar.bathrooms}
                              </span>
                              <span className="flex items-center gap-1">
                                <Car className="w-3 h-3" />
                                {similar.parking}
                              </span>
                            </div>
                          </div>
                        </div>
                        {similar !== similarProperties[similarProperties.length > 3 ? 2 : similarProperties.length - 1] && (
                          <Separator className="mt-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-xs text-gray-600">Price</div>
            <div className="text-xl">{getPrice()}</div>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
            <MessageCircle className="w-4 h-4" />
            Contact
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
