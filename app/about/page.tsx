import React from "react";

// Hero Section Component
const HeroSection = () => (
   <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
         <img
            src="/api/placeholder/1920/1080"
            alt="Billboard Company"
            className="w-full h-full object-cover opacity-70"
         />
      </div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
         <h1 className="text-6xl font-bold mb-6">
            Transforming Traditional Billboard System
         </h1>
         <p className="text-xl">
            We will revolutionizing billboard booking
            through innovation and creativity.
         </p>
      </div>
   </section>
);

// Mission Section Component
const MissionSection = () => (
   <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
               <img
                  src="/api/placeholder/600/400"
                  alt="Our Mission"
                  className="rounded-lg shadow-2xl"
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
                     <h3 className="text-3xl font-bold text-blue-600 mb-2">
                        9
                     </h3>
                     <p className="text-gray-600">Billboard Locations</p>
                  </div>
                  <div>
                     <h3 className="text-3xl font-bold text-blue-600 mb-2">
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
                  name: "Sarah Johnson",
                  role: "Chief Executive Officer",
                  image: "/api/placeholder/400/400",
               },
               {
                  name: "Michael Chen",
                  role: "Chief Technology Officer",
                  image: "/api/placeholder/400/400",
               },
               {
                  name: "Emma Williams",
                  role: "Creative Director",
                  image: "/api/placeholder/400/400",
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
   <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
               <h2 className="text-4xl font-bold mb-6">
                  Looking to the Future
               </h2>
               <p className="text-xl mb-8">
                  As we look ahead, we're committed to pioneering new
                  technologies and sustainable practices that will shape the
                  future of outdoor advertising. Our vision extends beyond
                  traditional billboards to create immersive experiences that
                  connect brands with their audiences in meaningful ways.
               </p>
            </div>
            <div>
               <img
                  src="/api/placeholder/600/400"
                  alt="Future Vision"
                  className="rounded-lg shadow-2xl"
               />
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
         <TeamSection />
         <FutureVisionSection />
      </div>
   );
};

export default AboutPage;
