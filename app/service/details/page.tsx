"use client"

import React, { useState } from 'react';
import { MapPin, DollarSign, Maximize, Info, Calendar, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import Link from 'next/link'
// Billboard data
const billboardData = {
  id: 1,
  title: "Premium Digital Billboard",
  description: "High visibility premium digital billboard located in central Kathmandu with excellent exposure to daily commuters and travelers. This location sees approximately 50,000 pedestrians and vehicles per day and offers 24/7 visibility with dedicated lighting.",
  price: 1800,
  size: "14ft × 48ft",
  dailyImpressions: "50,000+",
  location: {
    name: "Baneshwor, Kathmandu",
    address: "Mid-Baneshwor, Kathmandu 44600, Nepal",
  },
  images: [
    "https://hoardingboardnepal.com/assets/ds-images/ds-baneshwor-new.webp",
    "https://hoardingboardnepal.com/assets/ds-images/ds-baneshwor-new.webp",
    "https://hoardingboardnepal.com/assets/ds-images/ds-baneshwor-new.webp"
  ]
};

const BillboardDetailsPage = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % billboardData.images.length);
  };
  
  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + billboardData.images.length) % billboardData.images.length);
  };
  
  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900">{billboardData.title}</h1>
        <p className="text-gray-600 flex items-center mt-2">
          <MapPin className="mr-2" size={16} />
          {billboardData.location.address}
        </p>
      </div>
      
      {/* Main Content - Image left, Details right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Left Side - Image Gallery */}
        <div className="order-2 md:order-1">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative group">
            <img 
              src={billboardData.images[activeImageIndex]} 
              alt="Billboard view" 
              className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
            />
            
            {/* Navigation arrows */}
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-sm transition-all duration-300 opacity-90 hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="text-gray-900" size={18} />
            </button>
            
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-sm transition-all duration-300 opacity-90 hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="text-gray-900" size={18} />
            </button>
          </div>
          
          <div className="flex justify-center space-x-3 mt-4">
            {billboardData.images.map((image, index) => (
              <div 
                key={index}
                className={`w-16 h-12 rounded-md overflow-hidden cursor-pointer border transition-all duration-300 ${
                  index === activeImageIndex ? 'border-red-500 ring-1 ring-red-300' : 'border-gray-200 hover:border-red-300'
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`Billboard thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Side - Key Info */}
        <div className="order-1 md:order-2">
          <div className="space-y-6">
            <div className="border rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-red-50 rounded-full mr-4">
                  <DollarSign className="text-red-500" size={22} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Monthly Price</p>
                  <p className="font-bold text-xl text-gray-900">NPR {billboardData.price.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="p-3 bg-red-50 rounded-full mr-4">
                  <Maximize className="text-red-500" size={22} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Dimensions</p>
                  <p className="font-bold text-xl text-gray-900">{billboardData.size}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="p-3 bg-red-50 rounded-full mr-4">
                  <Users className="text-red-500" size={22} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Daily Impressions</p>
                  <p className="font-bold text-xl text-gray-900">{billboardData.dailyImpressions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Description Section */}
      <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 mb-10">
        <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
          <Info className="mr-2 text-gray-600" size={20} />
          About This Billboard
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {billboardData.description}
        </p>
      </div>
      
      {/* Book Now CTA */}
      <div className="flex justify-center mt-8 mb-12">
        <button className="px-8 py-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all flex items-center justify-center shadow-sm hover:shadow-md">
          <Calendar className="mr-3" size={18} />
          <Link href="/service/billboard">           Book This Billboard
          </Link>        </button>
      </div>
    </div>
  );
};

export default BillboardDetailsPage; 