import Hero from "@/components/Hero";
import About from "@/components/About";
import { CarouselDemo } from "@/components/Carousel";
import FAQ from "@/components/FAQ";
import { World } from "@/components/World";
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
            <CarouselDemo />
            <World />
            <FAQ />
    </main>
   
  );
}
