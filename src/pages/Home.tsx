import { useState, useEffect } from "react";
import { Search, Filter, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VenueCard from "@/components/VenueCard";
import FilterModal, { FilterOptions } from "@/components/FilterModal";
import { useNavigate } from "react-router-dom";

const mockVenues = [
  {
    id: "1",
    name: "The Rooftop Lounge",
    image: `https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop`,
    distance: "0.3 km",
    isOpen: true,
    rating: 4.5,
    type: "Cocktail Bar"
  },
  {
    id: "2", 
    name: "Craft Beer Garden",
    image: `https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=400&h=300&fit=crop`,
    distance: "0.7 km",
    isOpen: true,
    rating: 4.2,
    type: "Brewery"
  },
  {
    id: "3",
    name: "Wine & Dine",
    image: `https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop`,
    distance: "1.2 km",
    isOpen: false,
    rating: 4.8,
    type: "Wine Bar"
  }
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [venues, setVenues] = useState(mockVenues);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions | null>(null);
  const navigate = useNavigate();

  const filteredVenues = venues.filter(venue => {
    // Text search
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.type.toLowerCase().includes(searchTerm.toLowerCase());

    if (!activeFilters) return matchesSearch;

    // Apply filters
    const matchesType = activeFilters.venueTypes.length === 0 || 
      activeFilters.venueTypes.includes(venue.type);
    
    const matchesRating = venue.rating >= activeFilters.minRating;
    
    const matchesOpen = !activeFilters.openNow || venue.isOpen;
    
    // Distance filter would need real geolocation data
    // For now, we'll simulate it based on the distance string
    const distanceValue = parseFloat(venue.distance);
    const matchesDistance = distanceValue <= activeFilters.distance;

    return matchesSearch && matchesType && matchesRating && matchesOpen && matchesDistance;
  });

  const handleVenueClick = (venueId: string) => {
    navigate(`/venue/${venueId}`);
  };

  const handleApplyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="container pt-12 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold">Good evening! 🌆</h1>
              <div className="flex items-center mt-1">
                <MapPin size={14} className="mr-1" />
                <span className="text-sm opacity-90">Cape Town, SA</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" />
            <Input
              type="text"
              placeholder="Search venues or drinks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background text-foreground border-0 h-12"
            />
          </div>

          {/* Filter Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilterModal(true)}
            className="w-full bg-background/10 border-primary-foreground/20 text-primary-foreground h-12 btn-press"
          >
            <Filter size={18} className="mr-2" />
            Filters & Sort
            {activeFilters && (
              <span className="ml-auto bg-warning text-warning-foreground text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Venues List */}
      <div className="container pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Nearby Venues
          </h2>
          <span className="text-sm text-foreground/60">
            {filteredVenues.length} found
          </span>
        </div>

        {filteredVenues.length > 0 ? (
          <div className="space-y-0">
            {filteredVenues.map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                onClick={() => handleVenueClick(venue.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No venues found
            </h3>
            <p className="text-foreground/60">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        <FilterModal
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onApplyFilters={handleApplyFilters}
        />
      </div>
    </div>
  );
};

export default Home;