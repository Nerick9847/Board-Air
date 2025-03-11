import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold">
                <span className="text-red-500">Board</span>Air
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation - Simplified with no dropdowns */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/service">
              <Button variant="ghost" className="font-medium">
                Browse Billboards
              </Button>
            </Link>

            <Link href="/map">
              <Button variant="ghost" className="font-medium">
                View Locations
              </Button>
            </Link>

            <Link href="/about">
              <Button variant="ghost" className="font-medium">
                About Us
              </Button>
            </Link>

            <Link href="/contact">
              <Button variant="ghost" className="font-medium">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Action Buttons - simplified to just login */}
          <div className="hidden md:flex items-center">
            <Link href="/login">
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                Login
              </Button>
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
                    View Locations
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    About Us
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Contact Us
                  </Button>
                  <hr className="my-4" />
                  <Link href="/login">
                    <Button className="bg-red-500 hover:bg-red-600 text-white w-full">
                      Login
                    </Button>
                  </Link>
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