import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Youtube, Map } from "lucide-react";

const Footer = () => {
   return (
      <footer className="w-full min-h-full bg-black text-white px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">
         {/* Brand Section */}
         <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block">
               <img
                  src="/royallogo.svg"
                  alt="niwas solutions logo"
                  className="w-[150px] max-w-full"
               />
            </Link>
            <p className="text-[white] leading-relaxed m-0">
               At Royal Cafe Station, we believe that great food and cherished
               moments go hand in hand. Nestled in the vibrant heart of
               Kathmandu, our open family restaurant is a place where people of
               all ages come together to enjoy delicious meals,
            </p>
         </div>

         {/* Useful Links Section */}
         <div className="flex flex-col gap-6">
            <h4 className="text-5xl uppercase font-vanguard m-0 text-[#d3be92]">
               Sitemap
            </h4>
            <ul className="flex flex-col gap-4 p-0 m-0 list-none w-full">
               {["Home", "Our Menu", "About Us", "Take Away"].map((link) => (
                  <li key={link} className="w-full font-sans">
                     <Link
                        href="/"
                        className="text-[white] no-underline inline-block hover:text-[#d3be92]"
                     >
                        {link}
                     </Link>
                  </li>
               ))}
            </ul>
         </div>

         {/* Popular Holidays Section */}
         <div className="flex flex-col gap-6">
            <h4 className="text-5xl font-vanguard uppercase text-[#d3be92] m-0">
               Popular Foods
            </h4>
            <ul className="flex flex-col gap-4 p-0 m-0 list-none w-full">
               {[
                  "Royal Set",
                  "Royal Platters",
                  "Hakka Noodles",
                  "Ramen Noodles ",
                  "Fire Wings",
               ].map((holiday) => (
                  <li key={holiday} className="w-full font-sans">
                     <Link
                        href="/"
                        className="text-[white] no-underline inline-block hover:text-[#d3be92]"
                     >
                        {holiday}
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
      </footer>
   );
};

export default Footer;
