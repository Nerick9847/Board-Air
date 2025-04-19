// "use client";

// import React, { useState } from "react";
// import BillboardCard from "@/components/BillboardCard";

// const billboards = [
//    { id: 1, name: "Thamel LED Billboard", location: "Thamel, Kathmandu, Nepal", size: "20ft x 10ft", price: 800000, rating: 4.8 },
//    { id: 2, name: "Durbarmarg Billboard", location: "Durbarmarg, Kathmandu, Nepal", size: "25ft x 12ft", price: 950000, rating: 4.7 },
//    { id: 3, name: "Patan Digital Screen", location: "Patan, Lalitpur, Nepal", size: "15ft x 8ft", price: 700000, rating: 4.6 },
//    { id: 4, name: "New Road LED Billboard", location: "New Road, Kathmandu, Nepal", size: "30ft x 15ft", price: 1000000, rating: 4.9 },
//    { id: 5, name: "Baneshwor Digital Board", location: "Baneshwor, Kathmandu, Nepal", size: "22ft x 11ft", price: 850000, rating: 4.5 },
//    { id: 6, name: "Pokhara Lakeside Board", location: "Lakeside, Pokhara, Nepal", size: "18ft x 9ft", price: 750000, rating: 4.7 },
// ];

// export default function Service() {
//    const [searchQuery, setSearchQuery] = useState("");
//    const [filteredBillboards, setFilteredBillboards] = useState(billboards);

//    // Handle Search
//    const handleSearch = () => {
//       const results = billboards.filter((billboard) =>
//          `${billboard.name} ${billboard.location} ${billboard.price}`
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase())
//       );
//       setFilteredBillboards(results);
//    };

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
//             <button
//                onClick={handleSearch}
//                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all"
//             >
//                Search
//             </button>
//          </div>

//          {/* Billboard Grid */}
//          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {filteredBillboards.length > 0 ? (
//                filteredBillboards.map((billboard) => (
//                   <BillboardCard key={billboard.id} {...billboard} />
//                ))
//             ) : (
//                <p className="text-center text-gray-600 col-span-full">No billboards found.</p>
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
   image: string; // assume this is a URL or file path from PocketBase
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
               placeholder="Search by name, location, or price..."
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
