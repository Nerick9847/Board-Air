"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateSelectionProps {
   onPrevious: () => void;
   onContinue: () => void;
}

const DateSelection = ({ onPrevious, onContinue }: DateSelectionProps) => {
   const [selectedDate, setSelectedDate] = useState<string | null>(null);
   const [currentMonth, setCurrentMonth] = useState(new Date(2025, 1)); // February 2025

   const getDaysInMonth = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayOfMonth = new Date(year, month, 1).getDay();

      const days = [];
      for (let i = 0; i < firstDayOfMonth; i++) {
         days.push(null);
      }

      for (let day = 1; day <= daysInMonth; day++) {
         days.push(day);
      }

      return days;
   };

   const formatMonth = (date: Date) => {
      return date.toLocaleString("default", { month: "long", year: "numeric" });
   };

   const isDateDisabled = (day: number) => {
      if (!day) return true;
      const date = new Date(
         currentMonth.getFullYear(),
         currentMonth.getMonth(),
         day
      );
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
   };

   const handleDateClick = (day: number | null) => {
      if (!day || isDateDisabled(day)) return;
      const date = new Date(
         currentMonth.getFullYear(),
         currentMonth.getMonth(),
         day
      );
      setSelectedDate(date.toISOString().split("T")[0]);
   };

   const handlePreviousMonth = () => {
      setCurrentMonth(
         new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
      );
   };

   const handleNextMonth = () => {
      setCurrentMonth(
         new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
      );
   };

   return (
      <div className="max-w-3xl mx-auto p-6">
         <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Step 3: Select a Day</h2>

            <div className="mb-4">
               <p className="text-gray-700">
                  Your picture will play 15 seconds every hour for 24 hours*.
               </p>
               <p className="font-bold mt-2">
                  WE WILL SEND YOU YOUR HOURLY TIME SLOT AT LEAST 1 DAY PRIOR TO
                  YOUR DISPLAY DATE.
               </p>
            </div>

            <div className="mb-8">
               <div className="flex items-center justify-between mb-4">
                  <Button
                     variant="outline"
                     size="icon"
                     onClick={handlePreviousMonth}
                  >
                     <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="text-xl font-bold text-red-600">
                     {formatMonth(currentMonth)}
                  </h3>
                  <Button
                     variant="outline"
                     size="icon"
                     onClick={handleNextMonth}
                  >
                     <ChevronRight className="h-4 w-4" />
                  </Button>
               </div>

               <div className="grid grid-cols-7 gap-2 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                     (day) => (
                        <div
                           key={day}
                           className="text-center text-sm font-medium py-2"
                        >
                           {day}
                        </div>
                     )
                  )}
               </div>

               <div className="grid grid-cols-7 gap-2">
                  {getDaysInMonth(currentMonth).map((day, index) => (
                     <div
                        key={index}
                        className={`
                  p-2 text-center rounded-lg cursor-pointer
                  ${!day ? "invisible" : ""}
                  ${isDateDisabled(day as number) ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"}
                  ${
                     selectedDate ===
                     new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth(),
                        day as number
                     )
                        .toISOString()
                        .split("T")[0]
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : ""
                  }
                `}
                        onClick={() => handleDateClick(day)}
                     >
                        {day}
                     </div>
                  ))}
               </div>
            </div>

            <p className="text-sm text-gray-600 mb-8">
               *We ensure 22 plays per day just in case there is a power
               shortage, otherwise expect your photo to play 1 time per hour
               from midnight to 11pm of your display date.
            </p>

            <div className="flex justify-between">
               <Button variant="outline" onClick={onPrevious}>
                  PREVIOUS
               </Button>
               <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={onContinue}
                  disabled={!selectedDate}
               >
                  CONTINUE TO PAYMENT
               </Button>
            </div>
         </Card>
      </div>
   );
};

export default DateSelection;
