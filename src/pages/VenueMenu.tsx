import { useState, useEffect } from "react";
import { useVenueAuth } from "@/hooks/useVenueAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Drink {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock_quantity: number;
  is_happy_hour: boolean;
  discount_percentage: number;
  alcohol_content: number;
  available_from: string;
  available_until: string;
}

const VenueMenu = () => {
  const { venueProfile, hasPermission } = useVenueAuth();
  const { toast } = useToast();
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDrink, setEditingDrink] = useState<Drink | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (venueProfile?.venue_id) {
      fetchDrinks();
    }
  }, [venueProfile]);

  const fetchDrinks = async () => {
    if (!venueProfile?.venue_id) return;

    try {
      // TODO: Replace with proper API call to fetch venue drinks
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Placeholder drinks data - replace with actual API call
      const mockDrinks: Drink[] = [
        {
          id: "1",
          name: "Craft IPA",
          description: "Local craft beer with hoppy flavor",
          price: 135,
          category: "Beer",
          image_url: "",
          stock_quantity: 25,
          is_happy_hour: true,
          discount_percentage: 20,
          alcohol_content: 5.2,
          available_from: "12:00",
          available_until: "23:00"
        },
        {
          id: "2",
          name: "House Wine Red",
          description: "Premium red wine from local vineyard",
          price: 195,
          category: "Wine",
          image_url: "",
          stock_quantity: 15,
          is_happy_hour: false,
          discount_percentage: 0,
          alcohol_content: 12.5,
          available_from: "16:00",
          available_until: "23:00"
        },
        {
          id: "3",
          name: "Classic Mojito",
          description: "Fresh mint, lime, and white rum cocktail",
          price: 165,
          category: "Cocktail",
          image_url: "",
          stock_quantity: 0,
          is_happy_hour: true,
          discount_percentage: 15,
          alcohol_content: 8.0,
          available_from: "18:00",
          available_until: "02:00"
        }
      ];
      
      setDrinks(mockDrinks);
    } catch (error) {
      console.error("Error fetching drinks:", error);
      toast({
        title: "Error",
        description: "Failed to load menu items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const DrinkCard = ({ drink }: { drink: Drink }) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{drink.name}</CardTitle>
            <CardDescription className="mt-1">
              {drink.description}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditingDrink(drink)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Price:</span> ${drink.price}
          </div>
          <div>
            <span className="font-medium">Category:</span> {drink.category}
          </div>
          <div>
            <span className="font-medium">Stock:</span> {drink.stock_quantity}
          </div>
          <div>
            <span className="font-medium">ABV:</span> {drink.alcohol_content}%
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Badge variant={drink.is_happy_hour ? "default" : "secondary"}>
            {drink.is_happy_hour ? "Happy Hour" : "Regular"}
          </Badge>
          <Badge variant={drink.stock_quantity > 0 ? "outline" : "destructive"}>
            {drink.stock_quantity > 0 ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading menu...</p>
        </div>
      </div>
    );
  }

  // Check permissions
  if (!hasPermission('menu')) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
        <p className="text-muted-foreground">
          You don't have permission to manage the menu. Contact your administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Menu Management</h1>
          <p className="text-muted-foreground">
            Add, edit, and manage your venue's drink menu.
          </p>
        </div>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Drink
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {drinks.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No drinks in menu</h3>
              <p className="text-muted-foreground mb-4">
                Start by adding your first drink to the menu.
              </p>
              <Button onClick={() => setIsAdding(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Drink
              </Button>
            </CardContent>
          </Card>
        ) : (
          drinks.map((drink) => (
            <DrinkCard key={drink.id} drink={drink} />
          ))
        )}
      </div>

      {/* Add/Edit Form - This would be in a modal in a real implementation */}
      {(isAdding || editingDrink) && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>
              {isAdding ? "Add New Drink" : "Edit Drink"}
            </CardTitle>
            <CardDescription>
              {isAdding ? "Create a new drink for your menu" : "Update drink information"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Drink name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="e.g., Beer, Wine, Cocktail" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input id="stock" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alcohol">Alcohol Content (%)</Label>
                <Input id="alcohol" type="number" step="0.1" placeholder="0.0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Brief description" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="happy-hour" />
                <Label htmlFor="happy-hour">Happy Hour Item</Label>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button>
                {isAdding ? "Add Drink" : "Update Drink"}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAdding(false);
                  setEditingDrink(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VenueMenu;