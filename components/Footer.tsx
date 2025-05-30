import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, LayoutDashboard, Info, Home } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full min-h-full bg-black text-white px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-8">
      {/* Brand Section */}
      <div className="flex flex-col gap-6">
        <Link href="/" className="inline-block">
          <div className="text-2xl font-extrabold text-white">
            <span className="text-red-500 text-3xl font-black">BOARD</span><span className="text-3xl">AIR</span>
          </div>
        </Link>
        <p className="text-white leading-relaxed m-0">
          At Board Air, we connect advertisers with billboard owners, providing
          a seamless platform to book advertising spaces across Nepal. We make it
          easy for businesses to find the right spots and reach their audience effectively,
          while helping billboard owners maximize their potential.
        </p>
        <p className="text-gray-400">© {currentYear} Board Air. All rights reserved.</p>
      </div>

      {/* Sitemap Section */}
      <div className="flex flex-col gap-6">
        <h4 className="text-3xl md:text-4xl font-bold m-0 text-white">
          Navigation
        </h4>
        <ul className="flex flex-col gap-4 p-0 m-0 list-none w-full">
          <li className="w-full">
            <Link
              href="/"
              className="text-white no-underline flex items-center gap-2 hover:text-[#d39292] transition-colors duration-300"
            >
              <Home size={16} />
              <span>Home</span>
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/service"
              className="text-white no-underline flex items-center gap-2 hover:text-[#d39292] transition-colors duration-300"
            >
              <LayoutDashboard size={16} />
              <span>Browse</span>
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/map"
              className="text-white no-underline flex items-center gap-2 hover:text-[#d39292] transition-colors duration-300"
            >
              <MapPin size={16} />
              <span>View Map</span>
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/about"
              className="text-white no-underline flex items-center gap-2 hover:text-[#d39292] transition-colors duration-300"
            >
              <Info size={16} />
              <span>About Us</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact Us Section */}
      <div className="flex flex-col gap-6">
        <h4 className="text-3xl md:text-4xl font-bold text-white m-0">
          Social Media
        </h4>
        <ul className="flex flex-col gap-4 p-0 m-0 list-none w-full">
          <li className="w-full">
            <Link 
              href="https://instagram.com" 
              target="_blank" 
              className="text-white no-underline flex items-center gap-3 hover:text-[#d39292] transition-colors duration-300"
            >
              <Instagram size={20} className="text-white" />
              <span>Instagram</span>
            </Link>
          </li>
          <li className="w-full">
            <Link 
              href="https://facebook.com" 
              target="_blank" 
              className="text-white no-underline flex items-center gap-3 hover:text-[#d39292] transition-colors duration-300"
            >
              <Facebook size={20} className="text-white" />
              <span>Facebook</span>
            </Link>
          </li>
          <li className="w-full">
            <Link 
              href="https://linkedin.com" 
              target="_blank" 
              className="text-white no-underline flex items-center gap-3 hover:text-[#d39292] transition-colors duration-300"
            >
              <Linkedin size={20} className="text-white" />
              <span>LinkedIn</span>
            </Link>
          </li>
          <li className="w-full">
            <Link 
              href="mailto:contact@boardair.com" 
              className="text-white no-underline flex items-center gap-3 hover:text-[#d39292] transition-colors duration-300"
            >
              <Mail size={20} className="text-white" />
              <span>Email Us</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <h4 className="text-3xl md:text-4xl font-bold text-white m-0">
          Useful Links
        </h4>
        <ul className="flex flex-col gap-4 p-0 m-0 list-none w-full">
          <li className="w-full">
            <Link 
              href="/terms" 
              className="text-white no-underline flex items-center gap-3 hover:text-[#d39292] transition-colors duration-300"
            >
              <span>Terms & Conditions</span>
            </Link>
          </li>
          <li className="w-full">
            <Link 
              href="/payment-policies" 
              className="text-white no-underline flex items-center gap-3 hover:text-[#d39292] transition-colors duration-300"
            >
              <span>Payment Policies</span>
            </Link>
          </li>
          <li className="w-full">
            <Link 
              href="/faq" 
              className="text-white no-underline flex items-center gap-3 hover:text-[#d39292] transition-colors duration-300"
            >
              <span>FAQ</span>
            </Link>
          </li>
          <li className="w-full">
            <Link 
              href="/contact" 
              className="text-white no-underline flex items-center gap-3 hover:text-[#d39292] transition-colors duration-300"
            >
              <span>Contact Us</span>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;