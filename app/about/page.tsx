import React from "react";

// Hero Section Component
const HeroSection = () => (
   <section className="relative h-screen overflow-hidden">
     {/* Dark gradient overlay */}
     <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/80 to-transparent z-10"></div>
     
     {/* Background image */}
     <div className="absolute inset-0">
       <img
         src="/about.png"
         alt="Billboard Company"
         className="w-full h-full object-cover"
       />
     </div>
     
     {/* Decorative elements */}
     <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
       <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
       <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl"></div>
     </div>
     
     {/* Content container */}
     <div className="relative z-20 h-full flex flex-col items-start justify-center max-w-7xl mx-auto px-8">
       
       <div className="max-w-3xl">
         <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight tracking-tight">
           <span className="block">Transforming</span> 
           <span className="relative inline-block">
             Traditional 
           </span> 
           <span className="block">Billboard System</span>
         </h1>
         
         <p className="text-xl md:text-2xl text-gray-200 mt-6 max-w-2xl">
           Revolutionizing billboard booking through innovation and creativity.
         </p>
       </div>
     </div>
     
     {/* Scroll indicator */}
     <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
       <span className="text-white/80 text-sm mb-2">Scroll to explore</span>
       <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2">
         <div className="w-1 h-2 bg-white/80 rounded-full animate-bounce"></div>
       </div>
     </div>
   </section>
 );
 

// Mission Section Component
const MissionSection = () => (
   <section className="py-24 bg-white">
     <div className="max-w-7xl mx-auto px-4">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
         <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-2xl">
           <img
             src="/mission.png"
             alt="Our Mission"
             className="absolute inset-0 h-full w-full object-cover object-top"
           />
         </div>
         <div>
           <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
           <p className="text-xl text-gray-600 mb-8">
             At Board Air, our mission is to bridge the gap between billboard owners and advertisers in Nepal,
             creating a seamless and efficient booking experience. We provide billboard owners with a transparent and
             easy-to-manage platform to showcase their advertising spaces, while enabling advertisers to access prime
             digital billboard placements with ease. Our goal is to empower both parties with a reliable system that
             ensures maximum visibility, efficiency, and growth in the fast-paced world of outdoor advertising.
           </p>
           <div className="grid grid-cols-2 gap-8">
             <div>
               <h3 className="text-3xl font-bold text-red-600 mb-2">
                 9
               </h3>
               <p className="text-gray-600">Billboard Locations</p>
             </div>
             <div>
               <h3 className="text-3xl font-bold text-red-600 mb-2">
                 50+
               </h3>
               <p className="text-gray-600">Happy Clients</p>
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>
 );
 

// Values Section Component
const ValuesSection = () => (
   <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
         <h2 className="text-4xl font-bold text-center mb-16">
            Our Core Values
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
               {
                  title: "Innovation",
                  description:
                     "Pushing the boundaries of outdoor advertising with cutting-edge technology and creative solutions.",
               },
               {
                  title: "Integrity",
                  description:
                     "Building trust through transparency, honesty, and ethical business practices in all our relationships.",
               },
               {
                  title: "Impact",
                  description:
                     "We prioritize building strong, mutually beneficial relationships between billboard owners and advertisers.",
               },
            ].map((value, index) => (
               <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
               </div>
            ))}
         </div>
      </div>
   </section>
);

// Team Section Component
const TeamSection = () => (
   <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
         <h2 className="text-4xl font-bold text-center mb-16">
            Our Leadership Team
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
               {
                  name: "Nerick",
                  role: "Chief Executive Officer",
                  image: "/nerick.png",
               },
               {
                  name: "Nerick",
                  role: "Chief Technology Officer",
                  image: "/nerick.png",
               },
               {
                  name: "Nerick",
                  role: "Creative Director",
                  image: "/nerick.png",
               },
            ].map((member, index) => (
               <div key={index} className="text-center">
                  <img
                     src={member.image}
                     alt={member.name}
                     className="w-48 h-48 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
               </div>
            ))}
         </div>
      </div>
   </section>
);

// Future Vision Section Component
const FutureVisionSection = () => (
   <section className="py-32 bg-gradient-to-b from-black to-gray-900 text-white">
     <div className="max-w-7xl mx-auto px-6">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
         <div className="space-y-8">
           <div className="inline-block">
             <span className="text-sm uppercase tracking-wider text-red-400 font-semibold">Vision</span>
             <div className="h-px w-20 bg-red-400 mt-2"></div>
           </div>
           
           <h2 className="text-4xl lg:text-5xl font-bold">
             Looking to the Future
           </h2>
           
           <p className="text-lg text-gray-300 leading-relaxed">
             As we look ahead, we're committed to pioneering new
             technologies and sustainable practices that will shape the
             future of outdoor advertising. Our vision extends beyond
             traditional billboards to create immersive experiences that
             connect brands with their audiences in meaningful ways.
           </p>
         </div>
         
         <div className="relative group">
           <div className="relative overflow-hidden rounded-lg">
             <img
               src="/future.png"
               alt="Future Vision"
               className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
             />
           </div>
         </div>
       </div>
     </div>
   </section>
 );

// Main About Page Component
const AboutPage = () => {
   return (
      <div className="overflow-hidden">
         <HeroSection />
         <MissionSection />
         <ValuesSection />
         <FutureVisionSection />
         <TeamSection />
      </div>
   );
};

export default AboutPage;
