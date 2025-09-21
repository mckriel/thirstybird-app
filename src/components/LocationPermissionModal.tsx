import { useState } from "react";
import { MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface LocationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAllow: () => void;
  onSkip: () => void;
}

const LocationPermissionModal = ({
  isOpen,
  onClose,
  onAllow,
  onSkip
}: LocationPermissionModalProps) => {
  const handleRequestLocation = async () => {
    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          () => {
            localStorage.setItem("thirstybird-location-granted", "true");
            onAllow();
          },
          () => {
            // Permission denied or error
            onSkip();
          }
        );
      } else {
        onSkip();
      }
    } catch (error) {
      onSkip();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-sm rounded-2xl p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin size={32} className="text-primary" />
          </div>
          
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Find Venues Near You
          </h2>
          
          <p className="text-foreground/70 text-sm leading-relaxed mb-6">
            Allow location access to discover the best drink deals and venues in your area. 
            We'll only use this to show nearby venues.
          </p>
          
          <div className="space-y-3">
            <Button
              onClick={handleRequestLocation}
              className="w-full bg-primary text-primary-foreground font-medium py-3 btn-press"
            >
              Allow Location Access
            </Button>
            
            <Button
              variant="ghost"
              onClick={onSkip}
              className="w-full text-foreground/60 font-medium py-3 btn-press"
            >
              Skip for now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationPermissionModal;