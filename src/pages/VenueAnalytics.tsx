import { useVenueAuth } from "@/hooks/useVenueAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, DollarSign, Package, Users, Clock } from "lucide-react";

const VenueAnalytics = () => {
  const { hasPermission } = useVenueAuth();

  const analytics = {
    today: {
      revenue: 1847,
      orders: 24,
      customers: 156,
      avgOrderValue: 77.04
    },
    week: {
      revenue: 12340,
      orders: 168,
      customers: 1024,
      avgOrderValue: 73.45
    },
    popularDrinks: [
      { name: "IPA Draft", orders: 45, revenue: 675 },
      { name: "Mojito", orders: 38, revenue: 570 },
      { name: "Red Wine", orders: 32, revenue: 480 },
      { name: "Whiskey Sour", orders: 28, revenue: 420 }
    ],
    peakHours: [
      { hour: "17:00", orders: 12 },
      { hour: "18:00", orders: 18 },
      { hour: "19:00", orders: 24 },
      { hour: "20:00", orders: 21 },
      { hour: "21:00", orders: 15 }
    ]
  };

  // Check permissions
  if (!hasPermission('analytics')) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
        <p className="text-muted-foreground">
          You don't have permission to view analytics. Contact your administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Track your venue's performance and insights.
        </p>
      </div>

      {/* Today's Stats */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Today's Performance</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analytics.today.revenue}</div>
              <p className="text-xs text-muted-foreground">
                +12% from yesterday
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.today.orders}</div>
              <p className="text-xs text-muted-foreground">
                +8% from yesterday
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.today.customers}</div>
              <p className="text-xs text-muted-foreground">
                +15% from yesterday
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analytics.today.avgOrderValue}</div>
              <p className="text-xs text-muted-foreground">
                +5% from yesterday
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Weekly Overview */}
      <div>
        <h2 className="text-xl font-semibold mb-4">This Week</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">${analytics.week.revenue}</p>
                </div>
                <Badge variant="outline" className="text-green-600">
                  +18%
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{analytics.week.orders}</p>
                </div>
                <Badge variant="outline" className="text-green-600">
                  +22%
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unique Customers</p>
                  <p className="text-2xl font-bold">{analytics.week.customers}</p>
                </div>
                <Badge variant="outline" className="text-green-600">
                  +12%
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Order</p>
                  <p className="text-2xl font-bold">${analytics.week.avgOrderValue}</p>
                </div>
                <Badge variant="outline" className="text-blue-600">
                  -4%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Popular Drinks */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Drinks</CardTitle>
            <CardDescription>Top selling items this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.popularDrinks.map((drink, index) => (
                <div key={drink.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{drink.name}</p>
                      <p className="text-sm text-muted-foreground">{drink.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${drink.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Peak Hours */}
        <Card>
          <CardHeader>
            <CardTitle>Peak Hours</CardTitle>
            <CardDescription>Busiest times today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.peakHours.map((hour) => (
                <div key={hour.hour} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{hour.hour}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(hour.orders / 24) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{hour.orders}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VenueAnalytics;