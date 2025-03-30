"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import PocketBase from "pocketbase";

// Initialize PocketBase client
const pb = new PocketBase("http://127.0.0.1:8090");

export default function BillboardOwnerSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    profile: null as File | null,
    profilePreview: "", // For real-time image preview
    role: "Billboard Owner", // Default role
  });
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input changes for text fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes for profile image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        profile: file,
        profilePreview: URL.createObjectURL(file), // Generate preview URL
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate minimum requirements before submission
      if (formData.name.length < 3) {
        alert("Name must be at least 3 characters long.");
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        alert("Password must be at least 6 characters long.");
        setLoading(false);
        return;
      }

      // Create FormData object for submission
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone_number", formData.phone_number);
      data.append("password", formData.password);
      data.append("role", formData.role);

      if (formData.profile) {
        data.append("profile", formData.profile); // Append profile image if available
      }

      console.log("Submitting Form Data:", Object.fromEntries(data.entries())); // Debugging

      // Create record in PocketBase collection
      const record = await pb.collection("BillboardOwner").create(data);
      console.log("Record created successfully:", record);
      alert("Registration successful!");

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone_number: "",
        password: "",
        profile: null,
        profilePreview: "",
        role: "Billboard Owner",
      });
    } catch (error) {
      console.error("Error creating record:", error);

      // Display error message to user
      if (error instanceof Error) {
        alert(`Registration failed: ${error.message}`);
      } else {
        alert("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-[450px] p-8 shadow-xl rounded-xl bg-white border-t-4 border-blue-600">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Billboard Owner Signup</h2>
          <form onSubmit={handleSubmit}>
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center gap-3 mb-4">
              <Label className="text-sm font-medium text-gray-700">Profile Image</Label>
              <label className="w-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-all">
                <Upload size={20} className="text-gray-500" />
                <span className="ml-2 text-gray-500 text-sm">Upload Image</span>
                <Input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
              {/* Real-time Image Preview */}
              {formData.profilePreview && (
                <div className="mt-3 w-[100px] h-[100px] rounded-full overflow-hidden border border-gray-300">
                  <img src={formData.profilePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Text Inputs */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Name</Label>
                <Input type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Email</Label>
                <Input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                <Input type="text" name="phone_number" placeholder="Enter phone number" value={formData.phone_number} onChange={handleInputChange} required />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Password</Label>
                <Input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleInputChange} required />
              </div>
            </div>

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-6">
              <Button 
                type="submit" 
                className={`w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 rounded-lg shadow-md transition-all duration-300 text-base ${loading ? "opacity-70 cursor-not-allowed" : ""}`} 
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)} 
                disabled={loading}
              >
                {loading ? "Registering..." : isHovered ? "Let's Go!" : "Register"}
              </Button>
            </motion.div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
