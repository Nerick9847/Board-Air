// "use client";

// import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { Star, MapPin, Ruler, Clock, ArrowRight } from "lucide-react";
// import Link from "next/link";
// import "leaflet/dist/leaflet.css";

// const BillboardCard = () => {
//   const [hovered, setHovered] = useState(false);
//   const [buttonHovered, setButtonHovered] = useState(false);

//   return (
//     <div className="p-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl">
//       <Card className="max-w-md bg-white rounded-2xl shadow-lg overflow-hidden border-0 transition-all duration-300 hover:shadow-xl relative backdrop-blur-sm">
//         <div className="absolute -top-2 -right-2 w-16 h-16 bg-blue-500 opacity-10 rounded-full blur-xl"></div>
//         <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500 opacity-10 rounded-full blur-xl"></div>
        
//         <div
//           className="relative w-full h-64 overflow-hidden"
//           onMouseEnter={() => setHovered(true)}
//           onMouseLeave={() => setHovered(false)}
//         >
//           {/* Billboard Image */}
//           <img
//             src="https://hoardingboardnepal.com/assets/ds-images/ds-baneshwor-new.webp"
//             alt="Billboard at Baneshwor"
//             className={`absolute top-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
//               hovered ? "scale-105 opacity-0" : "scale-100 opacity-100"
//             }`}
//           />

//           <div 
//             className={`absolute top-0 w-full h-full transition-all duration-500 ease-in-out ${
//               hovered ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <MapContainer 
//               center={[27.7156, 85.3123]} 
//               zoom={15} 
//               className="w-full h-full z-10"
//               zoomControl={false}
//             >
//               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//               <Marker position={[27.7156, 85.3123]}>
//                 <Popup>Baneshwor Billboard Location</Popup>
//               </Marker>
//             </MapContainer>
//           </div>
          
//           <div 
//             className={`absolute bottom-4 right-4 bg-black bg-opacity-70 text-white text-xs font-medium px-3 py-1.5 rounded-full z-20 transition-opacity duration-300 flex items-center ${
//               hovered ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <MapPin className="w-3 h-3 mr-1" />
//             View Location
//           </div>
//         </div>

//         <CardContent className="p-6 relative">
//           {/* Name & Location */}
//           <div className="mb-4">
//            <Link href="/service/details"> <h2 className="text-xl font-semibold text-gray-800 mb-1.5">Baneshwor LED Billboard</h2></Link>
//             <div className="flex items-center text-gray-500 text-sm">
//               <MapPin className="w-3.5 h-3.5 mr-1.5" />
//               <span>Baneshwor, Kathmandu, Nepal</span>
//             </div>
//           </div>

//           <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>

//           <div className="grid grid-cols-2 gap-4 mb-5">
//             <div className="flex items-center text-gray-600 text-sm">
//               <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
//                 <Ruler className="w-4 h-4 text-blue-600" />
//               </div>
//               <span>20ft x 10ft</span>
//             </div>
//             <div className="flex items-center text-gray-600 text-sm">
//               <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
//                 <Star className="w-4 h-4 text-amber-500" />
//               </div>
//               <span>4.8 (24 Reviews)</span>
//             </div>
//             <div className="flex items-center text-gray-600 text-sm">
//               <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
//                 <Clock className="w-4 h-4 text-purple-600" />
//               </div>
//               <span>High Traffic Hours</span>
//             </div>
//             <div className="flex items-center text-gray-600 text-sm">
//               <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
//                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
//               </div>
//               <span>Digital Display</span>
//             </div>
//           </div>

//           {/* Pricing & CTA */}
//           <div className="flex justify-between items-center mt-6">
//             <div className="flex flex-col">
//               <span className="text-xs text-gray-500 uppercase tracking-wide">Daily Rate</span>
//               <div className="flex items-baseline">
//                 <span className="text-2xl font-bold text-gray-800">NPR 100</span>
//                 <span className="text-xs text-gray-500 ml-1">/day</span>
//               </div>
//             </div>
            
