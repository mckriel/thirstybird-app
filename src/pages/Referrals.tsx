import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share, Copy, Users, Gift, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Referrals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const userReferralCode = "THIRSTY2024";
  const referralLink = `https://thirstybird.app/signup?ref=${userReferralCode}`;
  
  const referralStats = {
    totalReferred: 8,
    earned: 600,
    pending: 225
  };

  const recentReferrals = [
    { name: "Alex M.", status: "completed", reward: "R75", date: "2 days ago" },
    { name: "Sarah L.", status: "pending", reward: "R75", date: "1 week ago" },
    { name: "Mike R.", status: "completed", reward: "R75", date: "2 weeks ago" }
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userReferralCode);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard"
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard"
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join ThirstyBird!",
          text: `Use my code ${userReferralCode} and we both get R75 off our next drink!`,
          url: referralLink
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Referrals</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* How it Works */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-primary" />
              <span>How Referrals Work</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <p className="text-sm">Share your referral code with friends</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <p className="text-sm">They sign up and make their first purchase</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <p className="text-sm">You both get R75 credit towards your next drink!</p>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{referralStats.totalReferred}</p>
              <p className="text-xs text-muted-foreground">Friends Referred</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Gift className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">R{referralStats.earned}</p>
              <p className="text-xs text-muted-foreground">Total Earned</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="h-6 w-6 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                ⏳
              </div>
              <p className="text-2xl font-bold">R{referralStats.pending}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Your Referral Code */}
        <Card>
          <CardHeader>
            <CardTitle>Your Referral Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input value={userReferralCode} readOnly className="text-center font-mono text-lg" />
              <Button variant="outline" size="icon" onClick={handleCopyCode}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleShare} className="flex-1">
                <Share className="h-4 w-4 mr-2" />
                Share Link
              </Button>
              <Button variant="outline" onClick={handleCopyLink}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Referrals */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Referrals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentReferrals.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No referrals yet. Start sharing to earn rewards!
              </p>
            ) : (
              recentReferrals.map((referral, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{referral.name}</p>
                    <p className="text-sm text-muted-foreground">{referral.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{referral.reward}</p>
                    <Badge 
                      variant={referral.status === "completed" ? "default" : "secondary"}
                      className={referral.status === "completed" ? "bg-green-100 text-green-800" : ""}
                    >
                      {referral.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Referrals;