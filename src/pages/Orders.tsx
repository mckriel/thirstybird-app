import { useState } from "react";
import { Clock, CheckCircle, XCircle, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import BarcodeDisplay from "@/components/BarcodeDisplay";
import { useAuth } from "@/hooks/useAuth";
import { useUserOrders, type Order } from "@/hooks/useOrders";
import { useUserOrderRealtime } from "@/hooks/useOrderRealtime";

interface OrderCardProps {
  order: Order;
  type: 'upcoming' | 'redeemed' | 'cancelled';
}

const OrderCard = ({ order, type }: OrderCardProps) => {
  const [showBarcode, setShowBarcode] = useState(false);

  // Get the first drink from order items for display
  const firstDrink = order.order_items?.[0]?.drinks;
  const drinkName = firstDrink?.name || 'Unknown Drink';
  const venueName = 'Venue'; // You might want to join venue data in the query

  const getStatusType = (status: string): 'upcoming' | 'redeemed' | 'cancelled' => {
    if (status === 'cancelled') return 'cancelled';
    if (['completed', 'redeemed'].includes(status)) return 'redeemed';
    return 'upcoming';
  };

  const statusType = getStatusType(order.status);

  return (
    <div className="bg-card rounded-lg shadow-card p-4 mb-4">
      <div className="flex items-start space-x-3">
        <div className="w-16 h-16 rounded-lg bg-inactive flex-shrink-0 overflow-hidden">
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-2xl">🍺</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-foreground text-sm">
                {drinkName} {order.order_items && order.order_items.length > 1 && `(${order.order_items.length}x)`}
              </h3>
              <p className="text-xs text-foreground/60">{venueName}</p>
            </div>
            
            <div className="text-right">
              <div className="font-semibold text-foreground">
                R{order.final_amount}
              </div>
              {order.total_amount > order.final_amount && (
                <div className="text-xs text-foreground/50 line-through">
                  R{order.total_amount}
                </div>
              )}
            </div>
          </div>

          {statusType === 'upcoming' && (
            <>
              <div className="text-xs text-warning font-medium mb-3">
                Status: {order.status}
              </div>
              {showBarcode ? (
                <BarcodeDisplay
                  orderId={order.id}
                  drinkName={drinkName}
                  venue={venueName}
                  expiryTime="Valid until redeemed"
                />
              ) : (
                <Button
                  onClick={() => setShowBarcode(true)}
                  className="w-full bg-button-black text-button-black-foreground font-medium py-2 btn-press"
                >
                  <QrCode size={16} className="mr-2" />
                  Show Barcode
                </Button>
              )}
            </>
          )}

          {statusType === 'redeemed' && (
            <div className="text-xs text-foreground/60">
              Completed {new Date(order.updated_at).toLocaleDateString()}
            </div>
          )}

          {statusType === 'cancelled' && (
            <div>
              <div className="text-xs text-destructive mb-1">
                Cancelled
              </div>
              <div className="text-xs text-accent">
                Payment status: {order.payment_status}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { user } = useAuth();

  // Use TanStack Query for data fetching
  const { data: orders = [], isLoading, error } = useUserOrders(user?.id || '');

  // Use real-time subscription
  useUserOrderRealtime(user?.id || '');

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'upcoming':
        return <Clock size={16} />;
      case 'redeemed':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  const getEmptyState = (tab: string) => {
    const states = {
      upcoming: {
        emoji: "⏰",
        title: "No upcoming orders",
        description: "Your pre-paid drinks will appear here"
      },
      redeemed: {
        emoji: "🍻",
        title: "No redeemed orders",
        description: "Your enjoyed drinks will show up here"
      },
      cancelled: {
        emoji: "❌",
        title: "No cancelled orders",
        description: "Cancelled and refunded orders appear here"
      }
    };
    return states[tab as keyof typeof states];
  };

  const filterOrdersByStatus = (status: string) => {
    if (status === 'upcoming') {
      return orders.filter(order => !['cancelled', 'completed', 'redeemed'].includes(order.status));
    }
    if (status === 'redeemed') {
      return orders.filter(order => ['completed', 'redeemed'].includes(order.status));
    }
    if (status === 'cancelled') {
      return orders.filter(order => order.status === 'cancelled');
    }
    return orders;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-primary text-primary-foreground">
          <div className="container pt-12 pb-6">
            <h1 className="text-xl font-semibold">My Orders</h1>
          </div>
        </div>
        <div className="container pt-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading orders...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-primary text-primary-foreground">
          <div className="container pt-12 pb-6">
            <h1 className="text-xl font-semibold">My Orders</h1>
          </div>
        </div>
        <div className="container pt-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-destructive">Error loading orders</p>
            </div>
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
          <h1 className="text-xl font-semibold">My Orders</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="container pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming" className="flex items-center space-x-2">
              {getTabIcon('upcoming')}
              <span>Upcoming</span>
            </TabsTrigger>
            <TabsTrigger value="redeemed" className="flex items-center space-x-2">
              {getTabIcon('redeemed')}
              <span>Redeemed</span>
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="flex items-center space-x-2">
              {getTabIcon('cancelled')}
              <span>Cancelled</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {filterOrdersByStatus('upcoming').length > 0 ? (
              <div>
                {filterOrdersByStatus('upcoming').map((order) => (
                  <OrderCard key={order.id} order={order} type="upcoming" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">{getEmptyState('upcoming').emoji}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {getEmptyState('upcoming').title}
                </h3>
                <p className="text-foreground/60">
                  {getEmptyState('upcoming').description}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="redeemed" className="mt-6">
            {filterOrdersByStatus('redeemed').length > 0 ? (
              <div>
                {filterOrdersByStatus('redeemed').map((order) => (
                  <OrderCard key={order.id} order={order} type="redeemed" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">{getEmptyState('redeemed').emoji}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {getEmptyState('redeemed').title}
                </h3>
                <p className="text-foreground/60">
                  {getEmptyState('redeemed').description}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="mt-6">
            {filterOrdersByStatus('cancelled').length > 0 ? (
              <div>
                {filterOrdersByStatus('cancelled').map((order) => (
                  <OrderCard key={order.id} order={order} type="cancelled" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">{getEmptyState('cancelled').emoji}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {getEmptyState('cancelled').title}
                </h3>
                <p className="text-foreground/60">
                  {getEmptyState('cancelled').description}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Orders;