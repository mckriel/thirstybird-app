import { useVenueAuth } from "@/hooks/useVenueAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, ShoppingCart, TrendingUp } from "lucide-react";
import { formatRands } from "@/lib/utils";
const VenueDashboard = () => {
  const {
    venueProfile
  } = useVenueAuth();
  const quickStats = [{
    title: "Today's Orders",
    value: "24",
    description: "Active orders to process",
    icon: ShoppingCart,
    trend: "+12%"
  }, {
    title: "Revenue",
    value: formatRands(1847),
    description: "Today's earnings",
    icon: TrendingUp,
    trend: "+8%"
  }, {
    title: "Customers",
    value: "156",
    description: "Total served today",
    icon: Users,
    trend: "+15%"
  }];
  return <div className="space-y-4 md:space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Here's what's happening at your venue today.
        </p>
      </div>

      {venueProfile && <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Venue Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Staff Member</p>
                <p className="text-lg font-semibold">{venueProfile.display_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mx-[50px]">Position</p>
                <p className="text-lg font-semibold mx-[50px]">{venueProfile.position || "Staff"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Permissions</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {Object.entries(venueProfile.permissions).map(([key, value]) => value && <Badge key={key} variant="secondary" className="text-xs">
                        {key}
                      </Badge>)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>}

      <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {quickStats.map(stat => <Card key={stat.title} className="min-h-[140px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <Badge variant="outline" className="mt-2 text-green-600">
                {stat.trend} from yesterday
              </Badge>
            </CardContent>
          </Card>)}
      </div>

      <div className="grid gap-3 md:gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders waiting for processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Order #{12340 + i}</p>
                    <p className="text-sm text-muted-foreground">2 items • {formatRands(25)}</p>
                  </div>
                  <Badge>Pending</Badge>
                </div>)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors min-h-[44px] flex flex-col justify-center">
                <p className="font-medium">View All Orders</p>
                <p className="text-sm text-muted-foreground">Manage incoming orders</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors min-h-[44px] flex flex-col justify-center">
                <p className="font-medium">Update Menu</p>
                <p className="text-sm text-muted-foreground">Add or modify drinks</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors min-h-[44px] flex flex-col justify-center">
                <p className="font-medium">View Analytics</p>
                <p className="text-sm text-muted-foreground">Check performance metrics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default VenueDashboard;