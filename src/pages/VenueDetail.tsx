import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import DrinkCard from "@/components/DrinkCard";
import { useToast } from "@/hooks/use-toast";

import { useOfflineSync } from "@/hooks/useOfflineSync";

const mockVenue = {
  id: "1",
  name: "The Rooftop Lounge",
  images: [
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=400&fit=crop"
  ],
  address: "123 Long Street, Cape Town City Centre",
  hours: "Mon-Sun: 4:00 PM - 2:00 AM",
  rating: 4.5,
  type: "Cocktail Bar",
  description: "Sophisticated rooftop bar with panoramic city views and craft cocktails"
};

const mockDrinks = [
  {
    id: "1",
    name: "Signature Mojito",
    style: "Classic Cocktail",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200&h=200&fit=crop",
    originalPrice: 85,
    discountPrice: 60,
    discountPercent: 30,
    validityText: "Sat 5–7 PM",
    validityDays: [6], // Saturday
    validityHours: { start: 17, end: 19 }, // 5-7 PM
    leftCount: 14
  },
  {
    id: "2",
    name: "Craft Beer Flight",
    style: "Local Craft Beer",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=200&fit=crop",
    originalPrice: 120,
    discountPrice: 85,
    discountPercent: 25,
    validityText: "Today 4–9 PM",
    validityDays: [0, 1, 2, 3, 4, 5, 6], // All days
    validityHours: { start: 16, end: 21 }, // 4-9 PM
    leftCount: 8
  },
  {
    id: "3",
    name: "Premium Wine",
    style: "South African Red",
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=200&h=200&fit=crop",
    originalPrice: 95,
    discountPrice: 70,
    discountPercent: 26,
    validityText: "All Day",
    validityDays: [0, 1, 2, 3, 4, 5, 6], // All days
    validityHours: { start: 0, end: 23 }, // All day
    leftCount: 23
  }
];

const VenueDetail = () => {
  const { venueId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { isOnline, addOfflineAction } = useOfflineSync();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});

  // Check if a drink is currently valid for purchase
  const isDrinkValid = (drink: any) => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    
    const validDay = drink.validityDays.includes(currentDay);
    const validTime = currentHour >= drink.validityHours.start && currentHour <= drink.validityHours.end;
    
    return validDay && validTime;
  };

  const handleQuantityChange = (drinkId: string, quantity: number) => {
    const drink = mockDrinks.find(d => d.id === drinkId);
    
    if (drink && !isDrinkValid(drink) && quantity > 0) {
      toast({
        title: "Drink not available",
        description: `${drink.name} is only available ${drink.validityText}`,
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setCart(prev => ({
      ...prev,
      [drinkId]: quantity
    }));

    if (quantity > 0) {
      // Store action for offline sync
      if (!isOnline) {
        addOfflineAction('ADD_TO_CART', {
          drinkId,
          quantity,
          timestamp: Date.now()
        });
      }
    }
  };

  const handleFavoriteToggle = (drinkId: string) => {
    const isCurrentlyFavorite = favorites.includes(drinkId);
    
    setFavorites(prev => 
      isCurrentlyFavorite
        ? prev.filter(id => id !== drinkId)
        : [...prev, drinkId]
    );
    
    toast({
      title: isCurrentlyFavorite ? "Removed from favorites" : "Added to favorites",
      duration: 2000,
    });

    // Store action for offline sync
    if (!isOnline) {
      addOfflineAction('UPDATE_FAVORITES', {
        drinkId,
        action: isCurrentlyFavorite ? 'remove' : 'add',
        timestamp: Date.now()
      });
    }
  };

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const cartTotal = mockDrinks.reduce((total, drink) => {
    const quantity = cart[drink.id] || 0;
    return total + (drink.discountPrice * quantity);
  }, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Back Button */}
      <div className="relative">
        <div className="h-48 bg-inactive overflow-hidden">
          <img
            src={mockVenue.images[0]}
            alt={mockVenue.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm btn-press"
        >
          <ArrowLeft size={20} />
        </Button>
      </div>

      {/* Venue Info */}
      <div className="container pt-4">
        <div className="mb-6">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-xl font-semibold text-foreground">
              {mockVenue.name}
            </h1>
            <div className="flex items-center space-x-1">
              <Star size={16} className="text-warning fill-current" />
              <span className="font-medium text-foreground">
                {mockVenue.rating}
              </span>
            </div>
          </div>

          <p className="text-foreground/70 text-sm mb-3">
            {mockVenue.description}
          </p>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-foreground/50" />
              <span className="text-sm text-foreground/70">
                {mockVenue.address}
              </span>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <ExternalLink size={14} className="text-primary" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-foreground/50" />
              <span className="text-sm text-foreground/70">
                {mockVenue.hours}
              </span>
            </div>
          </div>
        </div>

        {/* Drinks Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Available Drinks
          </h2>

          <div className="space-y-0">
            {mockDrinks.map((drink) => (
              <div key={drink.id} className="relative">
                <DrinkCard
                  drink={drink}
                  onQuantityChange={handleQuantityChange}
                  onFavoriteToggle={handleFavoriteToggle}
                  isFavorite={favorites.includes(drink.id)}
                />
                {!isDrinkValid(drink) && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground/70">
                        Available {drink.validityText}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Offline Status */}
          {!isOnline && (
            <div className="mt-4 p-3 bg-warning/10 border border-warning rounded-lg">
              <p className="text-sm text-warning-foreground">
                📶 You're offline. Actions will sync when connection is restored.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Checkout Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 left-0 right-0 p-4 z-40">
          <Button
            onClick={() => navigate("/cart")}
            className="w-full bg-primary text-primary-foreground font-semibold py-4 shadow-modal btn-press"
          >
            <div className="flex items-center justify-between w-full">
              <span>View Cart ({cartCount})</span>
              <span>R{cartTotal.toFixed(0)}</span>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default VenueDetail;