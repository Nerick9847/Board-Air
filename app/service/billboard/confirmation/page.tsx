"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";

const Confirmation = () => {
  return (
    <div className="max-w-md mx-auto p-6 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full overflow-hidden rounded-xl shadow-lg text-center">
        <div className="bg-green-800 p-8 text-white">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16" />
          </div>
          <h2 className="text-2xl font-bold">Payment Successful!</h2>
          <p className="mt-2 text-green-100">Your billboard booking has been confirmed</p>
        </div>
        
        <div className="p-8 space-y-6">
          <p className="text-gray-700">
            Thank you for your booking. We've sent a confirmation email with all the details.
          </p>
          
          <div className="grid gap-4 grid-cols-2 pt-4">
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full flex items-center justify-center py-5 border-gray-300 hover:bg-gray-50">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            
            <Link href="/dashboard" className="w-full">
              <Button className="w-full flex items-center justify-center py-5 bg-green-700 hover:bg-green-800 text-white">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Confirmation;