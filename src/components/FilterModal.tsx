import { useState } from "react";
import { X, Filter, MapPin, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  distance: number;
  venueTypes: string[];
  timeSlots: string[];
  minRating: number;
  openNow: boolean;
}

const venueTypes = [
  "Cocktail Bar",
  "Brewery", 
  "Wine Bar",
  "Sports Bar",
  "Restaurant",
  "Lounge"
];

const timeSlots = [
  "Happy Hour (4-6 PM)",
  "Evening (6-9 PM)", 
  "Late Night (9 PM+)",
  "Weekend Special"
];

const FilterModal = ({ isOpen, onClose, onApplyFilters }: FilterModalProps) => {
  const [distance, setDistance] = useState([5]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [minRating, setMinRating] = useState([3]);
  const [openNow, setOpenNow] = useState(false);

  const toggleVenueType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleTimeSlot = (slot: string) => {
    setSelectedTimeSlots(prev =>
      prev.includes(slot)
        ? prev.filter(s => s !== slot)
        : [...prev, slot]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      distance: distance[0],
      venueTypes: selectedTypes,
      timeSlots: selectedTimeSlots,
      minRating: minRating[0],
      openNow
    });
    onClose();
  };

  const handleClear = () => {
    setDistance([5]);
    setSelectedTypes([]);
    setSelectedTimeSlots([]);
    setMinRating([3]);
    setOpenNow(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] max-w-sm max-h-[90vh] overflow-y-auto rounded-2xl p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">Filters</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X size={18} />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-6">
          {/* Distance */}
          <div>
            <div className="flex items-center mb-3">
              <MapPin size={16} className="mr-2 text-primary" />
              <span className="font-medium text-foreground">
                Distance: {distance[0]} km
              </span>
            </div>
            <Slider
              value={distance}
              onValueChange={setDistance}
              max={25}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Venue Types */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Venue Types</h3>
            <div className="flex flex-wrap gap-2">
              {venueTypes.map((type) => (
                <Badge
                  key={type}
                  variant={selectedTypes.includes(type) ? "default" : "outline"}
                  className="cursor-pointer btn-press"
                  onClick={() => toggleVenueType(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <div className="flex items-center mb-3">
              <Clock size={16} className="mr-2 text-primary" />
              <span className="font-medium text-foreground">Available Times</span>
            </div>
            <div className="space-y-2">
              {timeSlots.map((slot) => (
                <div
                  key={slot}
                  className={`p-3 rounded-lg border cursor-pointer btn-press ${
                    selectedTimeSlots.includes(slot)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border"
                  }`}
                  onClick={() => toggleTimeSlot(slot)}
                >
                  <span className="text-sm">{slot}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <div className="flex items-center mb-3">
              <Star size={16} className="mr-2 text-primary" />
              <span className="font-medium text-foreground">
                Min Rating: {minRating[0]}.0+
              </span>
            </div>
            <Slider
              value={minRating}
              onValueChange={setMinRating}
              max={5}
              min={1}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* Open Now */}
          <div
            className={`p-3 rounded-lg border cursor-pointer btn-press ${
              openNow
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-border"
            }`}
            onClick={() => setOpenNow(!openNow)}
          >
            <span className="text-sm font-medium">Open Now Only</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleApply}
              className="w-full bg-primary text-primary-foreground font-medium py-3 btn-press"
            >
              Apply Filters
            </Button>
            
            <Button
              variant="outline"
              onClick={handleClear}
              className="w-full font-medium py-3 btn-press"
            >
              Clear All
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;