import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Plus, Trash2, Apple, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Payments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "card",
      last4: "4242",
      brand: "Visa",
      expiry: "12/26",
      isDefault: true
    },
    {
      id: 2,
      type: "card", 
      last4: "8888",
      brand: "Mastercard",
      expiry: "09/25",
      isDefault: false
    }
  ]);

  const recentTransactions = [
    {
      id: 1,
      venue: "The Local Brewery",
      amount: 255,
      saved: 60,
      date: "2024-01-15",
      status: "completed",
      paymentMethod: "•••• 4242"
    },
    {
      id: 2,
      venue: "Wine Bar Central",
      amount: 195,
      saved: 45,
      date: "2024-01-12",
      status: "completed",
      paymentMethod: "•••• 8888"
    },
    {
      id: 3,
      venue: "Cocktail Lounge",
      amount: 435,
      saved: 120,
      date: "2024-01-10",
      status: "completed",
      paymentMethod: "Apple Pay"
    }
  ];

  const handleAddPaymentMethod = () => {
    // TODO: Implement add payment method flow
    toast({
      title: "Add Payment Method",
      description: "Payment method addition coming soon!"
    });
  };

  const handleRemovePaymentMethod = (methodId: number) => {
    setPaymentMethods(methods => methods.filter(m => m.id !== methodId));
    toast({
      title: "Payment method removed",
      description: "Your payment method has been removed successfully."
    });
  };

  const handleSetDefault = (methodId: number) => {
    setPaymentMethods(methods => 
      methods.map(m => ({ ...m, isDefault: m.id === methodId }))
    );
    toast({
      title: "Default payment updated",
      description: "Your default payment method has been updated."
    });
  };

  const getPaymentIcon = (type: string, brand?: string) => {
    switch (type) {
      case "apple":
        return <Apple className="h-5 w-5" />;
      case "google":
        return <Smartphone className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Payment Methods</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Payment Methods */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Saved Payment Methods</CardTitle>
            <Button variant="outline" size="sm" onClick={handleAddPaymentMethod}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getPaymentIcon(method.type, method.brand)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">
                        {method.brand} •••• {method.last4}
                      </p>
                      {method.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Expires {method.expiry}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!method.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSetDefault(method.id)}
                    >
                      Set Default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemovePaymentMethod(method.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{transaction.venue}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()} • {transaction.paymentMethod}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">R{transaction.amount}</p>
                  <p className="text-sm text-green-600">
                    Saved R{transaction.saved}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              Download Receipts
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Apple className="h-4 w-4 mr-2" />
              Set up Apple Pay
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Smartphone className="h-4 w-4 mr-2" />
              Set up Google Pay
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payments;