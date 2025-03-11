"use client";

import React, { useState } from "react";

export default function FAQ() {
  // Track which FAQ item is open
  const [activeItem, setActiveItem] = useState(null);

  // Toggle FAQ items
  const toggleItem = (index) => {
    setActiveItem(activeItem === index ? null : index);
  };

  // FAQ data
  const faqItems = [
    {
      question: "Can I upload my own advertisement?",
      answer: "Yes! Board Air allows users to upload their own images or videos for advertisement. The platform accepts common file formats such as .jpg, .png for images and .mp4 for videos."
    },
    {
      question: "Can I change or cancel my booking?",
      answer: "No, you can not modify or cancel your booking. Please refer to our Terms and Conditions for specific cancellation policies and potential fees."
    },
    {
      question: "Are there any restrictions on the content I can advertise?",
      answer: "Yes, all content must adhere to local laws and regulations. Advertisements that promote hate speech, violence, or illegal activities will not be allowed. Please ensure your content complies with Nepal Advertisement Guidelines."
    },
    {
      question: "Can I track the performance of my advertisement?",
      answer: "Currently, our platform does not support real-time performance tracking. However, we are working on adding analytics features in the future to give advertisers insights on the reach and impact of their ads."
    },
    {
      question: "How do I know if a digital billboard is available at my preferred time?",
      answer: "Our platform allows you to view available time slots for each billboard in real-time. Simply select your preferred location, and the calendar will show you the available times."
    }
  ];

  // SVG icons for down and up arrows
  const DownIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );

  const UpIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  );

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto">
      <h2 className="text-4xl font-sans font-medium mb-12 text-center uppercase tracking-wide">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div 
            key={index} 
            className="border-b border-gray-200 overflow-hidden"
          >
            <button
              className="w-full py-5 px-4 text-left font-sans font-medium text-lg flex justify-between items-center transition-colors duration-200 hover:text-black-600"
              onClick={() => toggleItem(index)}
            >
              {item.question}
              <span className="text-gray-500 transition-transform duration-200">
                {activeItem === index ? <UpIcon /> : <DownIcon />}
              </span>
            </button>
            
            {activeItem === index && (
              <div 
                className="py-4 px-4 font-sans text-gray-600 leading-relaxed mb-2"
                style={{ 
                  maxHeight: "200px",
                  transition: "max-height 0.3s ease-in-out"
                }}
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}