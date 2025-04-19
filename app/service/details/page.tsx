"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import {
   MapPin,
   DollarSign,
   Maximize,
   Info,
   Calendar,
   Users,
} from "lucide-react";
import Link from "next/link";

const pb = new PocketBase("http://127.0.0.1:8090");

const BillboardDetailsPage = () => {
   const searchParams = useSearchParams();
   const id = searchParams.get("id");
   const [billboard, setBillboard] = useState<any | null>(null);

   useEffect(() => {
      if (!id) return;
      const fetchBillboard = async () => {
         try {
            const record = await pb.collection("billboards").getOne(id);
            setBillboard(record);
         } catch (error) {
            console.error("Error fetching billboard:", error);
         }
      };
      fetchBillboard();
   }, [id]);

   if (!billboard) return <div className="p-6">Loading billboard...</div>;

   console.log(" This is the full info", billboard);
   return (
      <div className="max-w-6xl mx-auto p-6 lg:p-10 bg-white min-h-screen">
         {/* Header */}
         <div className="mb-8 border-b pb-6">
            <h1 className="text-3xl font-bold text-gray-900">
               {billboard.name}
            </h1>
            <p className="text-gray-600 flex items-center mt-2">
               <MapPin className="mr-2" size={16} />
               {billboard.location}
            </p>
         </div>

         {/* Main */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Single Image */}
            <div className="order-2 md:order-1">
               <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                     src={billboard.images?.[0]}
                     alt="Billboard"
                     className="w-full h-full object-cover"
                  />
               </div>
            </div>

            {/* Info Box */}
            <div className="order-1 md:order-2">
               <div className="space-y-6">
                  <div className="border rounded-lg p-5 shadow-sm hover:shadow-md">
                     <div className="flex items-center mb-4">
                        <div className="p-3 bg-red-50 rounded-full mr-4">
                           <DollarSign className="text-red-500" size={22} />
                        </div>
                        <div>
                           <p className="text-sm text-gray-500">
                              Monthly Price
                           </p>
                           <p className="font-bold text-xl text-gray-900">
                              NPR {billboard.price_per_month}
                           </p>
                        </div>
                     </div>

                     <div className="flex items-center mb-4">
                        <div className="p-3 bg-red-50 rounded-full mr-4">
                           <Maximize className="text-red-500" size={22} />
                        </div>
                        <div>
                           <p className="text-sm text-gray-500">Dimensions</p>
                           <p className="font-bold text-xl text-gray-900">
                              {billboard.size}
                           </p>
                        </div>
                     </div>

                     <div className="flex items-center">
                        <div className="p-3 bg-red-50 rounded-full mr-4">
                           <Users className="text-red-500" size={22} />
                        </div>
                        <div>
                           <p className="text-sm text-gray-500">
                              Daily Impressions
                           </p>
                           <p className="font-bold text-xl text-gray-900">
                              {billboard.dailyImpressions}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Description */}
         <div className="border rounded-lg p-6 shadow-sm hover:shadow-md mb-10">
            <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
               <Info className="mr-2 text-gray-600" size={20} />
               About This Billboard
            </h2>
            <p className="text-gray-700 leading-relaxed">
               {billboard.description}
            </p>
         </div>

         {/* CTA Button */}
         <div className="flex justify-center mt-8 mb-12">
            <Link
               href={`/service/billboard?id=${billboard.id}`}
               className="px-8 py-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 flex items-center"
            >
               <Calendar className="mr-3" size={18} />
               Book This Billboard
            </Link>
         </div>
      </div>
   );
};

export default BillboardDetailsPage;
