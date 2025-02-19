"use client";
import DateSelection from "@/components/DateSelection";
import { redirect } from "next/navigation";

export default function DateSelectionPage() {
   const handlePrevious = () => {
      redirect("/service/billboard");
   };

   const handleContinue = () => {
      redirect("/service/billboard/payment");
   };

   return (
      <main className="min-h-screen bg-gray-50 py-8">
         <DateSelection
            onPrevious={handlePrevious}
            onContinue={handleContinue}
         />
      </main>
   );
}
