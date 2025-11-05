import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PropertyData } from "./PropertyCard";
import { toast } from "sonner";
import { Copy, Facebook, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: PropertyData;
}

export function ShareModal({ open, onOpenChange, property }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  
  // Generate shareable URL (in production, this would be the actual property URL)
  const propertyUrl = `${window.location.origin}${window.location.pathname}?property=${property.id}`;
  
  const shareTitle = `${property.title} - ${property.suburb}`;
  const shareText = `Check out this property: ${property.title} in ${property.suburb} for ${property.price}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(propertyUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: propertyUrl,
        });
      } catch (error) {
        // User cancelled or error occurred
        console.error("Share failed:", error);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(shareTitle);
    const body = encodeURIComponent(`${shareText}\n\n${propertyUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${shareText}\n${propertyUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(propertyUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(shareText);
    const url = encodeURIComponent(propertyUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Property</DialogTitle>
          <DialogDescription>
            Share this property with friends and family
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-sm mb-1">{property.title}</h4>
          <p className="text-sm text-gray-600">{property.address}</p>
          <p className="text-sm text-gray-600">{property.suburb}</p>
          <p className="text-sm font-semibold text-emerald-600 mt-2">{property.price}</p>
        </div>

        <div className="space-y-4">
          {/* Copy Link */}
          <div>
            <label className="text-sm font-medium mb-2 block">Property Link</label>
            <div className="flex gap-2">
              <Input
                value={propertyUrl}
                readOnly
                className="flex-1"
              />
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="flex-shrink-0"
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          {/* Share Options */}
          <div>
            <label className="text-sm font-medium mb-3 block">Share via</label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleWhatsAppShare}
                variant="outline"
                className="justify-start"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              
              <Button
                onClick={handleEmailShare}
                variant="outline"
                className="justify-start"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              
              <Button
                onClick={handleFacebookShare}
                variant="outline"
                className="justify-start"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
              
              <Button
                onClick={handleTwitterShare}
                variant="outline"
                className="justify-start"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter/X
              </Button>
            </div>
          </div>

          {/* Native Share (mobile) */}
          {navigator.share && (
            <Button
              onClick={handleNativeShare}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              More Share Options
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
