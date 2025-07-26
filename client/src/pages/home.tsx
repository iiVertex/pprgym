import Navigation from "@/components/sections/navigation";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Coaches from "@/components/sections/coaches";
import Testimonials from "@/components/sections/testimonials";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="bg-midnight text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <Coaches />
      <Testimonials />
      <Footer />
    </div>
  );
}
