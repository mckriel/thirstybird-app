import { Heart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DrinkCardProps {
  drink: {
    id: string;
    name: string;
    style: string;
    image: string;
    originalPrice: number;
    discountPrice: number;
    discountPercent: number;
    validityText: string;
    leftCount: number;
  };
  onQuantityChange?: (drinkId: string, quantity: number) => void;
  onFavoriteToggle?: (drinkId: string) => void;
  isFavorite?: boolean;
}

const DrinkCard = ({ 
  drink, 
  onQuantityChange, 
  onFavoriteToggle, 
  isFavorite = false 
}: DrinkCardProps) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      onQuantityChange?.(drink.id, newQuantity);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-4 mb-4">
      <div className="flex items-start space-x-3">
        {/* Drink Image */}
        <div className="w-16 h-16 rounded-lg bg-inactive flex-shrink-0 overflow-hidden">
          <img
            src={drink.image}
            alt={drink.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Drink Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-sm mb-1">
                {drink.name}
              </h3>
              <p className="text-xs text-foreground/60 mb-2">
                {drink.style}
              </p>
            </div>
            
            <button
              onClick={() => onFavoriteToggle?.(drink.id)}
              className="btn-press ml-2"
            >
              <Heart
                size={16}
                className={cn(
                  "transition-colors",
                  isFavorite 
                    ? "text-red-500 fill-current" 
                    : "text-foreground/40"
                )}
              />
            </button>
          </div>

          {/* Discount Badge */}
          <div className="badge-discount mb-2 inline-block">
            {drink.discountPercent}% OFF
          </div>

          {/* Pricing */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg font-semibold text-foreground">
              R{drink.discountPrice}
            </span>
            <span className="text-sm text-foreground/50 line-through">
              R{drink.originalPrice}
            </span>
          </div>

          {/* Validity and Stock */}
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="text-foreground/60">
              {drink.validityText}
            </span>
            <span className="text-warning font-medium">
              {drink.leftCount} left
            </span>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 btn-press"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity === 0}
              >
                <Minus size={14} />
              </Button>
              
              <span className="font-medium text-foreground min-w-[2rem] text-center">
                {quantity}
              </span>
              
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 btn-press"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <Plus size={14} />
              </Button>
            </div>

            {quantity > 0 && (
              <div className="text-sm font-semibold text-foreground">
                R{(drink.discountPrice * quantity).toFixed(0)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkCard;