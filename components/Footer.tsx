import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, LayoutDashboard, Info, Home } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full min-h-full bg-black text-white px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">
      {/* Brand Section */}
      <div className="flex flex-col gap-6">
        <Link href="/" className="inline-block">
          <div className="text-2xl font-bold text-white">
            <span className="text-[#d3be92]">BOARD</span> AIR
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
        <h4 className="text-3xl md:text-4xl uppercase font-bold m-0 text-[#d3be92]">
          Sitemap
        </h4>
        <ul className="flex flex-col gap-4 p-0 m-0 list-none w-full">
          {[
            { name: "Home", icon: <Home size={16} /> },
            { name: "Browse", icon: <LayoutDashboard size={16} /> },
            { name: "About Us", icon: <Info size={16} /> },
            { name: "View Map", icon: <MapPin size={16} /> }
          ].map((link) => (
            <li key={link.name} className="w-full">
              <Link
                href="/"
                className="text-white no-underline flex items-center gap-2 hover:text-[#d3be92] transition-colors duration-300"
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Us Section */}
      <div className="flex flex-col gap-6">
        <h4 className="text-3xl md:text-4xl uppercase font-bold text-[#d3be92] m-0">
          Contact Us
        </h4>
        <ul className="flex flex-col gap-4 p-0 m-0 list-none w-full">
          <li className="w-full">
            <Link 
              href="https://instagram.com" 
              target="_blank" 
              className="text-white no-underline flex items-center gap-3 hover:text-[#d3be92] transition-colors duration-300"
            >
              <Instagram size={20} className="text-white" />
              <span>Instagram</span>
            </Link>
          </li>
          <li className="w-full">
            <Link 
              href="https://facebook.com" 
              target="_blank" 
              className="text-white no-underline flex items-center gap-3 hover:text-[#d3be92] transition-colors duration-300"
            >
              <Facebook size={20} className="text-white" />
              <span>Facebook</span>
            </Link>
          </li>
          <li className="w-full">
            <Link 
              href="https://linkedin.com" 
              target="_blank" 
              className="text-white no-underline flex items-center gap-3 hover:text-[#d3be92] transition-colors duration-300"
            >
              <Linkedin size={20} className="text-white" />
              <span>LinkedIn</span>
            </Link>
          </li>
          <li className="w-full">
            <Link 
              href="mailto:contact@boardair.com" 
              className="text-white no-underline flex items-center gap-3 hover:text-[#d3be92] transition-colors duration-300"
            >
              <Mail size={20} className="text-white" />
              <span>Email Us</span>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;