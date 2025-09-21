import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useConfetti } from "@/hooks/useConfetti";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<"success" | "pending" | "failed">("pending");
  const { triggerConfetti } = useConfetti();
  
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // In a real app, you would verify the payment status with your backend
    // For now, we'll simulate different statuses
    const timer = setTimeout(() => {
      if (sessionId) {
        setPaymentStatus("success");
        triggerConfetti();
      } else {
        setPaymentStatus("failed");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [sessionId]);

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case "success":
        return <CheckCircle className="h-16 w-16 text-green-500" />;
      case "failed":
        return <XCircle className="h-16 w-16 text-red-500" />;
      default:
        return <Clock className="h-16 w-16 text-yellow-500 animate-pulse" />;
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case "success":
        return {
          title: "Payment Authorized!",
          description: "Your payment has been authorized and is pending review by the venue. You'll receive confirmation shortly.",
          badge: "Pending Review",
          badgeVariant: "secondary" as const,
        };
      case "failed":
        return {
          title: "Payment Failed",
          description: "There was an issue processing your payment. Please try again.",
          badge: "Failed",
          badgeVariant: "destructive" as const,
        };
      default:
        return {
          title: "Processing Payment...",
          description: "Please wait while we confirm your payment.",
          badge: "Processing",
          badgeVariant: "outline" as const,
        };
    }
  };

  const statusInfo = getStatusMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            {getStatusIcon()}
          </div>
          <CardTitle className="text-2xl">{statusInfo.title}</CardTitle>
          <Badge variant={statusInfo.badgeVariant} className="mx-auto">
            {statusInfo.badge}
          </Badge>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-muted-foreground">
            {statusInfo.description}
          </p>
          
          {paymentStatus === "success" && (
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">What happens next?</h4>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Venue reviews your order</li>
                <li>• Payment is captured upon approval</li>
                <li>• You'll receive pickup instructions</li>
                <li>• Show your order barcode at pickup</li>
              </ul>
            </div>
          )}

          <div className="space-y-3">
            {paymentStatus === "success" && (
              <Button 
                onClick={() => navigate("/orders")} 
                className="w-full"
              >
                View My Orders
              </Button>
            )}
            
            {paymentStatus === "failed" && (
              <Button 
                onClick={() => navigate("/checkout")} 
                className="w-full"
              >
                Try Again
              </Button>
            )}
            
            <Button 
              variant="outline" 
              onClick={() => navigate("/home")} 
              className="w-full"
            >
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;