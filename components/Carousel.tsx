"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pb } from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

interface Billboard {
  id: string;
  name: string;
  location: string;
  size: string;
  price_per_month: number;
  description: string;
  image: string;
}

// Fallback image URL
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Fetch billboards using React Query
  const { data: slides = [], isLoading } = useQuery({
    queryKey: ['billboards'],
    queryFn: async () => {
      const records = await pb.collection('billboards').getFullList({
        sort: '-created',
      });
      return records as Billboard[];
    }
  });

  const length = slides.length;

  // Auto-advance slides
  React.useEffect(() => {
    if (length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current, length]);

  const nextSlide = () => {
    if (isTransitioning || length === 0) return;
    setIsTransitioning(true);
    setCurrent(current === length - 1 ? 0 : current + 1);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning || length === 0) return;
    setIsTransitioning(true);
    setCurrent(current === 0 ? length - 1 : current - 1);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-[600px] flex items-center justify-center">
        <p>Loading billboards...</p>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="relative w-full h-[600px] flex items-center justify-center">
        <p>No billboards available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="relative h-[600px] w-full">
        {slides.map((slide, index) => {
          // Get image URL or use fallback
          const imageUrl = slide.image 
            ? pb.files.getUrl(slide, slide.image) 
            : FALLBACK_IMAGE;

          return (
            <div
              key={slide.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                index === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-black/50 z-10" />
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={slide.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // If image fails to load, use fallback
                      const target = e.target as HTMLImageElement;
                      target.src = FALLBACK_IMAGE;
                    }}
                  />
                )}
              </div>

              <div className="absolute inset-0 z-20 flex items-center justify-center px-4 md:px-16">
                <div className="max-w-4xl w-full bg-black/70 p-6 md:p-10 rounded-lg backdrop-blur-sm transform transition-all duration-700 ease-out translate-y-0 opacity-100">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="md:w-2/3">
                      <h3 className="text-red-500 font-medium mb-2">DIGITAL BILLBOARD</h3>
                      <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">{slide.name}</h2>
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center text-white/80">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{slide.location}</span>
                        </div>
                      </div>
                      <p className="text-white/80 mb-6">
                        {slide.description}
                      </p>
                      <div className="flex gap-4">
                        <Button className="bg-red-500 hover:bg-red-700 text-white">
                          <Link href={`/service/details?id=${slide.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>

                    <div className="md:w-1/3 bg-white/10 p-4 rounded-lg">
                      <h3 className="text-white text-lg font-medium mb-3">Billboard Specs</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-white/70">Size</span>
                          <span className="text-white font-medium">{slide.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Price</span>
                          <span className="text-white font-medium">${slide.price_per_month}/month</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
  return (
    <div className="relative overflow-hidden w-full h-full py-6">
      <Carousel />
    </div>
  );
}