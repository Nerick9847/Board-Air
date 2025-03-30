"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

export default function AdvertiserSignup() {
  const [formData, setFormData] = useState({ username: "", email: "", phone: "", brand: "", profileImage: null });
  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[450px] p-8 shadow-xl rounded-xl bg-white border-t-4 border-green-600">
          <h2 className="text-2xl font-bold text-center mb-6 text-green-800">Advertiser</h2>
          
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center gap-3 mb-4">
            <Label className="text-sm font-medium text-gray-700">Profile Image</Label>
            <label className="w-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-green-500 transition-all">
              <Upload size={20} className="text-gray-500" />
              <span className="ml-2 text-gray-500 text-sm">Upload Image</span>
              <Input type="file" className="hidden" />
            </label>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Username</Label>
              <Input 
                type="text" 
                name="username"
                placeholder="Enter username" 
                className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all duration-200 py-2"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <Input 
                type="email" 
                name="email"
                placeholder="Enter email" 
                className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all duration-200 py-2"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
              <Input 
                type="text" 
                name="phone"
                placeholder="Enter phone number" 
                className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all duration-200 py-2"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Brand</Label>
              <Input 
                type="text" 
                name="brand"
                placeholder="Enter brand name" 
                className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all duration-200 py-2"
                value={formData.brand}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Register Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6"
          >
            <Button 
              className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 rounded-lg shadow-md transition-all duration-300 text-base"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered ? "Let's Go!" : "Register"}
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}