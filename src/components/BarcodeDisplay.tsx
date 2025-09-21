import { useState } from "react";
import { QrCode, Maximize2, Minimize2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BarcodeDisplayProps {
  orderId: string;
  drinkName: string;
  venue: string;
  expiryTime: string;
}

const BarcodeDisplay = ({ orderId, drinkName, venue, expiryTime }: BarcodeDisplayProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Generate a simple barcode pattern based on orderId
  const generateBarcodePattern = (id: string) => {
    const patterns = [];
    const chars = id.split('');
    
    for (let i = 0; i < 20; i++) {
      const char = chars[i % chars.length];
      const height = (char.charCodeAt(0) % 60) + 40; // Height between 40-100%
      patterns.push(height);
    }
    
    return patterns;
  };

  const barcodePattern = generateBarcodePattern(orderId);

  const BarcodeContent = ({ size = "normal" }: { size?: "normal" | "large" }) => (
    <div className={`bg-background p-6 rounded-lg ${size === "large" ? "p-8" : ""}`}>
      <div className="text-center mb-4">
        <h3 className={`font-semibold text-foreground ${size === "large" ? "text-xl" : "text-lg"}`}>
          {drinkName}
        </h3>
        <p className={`text-foreground/60 ${size === "large" ? "text-base" : "text-sm"}`}>
          {venue}
        </p>
      </div>

      {/* Barcode */}
      <div className={`bg-white p-4 rounded-lg border-2 border-dashed border-border mb-4 ${
        size === "large" ? "p-6" : ""
      }`}>
        <div className="flex items-end justify-center gap-1 h-16 mb-2">
          {barcodePattern.map((height, index) => (
            <div
              key={index}
              className="bg-foreground"
              style={{
                width: size === "large" ? "4px" : "3px",
                height: `${height}%`
              }}
            />
          ))}
        </div>
        <div className="text-center">
          <span className={`font-mono text-foreground ${size === "large" ? "text-lg" : "text-sm"}`}>
            {orderId}
          </span>
        </div>
      </div>

      <div className={`text-center text-foreground/60 ${size === "large" ? "text-base" : "text-sm"}`}>
        <p>Show this barcode to staff</p>
        <p className="font-medium">Valid until: {expiryTime}</p>
      </div>

      {size === "normal" && (
        <Button
          variant="outline"
          onClick={() => setIsFullscreen(true)}
          className="w-full mt-4 btn-press"
        >
          <Maximize2 size={16} className="mr-2" />
          View Fullscreen
        </Button>
      )}
    </div>
  );

  return (
    <>
      <BarcodeContent />
      
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="w-[95%] max-w-md rounded-2xl p-4">
          <div className="flex justify-end mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(false)}
              className="h-8 w-8"
            >
              <Minimize2 size={18} />
            </Button>
          </div>
          <BarcodeContent size="large" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BarcodeDisplay;