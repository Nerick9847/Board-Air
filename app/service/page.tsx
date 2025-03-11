"use client";

import React, { useState } from "react";
import BillboardCard from "@/components/BillboardCard";

const billboards = [
   { id: 1, name: "Thamel LED Billboard", location: "Thamel, Kathmandu, Nepal", size: "20ft x 10ft", price: 800000, rating: 4.8 },
   { id: 2, name: "Durbarmarg Billboard", location: "Durbarmarg, Kathmandu, Nepal", size: "25ft x 12ft", price: 950000, rating: 4.7 },
   { id: 3, name: "Patan Digital Screen", location: "Patan, Lalitpur, Nepal", size: "15ft x 8ft", price: 700000, rating: 4.6 },
   { id: 4, name: "New Road LED Billboard", location: "New Road, Kathmandu, Nepal", size: "30ft x 15ft", price: 1000000, rating: 4.9 },
   { id: 5, name: "Baneshwor Digital Board", location: "Baneshwor, Kathmandu, Nepal", size: "22ft x 11ft", price: 850000, rating: 4.5 },
   { id: 6, name: "Pokhara Lakeside Board", location: "Lakeside, Pokhara, Nepal", size: "18ft x 9ft", price: 750000, rating: 4.7 },
];

export default function Service() {
   const [searchQuery, setSearchQuery] = useState("");
   const [filteredBillboards, setFilteredBillboards] = useState(billboards);

   // Handle Search
   const handleSearch = () => {
      const results = billboards.filter((billboard) =>
         `${billboard.name} ${billboard.location} ${billboard.price}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredBillboards(results);
   };

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
            <button
               onClick={handleSearch}
               className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all"
            >
               Search
            </button>
         </div>

         {/* Billboard Grid */}
         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredBillboards.length > 0 ? (
               filteredBillboards.map((billboard) => (
                  <BillboardCard key={billboard.id} {...billboard} />
               ))
            ) : (
               <p className="text-center text-gray-600 col-span-full">No billboards found.</p>
            )}
         </div>
      </main>
   );
}
