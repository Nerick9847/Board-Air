"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const length = slides.length;

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(current === length - 1 ? 0 : current + 1);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(current === 0 ? length - 1 : current - 1);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Slides container */}
      <div className="relative h-[600px] w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background image with overlay */}
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-black/50 z-10" />
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center px-4 md:px-16">
              <div className="max-w-4xl w-full bg-black/70 p-6 md:p-10 rounded-lg backdrop-blur-sm transform transition-all duration-700 ease-out translate-y-0 opacity-100">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Left content */}
                  <div className="md:w-2/3">
                    <h3 className="text-red-500 font-medium mb-2">{slide.category || "PREMIUM BILLBOARD"}</h3>
                    <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">{slide.title}</h2>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center text-white/80">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{slide.location || "Kathmandu, New Road"}</span>
                      </div>
                      <div className="flex items-center text-white/80">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{slide.visibility || "50,000+ daily views"}</span>
                      </div>
                      <div className="flex items-center text-white/80">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{slide.availability || "Available now"}</span>
                      </div>
                    </div>
                    <p className="text-white/80 mb-6">
                      {slide.description || 
                       "Strategic billboard location with maximum visibility for your brand. This premium advertising space offers exceptional exposure to high-traffic audiences."}
                    </p>
                    <div className="flex gap-4">
                      <Button className="bg-red-500 hover:bg-red-600 text-white">
                        <Link href="/service/billboard">Book Now</Link>
                      </Button>
                      <Button variant="outline" className="text-black border-white hover:bg-white/10 hover:text-white">
                        <Link href="/service/details">View Details</Link>
                      </Button>
                    </div>
                  </div>

                  {/* Right content - Billboard specs (removed rating and type) */}
                  <div className="md:w-1/3 bg-white/10 p-4 rounded-lg">
                    <h3 className="text-white text-lg font-medium mb-3">Billboard Specs</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/70">Size</span>
                        <span className="text-white font-medium">{slide.size || "20' × 10'"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Price</span>
                        <span className="text-white font-medium">{slide.price || "₹15,000/week"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button 
        onClick={prevSlide} 
        variant="outline" 
        size="icon" 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 border-none text-white rounded-full"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button 
        onClick={nextSlide} 
        variant="outline" 
        size="icon" 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 border-none text-white rounded-full"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrent(index);
                setTimeout(() => setIsTransitioning(false), 500);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? "bg-red-500 w-6" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export function CarouselDemo() {
  const billboardData = [
    {
      title: "Premium LED Billboard at Durbar Marg",
      category: "DIGITAL BILLBOARD",
      location: "Durbar Marg, Kathmandu",
      visibility: "65,000+ daily views",
      availability: "Available from April 15",
      description: "Situated at the heart of Kathmandu's shopping district, this digital billboard offers exceptional visibility to high-income shoppers and tourists.",
      size: "24' × 12'",
      type: "Digital LED",
      price: "₹25,000/week",
      rating: 5,
      src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Urban Highway Billboard",
      category: "ROADSIDE BILLBOARD",
      location: "Ring Road, Kathmandu",
      visibility: "78,000+ daily views",
      availability: "Available now",
      description: "Located on the busiest highway in the city, this billboard targets commuters and provides maximum exposure for your brand campaigns.",
      size: "30' × 15'",
      type: "Static",
      price: "₹18,000/week",
      rating: 4,
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Thamel Night Display",
      category: "ILLUMINATED BILLBOARD",
      location: "Thamel, Kathmandu",
      visibility: "40,000+ nightly views",
      availability: "Available from April 1",
      description: "Capture the attention of tourists and nightlife enthusiasts with this strategically placed illuminated billboard in Thamel's entertainment district.",
      size: "18' × 9'",
      type: "Backlit LED",
      price: "₹15,000/week",
      rating: 4,
      src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Pokhara Lakeside Display",
      category: "TOURIST ZONE BILLBOARD",
      location: "Lakeside, Pokhara",
      visibility: "35,000+ daily views",
      availability: "Limited availability",
      description: "Premium billboard targeting tourists and visitors in Pokhara's scenic lakeside area, perfect for travel, hospitality and luxury brands.",
      size: "20' × 10'",
      type: "Digital Display",
      price: "₹20,000/week",
      rating: 5,
      src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="relative overflow-hidden w-full h-full py-6">
      <Carousel slides={billboardData} />
    </div>
  );
}