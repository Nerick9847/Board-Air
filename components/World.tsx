"use client";
import WorldMap from "../components/ui/world-map";
import { motion } from "motion/react";

export function World() {
   return (
      <div className=" py-40 dark:bg-black bg-white w-full">
         <div className="max-w-7xl mx-auto text-center">
            <h3 className="font-vanguard text-4xl md:text-4xl dark:text-white text-black">
               Digital billboard Ad with Board Air
               {/* <span className="text-neutral-400">
                  {"AdSpotNepal".split("").map((word, idx) => (
                     <motion.span
                        key={idx}
                        className="inline-block"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.04 }}
                     >
                        {word}
                     </motion.span>
                  ))}
               </span> */}
            </h3>
            <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
               Experience outdoor advertising made simple. Let your brand take flight with Board Air!
            </p>
         </div>
         <WorldMap
           dots={[
            {
               start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
               end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
            },
            {
               start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
               end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            },
            {
               start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
               end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
            },
            {
               start: { lat: 51.5074, lng: -0.1278 }, // London
               end: { lat: 27.7172, lng: 85.3240 }, // Kathmandu
            },
            {
               start: { lat: 27.7172, lng: 85.3240 }, // Kathmandu
               end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
            },
            {
               start: { lat: 27.7172, lng: 85.3240 }, // Kathmandu
               end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
            },
         ]}
         
         />
      </div>
   );
}
