import { useState } from "react";
import { useVenueAuth } from "@/hooks/useVenueAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, DollarSign, Package, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useVenueOrders, useUpdateOrderStatus, type Order } from "@/hooks/useOrders";
import { useVenueOrderRealtime } from "@/hooks/useOrderRealtime";

const VenueOrders = () => {
  const { venueProfile, hasPermission } = useVenueAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pending");

  // Use TanStack Query for data fetching
  const { data: orders = [], isLoading, error } = useVenueOrders(venueProfile?.venue_id || '');

  // Use real-time subscription
  useVenueOrderRealtime(venueProfile?.venue_id || '');

  // Use mutation for updating order status
  const updateOrderStatusMutation = useUpdateOrderStatus();

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatusMutation.mutateAsync({ orderId, newStatus });

      toast({
        title: "Order Updated",
        description: `Order status updated to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating order:", error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'default';
      case 'preparing': return 'secondary';
      case 'ready': return 'outline';
      case 'completed': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'default';
    }
  };

  const filterOrdersByStatus = (status: string) => {
    if (status === 'all') return orders;
    return orders.filter(order => order.status === status);
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
            <CardDescription>
              {new Date(order.created_at).toLocaleString()}
            </CardDescription>
          </div>
          <Badge variant={getStatusBadgeVariant(order.status)}>
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>${order.final_amount}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span>{order.order_items?.length || 0} items</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{order.order_type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{order.payment_status}</span>
            </div>
          </div>

          {order.order_items && order.order_items.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Items:</h4>
              <div className="space-y-1">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.drinks.name}</span>
                    <span>${item.total_price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {order.special_instructions && (
            <div>
              <h4 className="font-medium mb-1">Special Instructions:</h4>
              <p className="text-sm text-muted-foreground">{order.special_instructions}</p>
            </div>
          )}

          <div className="flex gap-2">
            {order.status === 'pending' && (
              <Button 
                size="sm" 
                onClick={() => handleUpdateOrderStatus(order.id, 'preparing')}
                disabled={updateOrderStatusMutation.isPending}
              >
                Start Preparing
              </Button>
            )}
            {order.status === 'preparing' && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleUpdateOrderStatus(order.id, 'ready')}
                disabled={updateOrderStatusMutation.isPending}
              >
                Mark Ready
              </Button>
            )}
            {order.status === 'ready' && (
              <Button 
                size="sm" 
                variant="secondary"
                onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                disabled={updateOrderStatusMutation.isPending}
              >
                Complete Order
              </Button>
            )}
            {['pending', 'preparing'].includes(order.status) && (
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => handleUpdateOrderStatus(order.id, 'cancelled')}
                disabled={updateOrderStatusMutation.isPending}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-destructive">Error loading orders</p>
        </div>
      </div>
    );
  }

  // Check permissions
  if (!hasPermission('orders')) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
        <p className="text-muted-foreground">
          You don't have permission to view orders. Contact your administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Manage incoming orders and track their progress.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending">Pending ({filterOrdersByStatus('pending').length})</TabsTrigger>
          <TabsTrigger value="preparing">Preparing ({filterOrdersByStatus('preparing').length})</TabsTrigger>
          <TabsTrigger value="ready">Ready ({filterOrdersByStatus('ready').length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({filterOrdersByStatus('completed').length})</TabsTrigger>
          <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
        </TabsList>

        {['pending', 'preparing', 'ready', 'completed', 'all'].map((status) => (
          <TabsContent key={status} value={status} className="mt-6">
            <div className="space-y-4">
              {filterOrdersByStatus(status).length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">No {status} orders found</p>
                  </CardContent>
                </Card>
              ) : (
                filterOrdersByStatus(status).map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default VenueOrders;