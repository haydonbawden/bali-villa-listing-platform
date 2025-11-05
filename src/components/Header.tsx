import { useState } from "react";
import { Heart, User, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { AustralianFlag } from "./flags/AustralianFlag";
import { IndonesianFlag } from "./flags/IndonesianFlag";
import { CURRENCIES } from "../data/constants";
import { useFavorites } from "../contexts/FavoritesContext";

interface HeaderProps {
  currency: "USD" | "IDR" | "AUD";
  setCurrency: (currency: "USD" | "IDR" | "AUD") => void;
  language: "en" | "id";
  setLanguage: (language: "en" | "id") => void;
}

export function Header({ currency, setCurrency, language, setLanguage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center">
                <span className="text-white">B</span>
              </div>
              <span className="font-semibold text-xl">BaliVillas</span>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="hover:text-emerald-600 transition-colors">Buy</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">Rent</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">Sold</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">New Homes</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">Agents</a>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <Select value={language} onValueChange={(val) => setLanguage(val as "en" | "id")}>
              <SelectTrigger className="w-[60px] h-9 hidden md:flex">
                <SelectValue>
                  {language === "en" ? <AustralianFlag /> : <IndonesianFlag />}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">
                  <AustralianFlag />
                </SelectItem>
                <SelectItem value="id">
                  <IndonesianFlag />
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Currency Selector */}
            <Select value={currency} onValueChange={(val) => setCurrency(val as "USD" | "IDR" | "AUD")}>
              <SelectTrigger className="w-[80px] h-9 hidden md:flex">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((curr) => (
                  <SelectItem key={curr.value} value={curr.value}>
                    {curr.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="ghost" size="icon" className="hidden lg:flex relative">
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="hidden lg:flex">
              <User className="w-5 h-5" />
            </Button>
            <Button className="hidden md:flex bg-emerald-600 hover:bg-emerald-700">
              List property
            </Button>
            
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-6">
                  <a href="#" className="py-2 text-lg hover:text-emerald-600" onClick={() => setMobileMenuOpen(false)}>
                    Buy
                  </a>
                  <a href="#" className="py-2 text-lg hover:text-emerald-600" onClick={() => setMobileMenuOpen(false)}>
                    Rent
                  </a>
                  <a href="#" className="py-2 text-lg hover:text-emerald-600" onClick={() => setMobileMenuOpen(false)}>
                    Sold
                  </a>
                  <a href="#" className="py-2 text-lg hover:text-emerald-600" onClick={() => setMobileMenuOpen(false)}>
                    New Homes
                  </a>
                  <a href="#" className="py-2 text-lg hover:text-emerald-600" onClick={() => setMobileMenuOpen(false)}>
                    Agents
                  </a>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-2 block">Language</label>
                      <Select value={language} onValueChange={(val) => setLanguage(val as "en" | "id")}>
                        <SelectTrigger className="w-full">
                          <SelectValue>
                            {language === "en" ? <AustralianFlag /> : <IndonesianFlag />}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">
                            <AustralianFlag />
                          </SelectItem>
                          <SelectItem value="id">
                            <IndonesianFlag />
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-2 block">Currency</label>
                      <Select value={currency} onValueChange={(val) => setCurrency(val as "USD" | "IDR" | "AUD")}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CURRENCIES.map((curr) => (
                            <SelectItem key={curr.value} value={curr.value}>
                              {curr.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4">
                    List property
                  </Button>
                  
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" className="flex-1 relative">
                      <Heart className="w-5 h-5" />
                      {favorites.length > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                          {favorites.length}
                        </span>
                      )}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <User className="w-5 h-5" />
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
