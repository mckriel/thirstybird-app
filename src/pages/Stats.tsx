import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, DollarSign, MapPin, Heart } from "lucide-react";

const Stats = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Saved",
      value: "R3,700",
      icon: DollarSign,
      description: "Since joining ThirstyBird",
      color: "text-green-600"
    },
    {
      title: "Venues Visited",
      value: "12",
      icon: MapPin,
      description: "Different locations",
      color: "text-blue-600"
    },
    {
      title: "Drinks Ordered",
      value: "38",
      icon: TrendingUp,
      description: "Total purchases",
      color: "text-purple-600"
    },
    {
      title: "Favorites",
      value: "5",
      icon: Heart,
      description: "Saved drinks",
      color: "text-red-600"
    }
  ];

  const recentActivity = [
    { venue: "The Local Brewery", amount: "R188", saved: "R53", date: "2 days ago" },
    { venue: "Wine Bar Central", amount: "R285", saved: "R75", date: "1 week ago" },
    { venue: "Cocktail Lounge", amount: "R330", saved: "R90", date: "2 weeks ago" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">My Stats</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <span className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{activity.venue}</p>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{activity.amount}</p>
                  <p className="text-sm text-green-600">Saved {activity.saved}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                🏆
              </div>
              <div>
                <p className="font-medium">First Purchase</p>
                <p className="text-sm text-muted-foreground">Made your first ThirstyBird purchase</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                🎯
              </div>
              <div>
                <p className="font-medium">Explorer</p>
                <p className="text-sm text-muted-foreground">Visited 10+ different venues</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Stats;