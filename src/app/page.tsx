import Hero from "./components/hero";
import Gallery from "./components/gallery";
import Portfolio from "./components/portfolio";
import Footer from "./components/footer";
import HeroGeometric from "@/components/kokonutui/hero-geometric";
import Faq02 from "@/components/kokonutui/faq-02";

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section id="hero">
        <Hero />
      </section>
      <section id="portfolio">
        <Portfolio />
      </section>
      <section id="hero-geometric">
        <HeroGeometric />
      </section>
      <section id="gallery">
        <Gallery />
      </section>
      <section id="faq">
        <Faq02 />
      </section>
      <section id="contact">
        <Footer />
      </section>
    </main>
  );
}
