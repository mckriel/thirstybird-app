import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, Building2, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState("stripe");
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock cart data - would come from cart state/context
  const cartItems = [
    { id: 1, name: "Craft IPA", venue: "The Local Brewery", price: 135, discount: 30, quantity: 2 },
    { id: 2, name: "House Wine", venue: "Wine Bar Central", price: 195, discount: 45, quantity: 1 }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDiscount = cartItems.reduce((sum, item) => sum + (item.discount * item.quantity), 0);
  const total = subtotal - totalDiscount;

  const paymentMethods = [
    { id: "stripe", name: "Credit/Debit Card (Stripe)", icon: CreditCard },
    { id: "payfast", name: "PayFast (South Africa)", icon: Building2 },
    { id: "peach", name: "Peach Payments", icon: Smartphone }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // TODO: Replace with proper API call to initiate payment
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Placeholder payment logic - replace with actual API call
      const mockPaymentData = {
        url: `https://mock-payment-gateway.com/pay/${selectedPayment}`,
        formData: selectedPayment === "payfast" ? {
          merchant_id: "mock_merchant_id",
          merchant_key: "mock_merchant_key",
          amount: total.toFixed(2),
          item_name: "ThirstyBird Order"
        } : null
      };

      if (mockPaymentData.url) {
        // Open payment page in new tab for better UX
        window.open(mockPaymentData.url, '_blank');
        
        toast({
          title: "Payment Initiated",
          description: "A new tab has opened for payment. Complete your payment there.",
        });
        
        // Navigate to pending orders page
        navigate("/orders");
      } else if (mockPaymentData.formData && selectedPayment === "payfast") {
        // Handle PayFast form submission
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = mockPaymentData.url;
        form.target = '_blank';
        
        Object.entries(mockPaymentData.formData).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value as string;
          form.appendChild(input);
        });
        
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
        
        toast({
          title: "Payment Initiated",
          description: "PayFast payment form opened in new tab.",
        });
        
        navigate("/orders");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
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
          <h1 className="text-lg font-semibold">Checkout</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6 pb-32">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.venue}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">R{(item.price * item.quantity).toFixed(0)}</p>
                  <p className="text-sm text-green-600">-R{(item.discount * item.quantity).toFixed(0)}</p>
                </div>
              </div>
            ))}
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Total Savings</span>
                <span>-R{totalDiscount.toFixed(0)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>R{total.toFixed(0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedPayment === method.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50"
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <method.icon className="h-5 w-5" />
                <span className="font-medium">{method.name}</span>
                <div className="ml-auto">
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      selectedPayment === method.id
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    }`}
                  >
                    {selectedPayment === method.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <Button 
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full h-12 text-lg font-semibold"
        >
          {isProcessing ? "Processing..." : `Pay R${total.toFixed(0)}`}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;