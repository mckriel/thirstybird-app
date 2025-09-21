import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const mockCartItems = [
  {
    id: "1",
    name: "Signature Mojito",
    venueName: "The Rooftop Lounge",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200&h=200&fit=crop",
    price: 60,
    originalPrice: 85,
    quantity: 2,
    validityText: "Sat 5–7 PM"
  },
  {
    id: "2",
    name: "Craft Beer Flight",
    venueName: "The Rooftop Lounge", 
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=200&fit=crop",
    price: 85,
    originalPrice: 120,
    quantity: 1,
    validityText: "Today 4–9 PM"
  }
];

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState(mockCartItems);

  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Item removed from cart",
      duration: 2000,
    });
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(itemId);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const savings = originalTotal - subtotal;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="bg-primary text-primary-foreground">
          <div className="container pt-12 pb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-xl font-semibold">Cart</h1>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="container pt-12">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-foreground/60 mb-6">
              Add some drinks to get started
            </p>
            <Button 
              onClick={() => navigate("/")}
              className="btn-press"
            >
              Browse Venues
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="container pt-12 pb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-semibold">Cart ({cartItems.length})</h1>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="container pt-6">
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-card rounded-lg shadow-card p-4">
              <div className="flex items-start space-x-3">
                <div className="w-16 h-16 rounded-lg bg-inactive flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">
                        {item.name}
                      </h3>
                      <p className="text-xs text-foreground/60">
                        {item.venueName}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:bg-destructive/10 btn-press"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>

                  <p className="text-xs text-foreground/60 mb-2">
                    {item.validityText}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-foreground">
                        R{item.price}
                      </span>
                      <span className="text-sm text-foreground/50 line-through">
                        R{item.originalPrice}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 btn-press"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="font-medium text-foreground min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 btn-press"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-card rounded-lg shadow-card p-4 mb-6">
          <h3 className="font-semibold text-foreground mb-3">Order Summary</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/70">Original Total</span>
              <span className="text-foreground/70 line-through">R{originalTotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-sm text-accent">
              <span>You Save</span>
              <span>-R{savings.toFixed(0)}</span>
            </div>
            <div className="border-t border-border pt-2">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>R{subtotal.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={handleCheckout}
          className="w-full bg-primary text-primary-foreground font-semibold py-4 btn-press"
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;