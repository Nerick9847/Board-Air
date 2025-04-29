"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin, Ruler, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import { useSession } from "next-auth/react";

// Billboard type definition based on your PocketBase collection
export type Billboard = {
  id: string;
  name: string;
  location: string;
  size: string;
  price_per_month: number;
  latitude: number;
  longitude: number;
  image: string;
  description: string;
  status: string
};

type Props = {
  billboard: Billboard;
};

const BillboardCard = ({ billboard }: Props) => {
  const [hovered, setHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const { data: session, status } = useSession();
  console.log("this is", billboard)
  
  // Calculate daily price from monthly price
  const dailyPrice = Math.round(billboard.price_per_month / 30);

  return (
    <Card className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl">
      <div
        className="relative w-full h-72 overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* image path */}
        {billboard.image && (
          <img
            src={`http://127.0.0.1:8090/api/files/pbc_280385485/${billboard.id}/${billboard.image}`}
            alt={billboard.name}
            className={`absolute top-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
              hovered ? "scale-105 opacity-0" : "scale-100 opacity-100"
            }`}
          />
        )}

        <div
          className={`absolute top-0 w-full h-full transition-all duration-500 ease-in-out ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <MapContainer
            center={[billboard.latitude, billboard.longitude]}
            zoom={15}
            className="w-full h-full z-10"
            zoomControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[billboard.latitude, billboard.longitude]}>
              <Popup>{billboard.name}</Popup>
            </Marker>
          </MapContainer>
        </div>

        <div
          className={`absolute bottom-4 right-4 text-xs font-medium px-3 py-1.5 rounded-full z-20 transition-opacity duration-300 flex items-center ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <MapPin className="w-3 h-3 mr-1" />
          View Location
        </div>
        
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/50 to-transparent z-10">
          <div className="flex items-center p-4">
            <div className="flex flex-wrap gap-4 my-4">
              <InfoBadge icon={<Calendar className="w-4 h-4" />} text={billboard.status} />
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <Link href={`/service/${billboard.id}`}>
            <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-gray-700 transition-colors">
              {billboard.name}
            </h2>
          </Link>
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <MapPin className="w-3.5 h-3.5 mr-2 text-gray-500" />
            <span>{billboard.location}</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {billboard.description || "Strategic billboard location with high visibility and excellent audience reach."}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 my-4">
          <InfoBadge icon={<Ruler className="w-4 h-4" />} text={billboard.size} />
        </div>

        <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-200">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium tracking-wide">DAILY RATE</span>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-800">
                ${dailyPrice}
              </span>
              <span className="text-xs text-gray-500 ml-1">/day</span>
            </div>
          </div>

          <button
            className="relative overflow-hidden"
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
          >
            <span
              className={`inline-flex items-center justify-center gap-x-2 rounded-lg transition-all duration-300 ${
                buttonHovered
                  ? "pl-3 pr-10 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-500"
                  : "px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-700 hover:to-rose-400"
              } text-white font-medium shadow-md hover:shadow-lg`}
            >
              {session ? (
                <Link
                  href={`/service/details?id=${billboard.id}`}
                  className="inline-flex items-center"
                  onMouseEnter={() => setButtonHovered(true)}
                  onMouseLeave={() => setButtonHovered(false)}
                >
                  Book Now
                  <ArrowRight
                    className={`w-4 h-4 transition-all duration-300 absolute ${
                      buttonHovered
                        ? "opacity-100 right-3"
                        : "opacity-0 right-1"
                    }`}
                  />
                </Link>
              ) : (
                <div className="text-white cursor-not-allowed">
                  Please Login
                </div>
              )}
            </span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

const InfoBadge = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-gray-700 text-sm">
    <span className="text-gray-600">{icon}</span>
    <span className="font-medium">{text}</span>
  </div>
);

export default BillboardCard;