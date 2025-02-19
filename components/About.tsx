import Link from "next/link";

export default function About() {
   return (
      <section className="container mx-auto py-16 px-4 ">
         <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-8 lg:mb-0">
               {/* <span className="block text-lg mb-4">
                  Experience the Thrill, Embrace the Chill
               </span> */}

               <h2 className="text-5xl lg:text-8xl uppercase font-bold mb-6  font-vanguard">
                  We Are <span className="text-[#de3636]">Board Air</span>
               </h2>
            </div>

            <div className="space-y-6">
               <p className="font-light leading-relaxed">
                  With a user-friendly interface, you can explore available advertising spots, view detailed location information, 
                  and select the perfect billboard for your campaign. Once you've chosen a spot, easily upload your ad's photo or video 
                  to showcase your brand's message. Our platform features a convenient calendar to help you choose your advertising dates,
                  along with automated invoice generation and a secure payment system. Whether you're a small business or a large enterprise, 
                  Board Air provides transparency, efficiency, and ease in your advertising journey.
               </p>
             
            </div>
         </div>
      </section>
   );
}
