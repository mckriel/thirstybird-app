import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/thirstybird-logo.png";
import LocationPermissionModal from "./LocationPermissionModal";

interface SlideData {
  title: string;
  description: string;
  image: string;
}

const slides: SlideData[] = [
  {
    title: "Discover Amazing Venues",
    description: "Find the best bars and restaurants with exclusive drink deals near you",
    image: "🏪"
  },
  {
    title: "Pre-Pay & Save",
    description: "Lock in discounted prices and skip the line when you arrive",
    image: "💰"
  },
  {
    title: "Show & Enjoy",
    description: "Present your barcode to the staff and enjoy your pre-paid drink",
    image: "🍺"
  }
];

interface WelcomeCarouselProps {
  onComplete: () => void;
}

const WelcomeCarousel = ({ onComplete }: WelcomeCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Check for referral codes in URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('ref') || urlParams.get('referral');
    
    if (referralCode) {
      localStorage.setItem('thirstybird-referral-code', referralCode);
      // Remove referral from URL without page reload
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Show location permission modal after onboarding
      setShowLocationModal(true);
    }
  };

  const handleLocationAllowed = () => {
    setShowLocationModal(false);
    onComplete();
  };

  const handleLocationSkipped = () => {
    setShowLocationModal(false);
    onComplete();
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Logo */}
      <div className="flex justify-center pt-12 pb-8">
        <img src={logo} alt="ThirstyBird" className="w-20 h-20" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            How ThirstyBird Works
          </h1>
          <div className="flex justify-center space-x-2 mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentSlide ? "bg-primary w-6" : "bg-inactive"
                )}
              />
            ))}
          </div>
        </div>

        {/* Slide Content */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">
            {slides[currentSlide].image}
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {slides[currentSlide].title}
          </h2>
          <p className="text-foreground/70 text-base leading-relaxed max-w-sm mx-auto">
            {slides[currentSlide].description}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className={cn(
              "btn-press",
              currentSlide === 0 ? "invisible" : "visible"
            )}
          >
            <ChevronLeft size={24} />
          </Button>

          <Button
            onClick={nextSlide}
            className="flex-1 mx-4 bg-primary text-primary-foreground font-medium py-3 btn-press"
          >
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="btn-press"
          >
            <ChevronRight size={24} />
          </Button>
        </div>

        {currentSlide < slides.length - 1 && (
          <button
            onClick={onComplete}
            className="w-full text-center text-foreground/60 text-sm font-medium py-2"
          >
            Skip
          </button>
        )}
      </div>

      <LocationPermissionModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onAllow={handleLocationAllowed}
        onSkip={handleLocationSkipped}
      />
    </div>
  );
};

export default WelcomeCarousel;