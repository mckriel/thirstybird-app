import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Bell, 
  MapPin, 
  Shield, 
  HelpCircle, 
  FileText, 
  Mail,
  Smartphone,
  Moon,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    locationServices: true,
    darkMode: false,
    orderUpdates: true,
    promotionalEmails: false
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting updated",
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${value ? 'enabled' : 'disabled'}`
    });
  };

  const settingsGroups = [
    {
      title: "Notifications",
      icon: Bell,
      settings: [
        {
          key: "pushNotifications",
          label: "Push Notifications",
          description: "Get notified about order updates and special offers",
          icon: Smartphone
        },
        {
          key: "emailNotifications", 
          label: "Email Notifications",
          description: "Receive order confirmations and receipts via email",
          icon: Mail
        },
        {
          key: "orderUpdates",
          label: "Order Updates",
          description: "Get real-time updates on your order status",
          icon: Bell
        },
        {
          key: "promotionalEmails",
          label: "Promotional Emails", 
          description: "Receive special offers and venue recommendations",
          icon: Mail
        }
      ]
    },
    {
      title: "Privacy & Location",
      icon: Shield,
      settings: [
        {
          key: "locationServices",
          label: "Location Services",
          description: "Allow ThirstyBird to access your location for nearby venues",
          icon: MapPin
        }
      ]
    },
    {
      title: "App Preferences",
      icon: Globe,
      settings: [
        {
          key: "darkMode",
          label: "Dark Mode",
          description: "Use dark theme throughout the app",
          icon: Moon
        }
      ]
    }
  ];

  const supportOptions = [
    {
      label: "Help Center",
      description: "Find answers to common questions",
      icon: HelpCircle,
      action: () => toast({ title: "Help Center", description: "Opening help center..." })
    },
    {
      label: "Contact Support",
      description: "Get help from our support team",
      icon: Mail,
      action: () => toast({ title: "Contact Support", description: "Opening support chat..." })
    },
    {
      label: "Terms of Service",
      description: "View our terms and conditions",
      icon: FileText,
      action: () => toast({ title: "Terms of Service", description: "Opening terms..." })
    },
    {
      label: "Privacy Policy",
      description: "Learn how we protect your data",
      icon: Shield,
      action: () => toast({ title: "Privacy Policy", description: "Opening privacy policy..." })
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Settings</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Settings Groups */}
        {settingsGroups.map((group) => (
          <Card key={group.title}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <group.icon className="h-5 w-5" />
                <span>{group.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {group.settings.map((setting, index) => (
                <div key={setting.key}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <setting.icon className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">{setting.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {setting.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={settings[setting.key as keyof typeof settings]}
                      onCheckedChange={(value) => handleSettingChange(setting.key, value)}
                    />
                  </div>
                  {index < group.settings.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Account Management */}
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="h-4 w-4 mr-2" />
              Update Email
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
              <FileText className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* Support & Legal */}
        <Card>
          <CardHeader>
            <CardTitle>Support & Legal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {supportOptions.map((option, index) => (
              <Button 
                key={index}
                variant="outline" 
                className="w-full justify-start"
                onClick={option.action}
              >
                <option.icon className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <p>{option.label}</p>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* App Version */}
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              ThirstyBird v1.0.0
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Made with ❤️ for drink lovers
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;