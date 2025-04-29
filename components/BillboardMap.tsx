"use client";

import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngExpression } from "leaflet";
import PocketBase from 'pocketbase';

// Initialize PocketBase outside the component to avoid re-creation
const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');

// Define interfaces for type safety
interface Billboard {
   id: string;
   name: string;
   location: string;
   position: LatLngExpression;
   price_per_month: number;
   owner_id: string;
   size: string;
   status: string;
   image: string;
   description: string;
   latitude: number;
   longitude: number;
   created: string;
   updated: string;
}

// Custom hook to control map view
const MapController = ({ position }: { position: LatLngExpression }) => {
   const map = useMap();
   map.setView(position, 15, { animate: true });
   return null;
};

// Create a standalone function to fetch billboards
const fetchBillboardsData = async () => {
   try {
      // Use a direct fetch instead of PocketBase client for better control
      const response = await fetch(`${process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090'}/api/collections/billboards/records?sort=created`);
      
      if (!response.ok) {
         throw new Error(`HTTP error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform the records to match the Billboard interface
      return data.items.map(record => ({
         id: record.id,
         name: record.name,
         location: record.location,
         position: [record.latitude, record.longitude] as LatLngExpression,
         price_per_month: record.price_per_month,
         owner_id: record.owner_id,
         size: record.size,
         status: record.status,
         image: record.image,
         description: record.description,
         latitude: record.latitude,
         longitude: record.longitude,
         created: record.created,
         updated: record.updated
      }));
   } catch (err) {
      console.error("Failed to fetch billboards:", err);
      throw err;
   }
};

const BillboardMap = () => {
   const [billboards, setBillboards] = useState<Billboard[]>([]);
   const [selectedBillboard, setSelectedBillboard] = useState<Billboard | null>(null);
   const [searchTerm, setSearchTerm] = useState("");
   const [mapCenter, setMapCenter] = useState<LatLngExpression>([27.7017, 85.3125]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   
   // Use ref to prevent effect from running more than once
   const dataFetchedRef = useRef(false);

   const customIcon = new Icon({
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      shadowSize: [41, 41],
   });

   // Fetch billboards using standard fetch API instead of PocketBase client
   useEffect(() => {
      // Avoid refetching on multiple renders
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
      
      const loadBillboards = async () => {
         try {
            setLoading(true);
            const data = await fetchBillboardsData();
            setBillboards(data);
            setLoading(false);
         } catch (err) {
            setError("Failed to load billboards. Please try again later.");
            setLoading(false);
         }
      };

      loadBillboards();
   }, []);

   const handleSearch = () => {
      if (!searchTerm.trim()) return;
      
      const billboard = billboards.find(
         (b) => b.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
                b.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (billboard) {
         setMapCenter(billboard.position);
         setSelectedBillboard(billboard);
      }
   };

   const handleRefresh = async () => {
      try {
         setLoading(true);
         setError(null);
         const data = await fetchBillboardsData();
         setBillboards(data);
         setLoading(false);
      } catch (err) {
         setError("Failed to refresh billboards. Please try again later.");
         setLoading(false);
      }
   };

   if (loading) {
      return (
         <Card className="w-full max-w-6xl mx-auto my-8">
            <CardContent className="p-6 flex justify-center items-center h-64">
               <p>Loading billboards...</p>
            </CardContent>
         </Card>
      );
   }

   if (error) {
      return (
         <Card className="w-full max-w-6xl mx-auto my-8">
            <CardContent className="p-6 flex justify-center items-center h-64 flex-col">
               <p className="text-red-500 mb-4">{error}</p>
               <Button 
                  onClick={handleRefresh} 
                  className="bg-red-500 hover:bg-red-700"
               >
                  Retry
               </Button>
            </CardContent>
         </Card>
      );
   }

   return (
      <Card className="w-full max-w-6xl mx-auto my-8">
         <CardContent className="p-6">
            {/* Search Bar */}
            <div className="flex items-center gap-4 mb-4">
               <Input
                  type="text"
                  placeholder="Search location or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
               />
               <Button onClick={handleSearch} className="bg-red-500 hover:bg-red-600">
                  Search
               </Button>
            </div>

            {/* Display the number of billboards */}
            <p className="mb-4 text-sm text-gray-600">
               Found {billboards.length} billboards
            </p>

            <div className="h-96 md:h-[600px] relative">
               {billboards.length > 0 ? (
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
                     {billboards.map((billboard) => (
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
                                    {billboard.name}
                                 </h3>
                                 <p className="mb-1">
                                    Location: {billboard.location}
                                 </p>
                                 <p className="mb-1">
                                    Price: NPR {billboard.price_per_month.toLocaleString()}/month
                                 </p>
                                 <p className="mb-1">Size: {billboard.size}</p>
                                 <p className="mb-1">Status: {billboard.status}</p>
                                 <div className="mb-2">
                                    {billboard.description && (
                                       <p className="text-sm text-gray-600">{billboard.description}</p>
                                    )}
                                 </div>
                                 <Link href={`/service/details?id=${billboard.id}`}>
                                    <Button className="w-full">
                                       View Details
                                    </Button>
                                 </Link>
                              </div>
                           </Popup>
                        </Marker>
                     ))}
                  </MapContainer>
               ) : (
                  <div className="flex justify-center items-center h-full">
                     <p>No billboards available</p>
                  </div>
               )}
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