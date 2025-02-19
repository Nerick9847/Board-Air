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
               Board Air
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-7xl mb-6 uppercase font-bold font-vanguard">
               Take Your Ads
               <br />
               To New Height
            </h1>

            <p className="text-sm md:text-base max-w-xl mx-auto font-light opacity-80">
               Welcome to Board Air, your go-to platform for effortless billboard booking.
               Discover and reserve outdoor advertising spaces across Nepal, 
               showcase your brand with impactful visuals, and take your advertising to new 
               heights with just few clicks!
            </p>
         </div>
      </section>
   );
}
