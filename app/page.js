import Hero from "./_components/Hero";
import DemoSection from "./_components/DemoSection";
import Reviews from "./_components/Reviews";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="px-4 md:px-10 w-full mx-auto">
        <Hero />
        <DemoSection />
        <Reviews />
        <Footer />
      </div>
    </div>
  );
}
