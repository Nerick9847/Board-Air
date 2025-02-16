export default function Hero() {
   return (
      <section className="relative h-screen">
         <div className="absolute inset-0">
            <img
               src="/intro.webp"
               alt="image"
               className="w-full h-full object-cover"
            />
         </div>

         <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <span className="text-sm uppercase tracking-widest mb-4">
               clubturtle
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 uppercase font-bold font-vanguard">
               Experience the Thrill,
               <br />
               Embrace the Chill
            </h1>

            <p className="text-sm md:text-base max-w-xl mx-auto font-light opacity-80">
               Experience the pulsating energy of Club Turtle, the ultimate
               nightlife destination in the heart of Thamel, Kathmandu. With a
               vibrant atmosphere that invites you to dance, dine, and indulge,
               Club Turtle is where unforgettable memories are made.
            </p>
         </div>
      </section>
   );
}
