import { CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { usePendingReviewOrders, type Order } from "@/hooks/useOrders";
import { usePendingReviewOrderRealtime } from "@/hooks/useOrderRealtime";

const AdminPayments = () => {
  const { toast } = useToast();

  // Use TanStack Query for data fetching
  const { data: orders = [], isLoading, error } = usePendingReviewOrders();

  // Use real-time subscription
  usePendingReviewOrderRealtime();

  const handlePaymentAction = async (orderId: string, action: "capture" | "cancel") => {
    try {
      // TODO: Replace with proper API call to capture/cancel payment
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Placeholder payment action logic - replace with actual API call
      console.log(`${action === "capture" ? "Capturing" : "Cancelling"} payment for order:`, orderId);

      toast({
        title: action === "capture" ? "Payment Captured" : "Payment Cancelled",
        description: `Order ${action === "capture" ? "confirmed" : "cancelled"} successfully`,
      });
    } catch (error) {
      console.error("Payment action error:", error);
      toast({
        title: "Error",
        description: `Failed to ${action} payment`,
        variant: "destructive",
      });
    }
  };

  const getPaymentMethodBadge = (method: string) => {
    const variants = {
      stripe: "default",
      payfast: "secondary",
      peach: "outline"
    } as const;
    
    return (
      <Badge variant={variants[method as keyof typeof variants] || "outline"}>
        {method.toUpperCase()}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading pending orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-destructive">Error loading pending orders</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payment Review</h1>
        <p className="text-muted-foreground">
          Review and process pending payments from customers.
        </p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Pending Payments</h3>
            <p className="text-muted-foreground">
              All payments have been processed.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                    <CardDescription>
                      {new Date(order.created_at).toLocaleString()}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {getPaymentMethodBadge(order.payment_method || 'unknown')}
                    <Badge variant="outline">
                      R{order.final_amount}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Pending Review</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span>User: {order.user_id.slice(0, 8)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Venue: {order.venue_id.slice(0, 8)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Status: {order.payment_status}</span>
                    </div>
                  </div>

                  {order.special_instructions && (
                    <div>
                      <h4 className="font-medium mb-1">Special Instructions:</h4>
                      <p className="text-sm text-muted-foreground">{order.special_instructions}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handlePaymentAction(order.id, "capture")}
                      className="flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Capture Payment
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handlePaymentAction(order.id, "cancel")}
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel Payment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPayments;