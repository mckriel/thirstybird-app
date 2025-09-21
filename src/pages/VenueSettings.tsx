import { useVenueAuth } from "@/hooks/useVenueAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

const VenueSettings = () => {
  const { hasPermission } = useVenueAuth();

  // Check permissions
  if (!hasPermission('settings')) {
    return (
      <div className="text-center py-12">
        <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
        <p className="text-muted-foreground">
          You don't have permission to access settings. Contact your administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your venue settings and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>Settings functionality will be available in a future update</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section will include venue configuration, notification preferences, and other administrative settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VenueSettings;