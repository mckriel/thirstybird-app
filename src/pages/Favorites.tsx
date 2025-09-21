import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, MapPin, Star } from "lucide-react";

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites] = useState([
    {
      id: 1,
      name: "Craft IPA",
      venue: "The Local Brewery",
      venueId: "brewery-123",
      price: 135,
      discount: 30,
      rating: 4.8,
      style: "India Pale Ale",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "House Wine",
      venue: "Wine Bar Central", 
      venueId: "wine-456",
      price: 195,
      discount: 45,
      rating: 4.6,
      style: "Pinot Grigio",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Classic Mojito",
      venue: "Cocktail Lounge",
      venueId: "cocktail-789",
      price: 225,
      discount: 60,
      rating: 4.9,
      style: "Rum Cocktail",
      image: "/placeholder.svg"
    }
  ]);

  const handleRemoveFavorite = (drinkId: number) => {
    // TODO: Implement remove from favorites
    console.log("Remove from favorites:", drinkId);
  };

  const handleViewVenue = (venueId: string) => {
    navigate(`/venue/${venueId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">My Favorites</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4">
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring venues and save your favorite drinks!
            </p>
            <Button onClick={() => navigate("/home")}>
              Discover Venues
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              {favorites.length} favorite drink{favorites.length !== 1 ? 's' : ''}
            </p>
            
            {favorites.map((drink) => (
              <Card key={drink.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <img
                      src={drink.image}
                      alt={drink.name}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{drink.name}</h3>
                          <p className="text-sm text-muted-foreground">{drink.style}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFavorite(drink.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Heart className="h-5 w-5 fill-current" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <button
                          onClick={() => handleViewVenue(drink.venueId)}
                          className="text-sm text-primary hover:underline"
                        >
                          {drink.venue}
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{drink.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Save R{drink.discount}
                          </Badge>
                          <div className="text-right">
                            <p className="text-lg font-bold">R{drink.price - drink.discount}</p>
                            <p className="text-sm text-muted-foreground line-through">
                              R{drink.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;