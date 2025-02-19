import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Activity } from "lucide-react";

const BillboardCard = () => {
   return (
      <Card className="max-w-md overflow-hidden bg-white rounded-lg shadow-lg">
         {/* Top Badge */}
         <div className="relative">
            <Badge className="absolute top-4 left-4 bg-navy-900 text-white">
               Best Selling
            </Badge>

            {/* Main Image */}
            <img
               src="https://hoardingboardnepal.com/assets/ds-images/ds-baneshwor-new.webp"
               alt="Manaslu Conservation Area"
               className="w-full h-48 object-cover"
            />
         </div>

         <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
               Tripureshwor BillBoard{" "}
            </h2>

            <div className="text-gray-600 mb-4">Tripureshwor | Nepal</div>

            {/* Info Row */}
            <div className="flex items-center gap-6 mb-6 text-gray-600">
               {/* Duration */}
               <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>4 - 5 Days</span>
               </div>

               {/* Difficulty */}
               <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>Moderate</span>
               </div>

               {/* Reviews */}
               <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>5 Review</span>
               </div>
            </div>

            {/* Price Button */}
            <button className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition-colors">
               6 CRORE 50 LAKH
            </button>
         </CardContent>
      </Card>
   );
};

export default BillboardCard;
