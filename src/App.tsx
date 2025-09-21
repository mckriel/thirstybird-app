import AuthPage from "./pages/Auth";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import VenueDetail from "./pages/VenueDetail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import AdminPayments from "./pages/AdminPayments";
import Stats from "./pages/Stats";
import Favorites from "./pages/Favorites";
import Referrals from "./pages/Referrals";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";
import ProtectedRoute from "./components/ProtectedRoute";
import VenueProtectedRoute from "./components/VenueProtectedRoute";
import VenueAuth from "./pages/VenueAuth";
import VenueLayout from "./components/VenueLayout";
import VenueDashboard from "./pages/VenueDashboard";
import VenueOrders from "./pages/VenueOrders";
import VenueMenu from "./pages/VenueMenu";
import VenueAnalytics from "./pages/VenueAnalytics";
import VenueSettings from "./pages/VenueSettings";
import VenueRedemption from "./pages/VenueRedemption";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/venue/:venueId"
            element={
              <ProtectedRoute>
                <VenueDetail />
                <BottomNav />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
                <BottomNav />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-success"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/payments"
            element={
              <ProtectedRoute>
                <AdminPayments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
                <BottomNav />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
                <BottomNav />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stats"
            element={
              <ProtectedRoute>
                <Stats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/referrals"
            element={
              <ProtectedRoute>
                <Referrals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Venue Dashboard Routes */}
          <Route path="/venue-auth" element={<VenueAuth />} />
          <Route
            path="/venue-dashboard"
            element={
              <VenueProtectedRoute>
                <VenueLayout />
              </VenueProtectedRoute>
            }
          >
            <Route index element={<VenueDashboard />} />
            <Route path="orders" element={<VenueOrders />} />
            <Route path="menu" element={<VenueMenu />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
