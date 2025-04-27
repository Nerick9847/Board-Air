


// "use client";

// import React, { useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Menu, ChevronDown, LogOut, User } from "lucide-react";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import AuthModal from "./auth/AuthModal";
// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { toast } from "sonner";

// const Navigation = () => {
//   const { data: session, status } = useSession();
//   const isAuthenticated = status === "authenticated";

//   // Debug logging
//   useEffect(() => {
//     console.log("Session status:", status);
//     console.log("Session data:", session);
//   }, [session, status]);

//   const handleLogout = async () => {
//     try {
//       await signOut({ callbackUrl: "/" });
//       toast.success("Logged out successfully");
//     } catch (error) {
//       console.error("Logout error:", error);
//       toast.error("Logout failed. Please try again.");
//     }
//   };

//   return (
//     <nav className="border-b shadow-md bg-white sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link href="/">
//               <span className="text-xl font-black cursor-pointer">
//                 Board<span className="text-red-500 font-black">AIR</span>
//               </span>
//             </Link>
//           </div>
          
//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-10">
//             <a href="/service" className="text-sm font-medium hover:text-red-500 transition-colors duration-200 py-2">
//               Browse Billboards
//             </a>
//             <a href="/map" className="text-sm font-medium hover:text-red-500 transition-colors duration-200 py-2">
//               View Map
//             </a>
//             <a href="/about" className="text-sm font-medium hover:text-red-500 transition-colors duration-200 py-2">
//               About Us
//             </a>
//             <a href="/contact" className="text-sm font-medium hover:text-red-500 transition-colors duration-200 py-2">
//               Contact Us
//             </a>
//           </div>
          
//           {/* Action Buttons */}
//           <div className="hidden md:flex items-center space-x-6">
//             {status === "loading" ? (
//               <Button variant="ghost" disabled className="text-gray-500">
//                 Loading...
//               </Button>
//             ) : isAuthenticated ? (
//               <div className="flex items-center">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       className="flex items-center hover:bg-gray-100"
//                     >
//                       <User className="mr-2 h-4 w-4" />
//                       {session?.user?.name ||
//                         session?.user?.email ||
//                         "Account"}
//                       <ChevronDown className="ml-2 h-4 w-4" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end" className="w-48 shadow-lg rounded-md">
//                     <DropdownMenuItem asChild className="hover:bg-gray-50">
//                       <Link href="/dashboard" className="w-full">
//                         Dashboard
//                       </Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem asChild className="hover:bg-gray-50">
//                       <Link href="/profile" className="w-full">
//                         Profile
//                       </Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem
//                       className="text-red-500 cursor-pointer hover:bg-red-50"
//                       onClick={handleLogout}
//                     >
//                       <LogOut className="mr-2 h-4 w-4" />
//                       Logout
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             ) : (
//               <AuthModal />
//             )}
//             <Link
//               href="/auth/login"
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm"
//             >
//               For Billboard Owner
//             </Link>
//           </div>
          
//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="ghost" className="p-2">
//                   <Menu className="h-5 w-5" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right" className="w-64">
//                 <div className="flex flex-col space-y-4 mt-6">
//                   <Link href="/service" className="text-sm font-medium px-3 py-2 hover:bg-gray-100 rounded-md">
//                     Browse Billboards
//                   </Link>
//                   <Link href="/map" className="text-sm font-medium px-3 py-2 hover:bg-gray-100 rounded-md">
//                     View Map
//                   </Link>
//                   <Link href="/about" className="text-sm font-medium px-3 py-2 hover:bg-gray-100 rounded-md">
//                     About Us
//                   </Link>
//                   <Link href="/contact" className="text-sm font-medium px-3 py-2 hover:bg-gray-100 rounded-md">
//                     Contact Us
//                   </Link>
//                   <div className="pt-4 border-t">
//                     {isAuthenticated ? (
//                       <>
//                         <Link href="/dashboard" className="block px-3 py-2 text-sm font-medium hover:bg-gray-100 rounded-md">
//                           Dashboard
//                         </Link>
//                         <Link href="/profile" className="block px-3 py-2 text-sm font-medium hover:bg-gray-100 rounded-md">
//                           Profile
//                         </Link>
//                         <button
//                           onClick={handleLogout}
//                           className="flex items-center w-full text-left px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-md"
//                         >
//                           <LogOut className="mr-2 h-4 w-4" />
//                           Logout
//                         </button>
//                       </>
//                     ) : (
//                       <div className="px-3">
//                         <AuthModal />
//                       </div>
//                     )}
//                     <div className="mt-4">
//                       <Link
//                         href="/auth/login"
//                         className="block w-full bg-red-500 hover:bg-red-600 text-white text-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
//                       >
//                         For Billboard Owner
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;


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
                                 <Link href="/dashboard" className="w-full">
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
