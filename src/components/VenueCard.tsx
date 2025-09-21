import { Star, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface VenueCardProps {
  venue: {
    id: string;
    name: string;
    image: string;
    distance: string;
    isOpen: boolean;
    rating: number;
    type: string;
  };
  onClick?: () => void;
}

const VenueCard = ({ venue, onClick }: VenueCardProps) => {
  return (
    <div
      className="bg-card rounded-lg shadow-card p-4 mb-4 btn-press cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        {/* Venue Image */}
        <div className="w-16 h-16 rounded-lg bg-inactive flex-shrink-0 overflow-hidden">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Venue Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-foreground text-sm truncate">
              {venue.name}
            </h3>
            <div className="flex items-center space-x-1 ml-2">
              <Star size={12} className="text-warning fill-current" />
              <span className="text-xs font-medium text-foreground">
                {venue.rating}
              </span>
            </div>
          </div>

          <p className="text-xs text-foreground/60 mb-2">
            {venue.type}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <MapPin size={12} className="text-foreground/40" />
              <span className="text-xs text-foreground/60">
                {venue.distance}
              </span>
            </div>

            <div
              className={cn(
                "badge-status",
                venue.isOpen ? "open" : "closed"
              )}
            >
              {venue.isOpen ? "Open" : "Closed"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;