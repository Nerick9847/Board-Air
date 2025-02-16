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
                  We Are <span className="text-[#de3636]">ADSPOT NEPAL</span>
               </h2>
            </div>

            <div className="space-y-6">
               <p className="font-light leading-relaxed">
                  Experience the pulsating energy of Club Turtle, the ultimate
                  nightlife destination in the heart of Thamel, Kathmandu. With
                  a vibrant atmosphere that invites you to dance, dine, and
                  indulge, Club Turtle is where unforgettable memories are made.
                  Enjoy eclectic music, tantalizing cuisine, and a welcoming
                  ambiance that celebrates diversity and connection. Whether
                  you're here to party until dawn or unwind with friends, Club
                  Turtle embodies the spirit of celebration and excitement,
                  ensuring every night is a spectacular adventure. Join us and
                  let the night ignite your passions!
               </p>
             
            </div>
         </div>
      </section>
   );
}
