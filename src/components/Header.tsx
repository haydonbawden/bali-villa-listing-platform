import { Heart, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { AustralianFlag } from "./flags/AustralianFlag";
import { IndonesianFlag } from "./flags/IndonesianFlag";
import { CURRENCIES } from "../data/constants";

interface HeaderProps {
  currency: "USD" | "IDR" | "AUD";
  setCurrency: (currency: "USD" | "IDR" | "AUD") => void;
  language: "en" | "id";
  setLanguage: (language: "en" | "id") => void;
}

export function Header({ currency, setCurrency, language, setLanguage }: HeaderProps) {
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

            <Button variant="ghost" size="icon" className="hidden lg:flex">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden lg:flex">
              <User className="w-5 h-5" />
            </Button>
            <Button className="hidden md:flex bg-emerald-600 hover:bg-emerald-700">
              List property
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
