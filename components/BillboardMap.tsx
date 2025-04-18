"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngExpression } from "leaflet";

// Define interfaces for type safety
interface Billboard {
   id: number;
   location: string;
   position: LatLngExpression;
   price: number;
   owner: string;
   contact: string;
   size: string;
}

// Sample billboard data
const billboardData: Billboard[] = [
   {
      id: 1,
      location: "Tripureshwor",
      position: [27.6944, 85.3065],
      price: 50000,
      owner: "Nepal Advertising Ltd",
      contact: "+977-1-4444444",
      size: "20ft x 40ft",
   },
   {
      id: 2,
      location: "Sundhara",
      position: [27.7017, 85.3125],
      price: 65000,
      owner: "City Media Group",
      contact: "+977-1-5555555",
      size: "30ft x 60ft",
   },
   {
      id: 3,
      location: "Kalanki",
      position: [27.6931, 85.2828],
      price: 45000,
      owner: "Metro Billboards",
      contact: "+977-1-6666666",
      size: "15ft x 30ft",
   },
   {
      id: 4,
      location: "Kritipur",
      position: [27.6747, 85.2778],
      price: 40000,
      owner: "Valley Advertising",
      contact: "+977-1-7777777",
      size: "20ft x 40ft",
   },
   {
      id: 5,
      location: "Baneshwor",
      position: [27.691, 85.343],
      price: 55000,
      owner: "Prime Outdoor Media",
      contact: "+977-1-8888888",
      size: "25ft x 50ft",
   },
   {
      id: 6,
      location: "Durbarmarg",
      position: [27.7127, 85.3206],
      price: 75000,
      owner: "Royal Media Solutions",
      contact: "+977-1-9999999",
      size: "35ft x 70ft",
   },
];

// Custom hook to control map view
const MapController = ({ position }: { position: LatLngExpression }) => {
   const map = useMap();
   map.setView(position, 15, { animate: true });
   return null;
};

const BillboardMap = () => {
   const [selectedBillboard, setSelectedBillboard] = useState<Billboard | null>(
      null
   );
   const [searchTerm, setSearchTerm] = useState("");
   const [mapCenter, setMapCenter] = useState<LatLngExpression>([
      27.7017, 85.3125,
   ]);

   const customIcon = new Icon({
      iconUrl:
         "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl:
         "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      shadowSize: [41, 41],
   });

   const handleSearch = () => {
      const billboard = billboardData.find(
         (b) => b.location.toLowerCase() === searchTerm.toLowerCase()
      );
      if (billboard) {
         setMapCenter(billboard.position);
         setSelectedBillboard(billboard);
      }
   };

   return (
      <Card className="w-full max-w-6xl mx-auto my-8">
         <CardContent className="p-6">
            {/* Search Bar */}
            <div className="flex items-center gap-4 mb-4">
               <Input
                  type="text"
                  placeholder="Search location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
               />
               <Button onClick={handleSearch} className="bg-red-600 hover:bg-red-700">
                  Search
               </Button>
            </div>

            <div className="h-[600px] relative">
               <MapContainer
                  center={mapCenter}
                  zoom={11}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                  className="rounded-lg"
               >
                  <TileLayer
                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapController position={mapCenter} />
                  {billboardData.map((billboard) => (
                     <Marker
                        key={billboard.id}
                        position={billboard.position}
                        icon={customIcon}
                        eventHandlers={{
                           click: () => setSelectedBillboard(billboard),
                        }}
                     >
                        <Popup>
                           <div className="p-2">
                              <h3 className="font-bold text-lg mb-2">
                                 {billboard.location}
                              </h3>
                              <p className="mb-1">
                                 Price: NPR {billboard.price.toLocaleString()}
                                 /month
                              </p>
                              <p className="mb-1">Size: {billboard.size}</p>
                              <p className="mb-1">Owner: {billboard.owner}</p>
                              <p className="mb-2">
                                 Contact: {billboard.contact}
                              </p>
                              <Link href={`/billboards/${billboard.id}`}>
                                 <Button className="w-full">
                                    View Details
                                 </Button>
                              </Link>
                           </div>
                        </Popup>
                     </Marker>
                  ))}
               </MapContainer>
            </div>
         </CardContent>
      </Card>
   );
};

// Export as dynamic component with SSR disabled
export default dynamic(() => Promise.resolve(BillboardMap), {
   ssr: false,
   loading: () => <p>Loading map...</p>,
});
