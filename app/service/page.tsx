
// "use client";

// import React, { useState } from "react";
// import BillboardCard from "@/components/BillboardCard";
// import { useQuery } from "@tanstack/react-query";
// import PocketBase from "pocketbase";

// const pb = new PocketBase(
//    process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://localhost:8090"
// );

// export type Billboard = {
//    id: string;
//    collectionId: string;
//    collectionName: string;
//    name: string;
//    location: string;
//    size: string;
//    price: number;
//    price_per_month?: number; 
//    latitude: number;
//    longitude: number;
//    status?: string;
//    rating?: number;
//    image: string;
//    description?: string;
// };

// export default function Service() {
//    const [searchQuery, setSearchQuery] = useState("");

//    const {
//       data: billboards = [],
//       isLoading,
//       isError,
//    } = useQuery({
//       queryKey: ["billboards"],
//       queryFn: async () => {
//          const records = await pb
//             .collection("billboards")
//             .getFullList<Billboard>({
//                sort: "-created",
//             });
//          return records;
//       },
//    });

//    const filteredBillboards = billboards.filter((billboard) =>
//       `${billboard.name} ${billboard.location} ${billboard.price}`
//          .toLowerCase()
//          .includes(searchQuery.toLowerCase())
//    );

//    return (
//       <main className="p-6 lg:p-10">
//          {/* Search Bar Section */}
//          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
//             <input
//                type="text"
//                placeholder="Search by name, location, or price..."
//                value={searchQuery}
//                onChange={(e) => setSearchQuery(e.target.value)}
//                className="w-full sm:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//          </div>

//          {/* Billboard Grid */}
//          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {isLoading ? (
//                <p className="text-center text-gray-500 col-span-full">
//                   Loading billboards...
//                </p>
//             ) : isError ? (
//                <p className="text-center text-red-500 col-span-full">
//                   Failed to load billboards.
//                </p>
//             ) : filteredBillboards.length > 0 ? (
//                filteredBillboards.map((billboard: any) => (
//                   <BillboardCard key={billboard.id} billboard={billboard} />
//                ))
//             ) : (
//                <p className="text-center text-gray-600 col-span-full">
//                   No billboards found.
//                </p>
//             )}
//          </div>
//       </main>
//    );
// }

"use client";

import React, { useState } from "react";
import BillboardCard from "@/components/BillboardCard";
import { useQuery } from "@tanstack/react-query";
import PocketBase from "pocketbase";

const pb = new PocketBase(
   process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://localhost:8090"
);
export type Billboard = {
   id: string;
   name: string;
   location: string;
   size: string;
   price: number;
   rating: number;
   latitude: number;
   longitude: number;
   image: string; 
};

export default function Service() {
   const [searchQuery, setSearchQuery] = useState("");

   const {
      data: billboards = [],
      isLoading,
      isError,
   } = useQuery({
      queryKey: ["billboards"],
      queryFn: async () => {
         const records = await pb
            .collection("billboards")
            .getFullList<Billboard>({
               sort: "-created",
            });
         return records;
      },
   });

   const filteredBillboards = billboards.filter((billboard) =>
      `${billboard.name} ${billboard.location} ${billboard.price}`
         .toLowerCase()
         .includes(searchQuery.toLowerCase())
   );

   return (
      <main className="p-6 lg:p-10">
         {/* Search Bar Section */}
         <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <input
               type="text"
               placeholder="Search by name"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full sm:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
         </div>

         {/* Billboard Grid */}
         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
               <p className="text-center text-gray-500 col-span-full">
                  Loading billboards...
               </p>
            ) : isError ? (
               <p className="text-center text-red-500 col-span-full">
                  Failed to load billboards.
               </p>
            ) : filteredBillboards.length > 0 ? (
               filteredBillboards.map((billboard: any) => (
                  <BillboardCard key={billboard.id} billboard={billboard} />
               ))
            ) : (
               <p className="text-center text-gray-600 col-span-full">
                  No billboards found.
               </p>
            )}
         </div>
      </main>
   );
}
