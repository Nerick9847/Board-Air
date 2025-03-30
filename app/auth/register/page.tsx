"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function RegistrationSelectionPage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const cardData = [
    {
      id: "billboardowner",
      title: "Billboard Owner",
      description: "List your billboards and start monetizing your advertising space.",
      imageSrc: "/images/billboard-owner.jpg",
      route: "/registration/billboardowner",
    },
    {
      id: "advertiser",
      title: "Advertiser",
      description: "Find and book billboard spaces for your advertising campaigns.",
      imageSrc: "/images/advertiser.jpg",
      route: "/registration/advertiser",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-5xl font-extrabold mb-10 text-gray-800 tracking-wide">Get Started As</h1>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        {cardData.map(({ id, title, description, imageSrc, route }) => (
          <Card
            key={id}
            className="relative flex-1 rounded-xl shadow-lg transition-all duration-500 cursor-pointer bg-white border border-gray-300 hover:shadow-2xl overflow-hidden h-80"
            onClick={() => router.push(route)}
            onMouseEnter={() => setHoveredCard(id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Image at the Top */}
            <div className="w-full h-40 relative">
              <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" />
            </div>

            {/* Text Content */}
            <div className="p-6 relative z-10">
              <h2 className="text-3xl font-semibold text-gray-800 tracking-wide">{title}</h2>
              <p className="text-gray-600 mt-2 text-lg">{description}</p>
            </div>

            {/* Full Hover Effect - Diagonal Transition */}
            <div
              className={`absolute inset-0 bg-blue-600 text-white flex items-center justify-center text-3xl font-bold tracking-wider transition-transform duration-500
                ${hoveredCard === id ? "translate-x-0 translate-y-0 opacity-100" : "translate-x-[-100%] translate-y-[100%] opacity-0"}
              `}
            >
              {title}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}