//             <button 
//               className="relative overflow-hidden group"
//               onMouseEnter={() => setButtonHovered(true)}
//               onMouseLeave={() => setButtonHovered(false)}
//             >
//               <span className={`inline-flex items-center justify-center gap-x-2 rounded-xl transition-all duration-300 ${
//                 buttonHovered 
//                   ? "pl-4 pr-12 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-500"  
//                   : "px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-700 hover:to-rose-400"
//                   } text-white font-medium shadow-md hover:shadow-lg`}>
//                      <Link href="/service/billboard">Book Now</Link>
//                   <ArrowRight className={`w-4 h-4 transition-all duration-300 absolute ${
//                   buttonHovered ? "opacity-100 right-4" : "opacity-0 right-2"
//                   }`} />
//               </span>
//             </button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default BillboardCard;
// "use client";

// import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { Star, MapPin, Ruler, Clock, ArrowRight } from "lucide-react";
// import Link from "next/link";
// import "leaflet/dist/leaflet.css";

// const BillboardCard = () => {
//   const [hovered, setHovered] = useState(false);
//   const [buttonHovered, setButtonHovered] = useState(false);

//   return (
//     <div className="p-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl">
//       <Card className="max-w-md bg-white rounded-2xl shadow-lg overflow-hidden border-0 transition-all duration-300 hover:shadow-xl relative backdrop-blur-sm">
//         <div className="absolute -top-2 -right-2 w-16 h-16 bg-blue-500 opacity-10 rounded-full blur-xl"></div>
//         <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500 opacity-10 rounded-full blur-xl"></div>

//         <div
//           className="relative w-full h-64 overflow-hidden"
//           onMouseEnter={() => setHovered(true)}
//           onMouseLeave={() => setHovered(false)}
//         >
//           {/* Billboard Image */}
//           <img
//             src="https://hoardingboardnepal.com/assets/ds-images/ds-baneshwor-new.webp"
//             alt="Billboard at Baneshwor"
//             className={`absolute top-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
//               hovered ? "scale-105 opacity-0" : "scale-100 opacity-100"
//             }`}
//           />

//           <div
//             className={`absolute top-0 w-full h-full transition-all duration-500 ease-in-out ${
//               hovered ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <MapContainer
//               center={[27.7156, 85.3123]}
//               zoom={15}
//               className="w-full h-full z-10"
//               zoomControl={false}
//             >
//               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//               <Marker position={[27.7156, 85.3123]}>
//                 <Popup>Baneshwor Billboard Location</Popup>
//               </Marker>
//             </MapContainer>
//           </div>

//           <div
//             className={`absolute bottom-4 right-4 bg-black bg-opacity-70 text-white text-xs font-medium px-3 py-1.5 rounded-full z-20 transition-opacity duration-300 flex items-center ${
//               hovered ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <MapPin className="w-3 h-3 mr-1" />
//             View Location
//           </div>
//         </div>

//         <CardContent className="p-6 relative">
//           {/* Name & Location */}
//           <div className="mb-4">
//            <Link href="/service/details"> <h2 className="text-xl font-semibold text-gray-800 mb-1.5">Baneshwor LED Billboard</h2></Link>
//             <div className="flex items-center text-gray-500 text-sm">
//               <MapPin className="w-3.5 h-3.5 mr-1.5" />
//               <span>Baneshwor, Kathmandu, Nepal</span>
//             </div>
//           </div>

//           <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>

