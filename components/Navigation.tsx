

// import React from "react";
// import { Button } from "@/components/ui/button";
// import {
//    DropdownMenu,
//    DropdownMenuContent,
//    DropdownMenuItem,
//    DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Menu, ChevronDown } from "lucide-react";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import AuthModal from "./auth/AuthModal";
// import Link from "next/link";


// const Navigation = () => {
//    return (
//       <nav className="border-b">
//          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between h-16">
//                {/* Logo */}
//                <div className="flex-shrink-0">
//                   <span className="text-xl font-bold">BoardAir</span>
//                </div>

//                {/* Desktop Navigation */}
//                <div className="hidden md:flex items-center space-x-8">
//                   <DropdownMenu>
//                      <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="flex items-center">
//                            Browse Billboards{" "}
//                            <ChevronDown className="ml-2 h-4 w-4" />
//                         </Button>
//                      </DropdownMenuTrigger>
//                      <DropdownMenuContent>
//                         <DropdownMenuItem>Digital Billboards</DropdownMenuItem>
//                         <DropdownMenuItem>Static Billboards</DropdownMenuItem>
//                         <DropdownMenuItem>Premium Locations</DropdownMenuItem>
//                      </DropdownMenuContent>
//                   </DropdownMenu>

//                   <DropdownMenu>
//                      <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="flex items-center">
//                            Resources <ChevronDown className="ml-2 h-4 w-4" />
//                         </Button>
//                      </DropdownMenuTrigger>
//                      <DropdownMenuContent>
//                         <DropdownMenuItem>Help Center</DropdownMenuItem>
//                         <DropdownMenuItem>Blog</DropdownMenuItem>
//                         <DropdownMenuItem>Case Studies</DropdownMenuItem>
//                      </DropdownMenuContent>
//                   </DropdownMenu>

//                   <DropdownMenu>
//                      <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="flex items-center">
//                            About Us <ChevronDown className="ml-2 h-4 w-4" />
//                         </Button>
//                      </DropdownMenuTrigger>
//                      <DropdownMenuContent>
//                         <DropdownMenuItem>Our Story</DropdownMenuItem>
//                         <DropdownMenuItem>Team</DropdownMenuItem>
//                         <DropdownMenuItem>Careers</DropdownMenuItem>
//                      </DropdownMenuContent>
//                   </DropdownMenu>

//                   <Button variant="ghost">Contact Us</Button>
//                </div>

//                {/* Action Buttons */}
//                <div className="hidden md:flex items-center space-x-4">
//                   <AuthModal />
//                   <Link
//                      href="/auth/login"
//                      className="bg-red-500 hover:bg-red-600 text-white p-[0.5rem]"
//                   >
//                      For BillBoard Owner{" "}
//                   </Link>
//                </div>

//                {/* Mobile Menu Button */}
//                <div className="md:hidden">
//                   <Sheet>
//                      <SheetTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                            <Menu className="h-6 w-6" />
//                         </Button>
//                      </SheetTrigger>
//                      <SheetContent side="right" className="w-[300px]">
//                         <div className="flex flex-col space-y-4 mt-8">
//                            <Button variant="ghost" className="justify-start">
//                               Browse Billboards
//                            </Button>
//                            <Button variant="ghost" className="justify-start">
//                               Resources
//                            </Button>
//                            <Button variant="ghost" className="justify-start">
//                               About Us
//                            </Button>
//                            <Button variant="ghost" className="justify-start">
//                               Contact Us
//                            </Button>
//                            <hr className="my-4" />
//                            {/* <Button
//                               variant="ghost"
//                               className="justify-start text-red-500 hover:text-red-600"
//                            >
//                               Sign in
//                            </Button> */}
//                            <AuthModal />
//                            <Button className="bg-red-500 hover:bg-red-600 text-white">
//                               Start for free
//                            </Button>
//                         </div>
//                      </SheetContent>
//                   </Sheet>
//                </div>
//             </div>
//          </div>
//       </nav>
//    );
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
                     <span className="text-xl font-bold cursor-pointer">
                        Board<span className="text-red-600">AIR</span>
                     </span>
                  </Link>
               </div>

               {/* Desktop Navigation */}
               <div className="hidden md:flex items-center space-x-8">
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center">
                           Browse Billboards{" "}
                           <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent>
                        <DropdownMenuItem>Digital Billboards</DropdownMenuItem>
                        <DropdownMenuItem>Static Billboards</DropdownMenuItem>
                        <DropdownMenuItem>Premium Locations</DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center">
                           Resources <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent>
                        <DropdownMenuItem>Help Center</DropdownMenuItem>
                        <DropdownMenuItem>Blog</DropdownMenuItem>
                        <DropdownMenuItem>Case Studies</DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center">
                           About Us <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent>
                        <DropdownMenuItem>Our Story</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Careers</DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>

                  <Button variant="ghost">Contact Us</Button>
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
                              <DropdownMenuItem asChild>
                                 <Link href="/profile" className="w-full">
                                    Profile
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
                     <AuthModal />
                  )}
                  <Link
                     href="/auth/login"
                     className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                  >
                     For Billboard Owner
                  </Link>
               </div>

               {/* Mobile Menu Button */}
               <div className="md:hidden">
                  <Sheet>
                     <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                           <Menu className="h-6 w-6" />
                        </Button>
                     </SheetTrigger>
                     <SheetContent side="right" className="w-[300px]">
                        <div className="flex flex-col space-y-4 mt-8">
                           <Button variant="ghost" className="justify-start">
                              Browse Billboards
                           </Button>
                           <Button variant="ghost" className="justify-start">
                              Resources
                           </Button>
                           <Button variant="ghost" className="justify-start">
                              About Us
                           </Button>
                           <Button variant="ghost" className="justify-start">
                              Contact Us
                           </Button>
                           <hr className="my-4" />

                           {status === "loading" ? (
                              <Button
                                 variant="ghost"
                                 disabled
                                 className="justify-start"
                              >
                                 Loading...
                              </Button>
                           ) : isAuthenticated ? (
                              <>
                                 <div className="px-2 py-2 text-sm font-medium">
                                    Signed in as{" "}
                                    {session?.user?.name ||
                                       session?.user?.email}
                                 </div>
                                 <Button
                                    variant="ghost"
                                    className="justify-start w-full"
                                    asChild
                                 >
                                    <Link href="/dashboard">Dashboard</Link>
                                 </Button>
                                 <Button
                                    variant="ghost"
                                    className="justify-start w-full"
                                    asChild
                                 >
                                    <Link href="/profile">Profile</Link>
                                 </Button>
                                 <Button
                                    variant="ghost"
                                    className="justify-start text-red-500 hover:text-red-600 w-full"
                                    onClick={handleLogout}
                                 >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                 </Button>
                              </>
                           ) : (
                              <>
                                 <AuthModal />
                                 <Link href="/auth/login">
                                    <Button className="bg-red-500 hover:bg-red-600 text-white w-full">
                                       For Billboard Owner
                                    </Button>
                                 </Link>
                              </>
                           )}
                        </div>
                     </SheetContent>
                  </Sheet>
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Navigation;
