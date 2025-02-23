import React from "react";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AuthModal from "./auth/AuthModal";

const Navigation = () => {
   return (
      <nav className="border-b">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
               {/* Logo */}
               <div className="flex-shrink-0">
                  <span className="text-xl font-bold">BoardAir</span>
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
                  <AuthModal />
                  <Button className="bg-red-500 hover:bg-red-600 text-white">
                     For BillBoard Owner{" "}
                  </Button>
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
                           {/* <Button
                              variant="ghost"
                              className="justify-start text-red-500 hover:text-red-600"
                           >
                              Sign in
                           </Button> */}
                           <AuthModal />
                           <Button className="bg-red-500 hover:bg-red-600 text-white">
                              Start for free
                           </Button>
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