//           <div className="grid grid-cols-2 gap-4 mb-5">
//             <div className="flex items-center text-gray-600 text-sm">
//               <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
//                 <Ruler className="w-4 h-4 text-blue-600" />
//               </div>
//               <span>20ft x 10ft</span>
//             </div>
//             <div className="flex items-center text-gray-600 text-sm">
//               <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
//                 <Star className="w-4 h-4 text-amber-500" />
//               </div>
//               <span>4.8 (24 Reviews)</span>
//             </div>
//             <div className="flex items-center text-gray-600 text-sm">
//               <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
//                 <Clock className="w-4 h-4 text-purple-600" />
//               </div>
//               <span>High Traffic Hours</span>
//             </div>
//             <div className="flex items-center text-gray-600 text-sm">
//               <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
//                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
//               </div>
//               <span>Digital Display</span>
//             </div>
//           </div>

//           {/* Pricing & CTA */}
//           <div className="flex justify-between items-center mt-6">
//             <div className="flex flex-col">
//               <span className="text-xs text-gray-500 uppercase tracking-wide">Daily Rate</span>
//               <div className="flex items-baseline">
//                 <span className="text-2xl font-bold text-gray-800">NPR 100</span>
//                 <span className="text-xs text-gray-500 ml-1">/day</span>
//               </div>
//             </div>

//             <button
//               className="relative overflow-hidden group"
//               onMouseEnter={() => setButtonHovered(true)}
//               onMouseLeave={() => setButtonHovered(false)}
//             >
//               <span className={`inline-flex items-center justify-center gap-x-2 rounded-xl transition-all duration-300 ${
//                 buttonHovered
//                   ? "pl-4 pr-12 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-500"
//                   : "px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-700 hover:to-rose-400"
//                   } text-white font-medium shadow-md hover:shadow-lg`}>
//                      <Link href="/service/billboard">Book Now</Link>
//                   <ArrowRight className={`w-4 h-4 transition-all duration-300 absolute ${
//                   buttonHovered ? "opacity-100 right-4" : "opacity-0 right-2"
//                   }`} />
//               </span>
//             </button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default BillboardCard;

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
};

type Props = {
  billboard: Billboard;
};

const BillboardCard = ({ billboard }: Props) => {
  const [hovered, setHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const { data: session, status } = useSession();

  
  // Calculate daily price from monthly price
  const dailyPrice = Math.round(billboard.price_per_month / 30);

  return (
    <Card className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl">
      <div
        className="relative w-full h-72 overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Properly handle the image path */}
        {billboard.image && (
         <img
         src={`http://127.0.0.1:8090/api/files/pbc_280385485/5k06d8b70803530/${billboard.image}`}
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
          className={`absolute bottom-4 right-4 bg-gray-900 bg-opacity-80 text-white text-xs font-medium px-3 py-1.5 rounded-full z-20 transition-opacity duration-300 flex items-center ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <MapPin className="w-3 h-3 mr-1" />
          View Location
        </div>
        
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/50 to-transparent z-10">
          <div className="flex items-center p-4">
            <div className="bg-white/90 rounded-full px-3 py-1 text-xs font-semibold text-gray-800">
              Premium Billboard
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
          <InfoBadge icon={<Calendar className="w-4 h-4" />} text="Available Now" />
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
                        className={`inline-flex items-center justify-center gap-x-2 rounded-xl transition-all duration-300 ${
                           buttonHovered
                              ? "pl-4 pr-12 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-500"
                              : "px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-700 hover:to-rose-400"
                        } text-white font-medium shadow-md hover:shadow-lg`}
                     >
                        {session ? (
                           <Link
                              href={`/service/details?id=${billboard.id}`}
                              className="inline-flex items-center px-4 py-2  text-white rounded-lg hover:bg-blue-700 transition-colors"
                              onMouseEnter={() => setButtonHovered(true)}
                              onMouseLeave={() => setButtonHovered(false)}
                           >
                              Book Now
                              <ArrowRight
                                 className={`w-4 h-4 transition-all duration-300 absolute ${
                                    buttonHovered
                                       ? "opacity-100 right-4"
                                       : "opacity-0 right-2"
                                 }`}
                              />
                           </Link>
                        ) : (
                           <div className="px-4 py-2 text-white rounded-lg cursor-not-allowed">
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