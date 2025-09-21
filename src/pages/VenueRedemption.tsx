import { useVenueAuth } from "@/hooks/useVenueAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScanLine, CheckCircle, XCircle, Search, Camera, CameraOff } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useOfflineSync } from "@/hooks/useOfflineSync";
import { formatRands } from "@/lib/utils";
import { QrReader } from "react-qr-reader";

const VenueRedemption = () => {
  const { hasPermission } = useVenueAuth();
  const { toast } = useToast();
  const { isOnline, addOfflineAction } = useOfflineSync();
  const [scanInput, setScanInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  
  const [recentRedemptions, setRecentRedemptions] = useState([
    {
      id: "ord_001",
      customerName: "John D.",
      amount: formatRands(45),
      items: 2,
      time: "2 mins ago",
      status: "redeemed"
    },
    {
      id: "ord_002", 
      customerName: "Sarah M.",
      amount: formatRands(28),
      items: 1,
      time: "5 mins ago",
      status: "redeemed"
    },
    {
      id: "ord_003",
      customerName: "Mike K.",
      amount: formatRands(67),
      items: 3,
      time: "8 mins ago", 
      status: "redeemed"
    }
  ]);

  // Check permissions
  if (!hasPermission('redemption')) {
    return (
      <div className="text-center py-12">
        <ScanLine className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
        <p className="text-muted-foreground">
          You don't have permission to access the redemption scanner. Contact your administrator.
        </p>
      </div>
    );
  }

  const handleQRScan = async (data: string | null) => {
    if (!data) return;
    
    setScanError(null);
    setIsScanning(true);
    
    try {
      // POST the scanned code to the API
      const response = await fetch('/api/v1/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          barcode: data,
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Success toast
      toast({
        title: "Order Redeemed Successfully",
        description: `Order ${data} has been marked as collected.`,
      });
      
      // Add to recent redemptions
      const newRedemption = {
        id: data,
        customerName: result.customerName || "Customer",
        amount: formatRands(result.amount || Math.floor(Math.random() * 80) + 20),
        items: result.items || Math.floor(Math.random() * 4) + 1,
        time: "Just now",
        status: "redeemed" as const
      };
      
      setRecentRedemptions(prev => [newRedemption, ...prev.slice(0, 4)]);
      setShowScanner(false);
      
    } catch (error) {
      console.error('Scan error:', error);
      
      // Check if it's a network error
      if (!isOnline || error instanceof TypeError) {
        // Queue for offline sync
        addOfflineAction('SCAN_REDEMPTION', { 
          barcode: data,
          timestamp: new Date().toISOString()
        }, 1); // High priority for redemption
        
        toast({
          title: "Offline Mode",
          description: "Barcode queued for processing when connection is restored.",
        });
      } else {
        // Show error toast
        toast({
          title: "Scan Failed",
          description: "Failed to process barcode. Please try again.",
          variant: "destructive",
        });
        setScanError("Failed to process barcode");
      }
    } finally {
      setIsScanning(false);
    }
  };

  const handleQRError = (error: any) => {
    console.error('QR Scanner error:', error);
    setScanError("Failed to access camera");
    toast({
      title: "Camera Error",
      description: "Unable to access camera. Please check permissions.",
      variant: "destructive",
    });
  };

  const handleManualScan = async () => {
    if (!scanInput.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter a barcode or order ID to scan.",
        variant: "destructive",
      });
      return;
    }

    await handleQRScan(scanInput.trim());
    setScanInput("");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'redeemed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <ScanLine className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Redemption Scanner</h1>
        <p className="text-muted-foreground">
          Scan customer barcodes to redeem their orders.
        </p>
      </div>

      {/* Scanner Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScanLine className="h-5 w-5" />
            Scan Order
          </CardTitle>
          <CardDescription>
            Scan the customer's QR code or enter their order ID manually
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* QR Scanner */}
          {showScanner && (
            <div className="relative">
              <div className="border-2 border-dashed border-border rounded-lg p-4">
                <QrReader
                  constraints={{ facingMode: 'environment' }}
                  onResult={(result, error) => {
                    if (result) {
                      handleQRScan(result.getText());
                    }
                    if (error) {
                      handleQRError(error);
                    }
                  }}
                  scanDelay={300}
                  className="w-full max-w-md mx-auto"
                />
                {scanError && (
                  <div className="text-red-500 text-sm mt-2 text-center">
                    {scanError}
                  </div>
                )}
              </div>
              <div className="mt-2 text-sm text-muted-foreground text-center">
                Position the QR code within the frame
              </div>
            </div>
          )}

          {/* Manual Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Enter barcode or order ID manually..."
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleManualScan()}
              className="flex-1"
            />
            <Button 
              onClick={handleManualScan} 
              disabled={isScanning}
              className="min-w-[120px]"
            >
              {isScanning ? (
                <>
                  <ScanLine className="mr-2 h-4 w-4 animate-pulse" />
                  Processing...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Process
                </>
              )}
            </Button>
          </div>

          {/* Scanner Toggle */}
          <div className="flex justify-center">
            <Button
              variant={showScanner ? "destructive" : "default"}
              onClick={() => setShowScanner(!showScanner)}
              className="flex items-center gap-2"
            >
              {showScanner ? (
                <>
                  <CameraOff className="h-4 w-4" />
                  Stop Scanner
                </>
              ) : (
                <>
                  <Camera className="h-4 w-4" />
                  Start QR Scanner
                </>
              )}
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground text-center">
            {!isOnline && (
              <div className="text-orange-600 mb-2">
                ⚠️ Offline mode - scans will be queued for processing
              </div>
            )}
            Tip: Use the QR scanner for faster processing or enter codes manually
          </div>
        </CardContent>
      </Card>

      {/* Recent Redemptions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Redemptions</CardTitle>
          <CardDescription>Orders processed in the last hour</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentRedemptions.map((redemption) => (
              <div
                key={redemption.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(redemption.status)}
                  <div>
                    <p className="font-medium">Order #{redemption.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {redemption.customerName} • {redemption.items} items • {redemption.amount}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{redemption.status}</Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {redemption.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VenueRedemption;