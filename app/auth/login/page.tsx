"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, User, Building } from "lucide-react";

export default function LoginPage() {
  const [role, setRole] = useState("billboard_owner");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const roles = [
    { id: "billboard_owner", name: "Billboard Owner", icon: Building },
    { id: "advertiser", name: "Advertiser", icon: User },
  ];

  const getRoleLabel = () => roles.find((r) => r.id === role)?.name || "Choose Role";

  const getRoleIcon = () => {
    const Icon = roles.find((r) => r.id === role)?.icon;
    return Icon ? <Icon size={18} /> : null;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-[450px] p-10 shadow-xl rounded-xl bg-white border-t-4 border-blue-600">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-800 font-bold text-xl">LOGO</span>
            </div>
          </div>

          <motion.h2 className="text-2xl font-bold text-center mb-8 text-blue-800" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
            Welcome Back
          </motion.h2>

          <div className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Select Role</Label>
              <div className="relative">
                <motion.button
                  className={`w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2.5 text-left flex items-center justify-between ${
                    isDropdownOpen ? "ring-2 ring-blue-600 border-blue-600" : "hover:border-blue-400"
                  } transition-all duration-200`}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="flex items-center gap-2 text-gray-700">
                    {getRoleIcon()}
                    <span>{getRoleLabel()}</span>
                  </div>
                  <motion.div initial={false} animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={18} className="text-gray-500" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1 overflow-hidden" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.15 }}>
                      {roles.map((roleOption) => {
                        const Icon = roleOption.icon;
                        return (
                          <motion.div
                            key={roleOption.id}
                            className={`px-4 py-2 flex items-center gap-2 cursor-pointer ${
                              role === roleOption.id ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
                            }`}
                            whileHover={{ backgroundColor: role === roleOption.id ? "#eff6ff" : "#f9fafb" }}
                            onClick={() => {
                              setRole(roleOption.id);
                              setIsDropdownOpen(false);
                            }}
                          >
                            <Icon size={18} className={role === roleOption.id ? "text-blue-600" : "text-gray-500"} />
                            <span>{roleOption.name}</span>
                            {role === roleOption.id && <motion.div className="ml-auto w-2 h-2 rounded-full bg-blue-600" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }} />}
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Username</Label>
              <Input type="text" name="username" placeholder="Enter your username" className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 py-2" value={credentials.username} onChange={handleInputChange} />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Password</Label>
              <Input type="password" name="password" placeholder="Enter your password" className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 py-2" value={credentials.password} onChange={handleInputChange} />
            </div>

            {/* Login Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-8">
              <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 rounded-lg shadow-md transition-all duration-300 text-base" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                {isHovered ? "Let's Go!" : "Login"}
              </Button>
            </motion.div>

            {/* Register Link */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <motion.span className="text-blue-700 font-medium cursor-pointer hover:text-blue-900 hover:underline transition-colors duration-200" whileHover={{ scale: 1.05 }} onClick={() => router.push("/registration")}>
                  Register
                </motion.span>
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
