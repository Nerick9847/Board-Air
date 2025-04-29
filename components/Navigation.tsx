"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown, LogOut, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AuthModal from "./auth/AuthModal";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";

const Navigation = () => {
   const { data: session, status } = useSession();
   const isAuthenticated = status === "authenticated";

   // Debug logging
   useEffect(() => {
      console.log("Session status:", status);
      console.log("Session data:", session);
   }, [session, status]);

   const handleLogout = async () => {
      try {
         await signOut({ callbackUrl: "/" });
         toast.success("Logged out successfully");
      } catch (error) {
         console.error("Logout error:", error);
         toast.error("Logout failed. Please try again.");
      }
   };

   return (
      <nav className="border-b">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
               {/* Logo */}
               <div className="flex-shrink-0">
                  <Link href="/">
                     <span className="text-xl font-extrabold cursor-pointer">
                        Board<span className="text-red-600">AIR</span>
                     </span>
                  </Link>
               </div>

               {/* Desktop Navigation */}
               <div className="hidden md:flex items-center space-x-8">
               <Link href="/service">
                  <Button variant="ghost">Browse Billboards</Button>
               </Link>
               
               <Link href="/map">
                  <Button variant="ghost">View Map</Button>
               </Link>
               
               <Link href="/about">
                  <Button variant="ghost">About Us</Button>
               </Link>
               
               <Link href="/contact">
                  <Button variant="ghost">Contact Us</Button>
               </Link>
               </div>

               {/* Action Buttons */}
               <div className="hidden md:flex items-center space-x-4">
                  {status === "loading" ? (
                     <Button variant="ghost" disabled>
                        Loading...
                     </Button>
                  ) : isAuthenticated ? (
                     <div className="flex items-center space-x-4">
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <Button
                                 variant="ghost"
                                 className="flex items-center"
                              >
                                 <User className="mr-2.5 h-4 w-4" />
                                 {session?.user?.name ||
                                    session?.user?.email ||
                                    "Account"}
                              </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                 <Link href="/advertiser/bookings" className="w-full">
                                    Dashboard
                                 </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                 className="text-red-500 cursor-pointer"
                                 onClick={handleLogout}
                              >
                                 <LogOut className="mr-2 h-4 w-4" />
                                 Logout
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                  ) : (
                     <>
                        <AuthModal />
                        <Link
                           href="/auth/login"
                           className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm shadow-sm transition-all"
                        >
                           For Billboard Owner
                        </Link>
                     </>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Navigation;
