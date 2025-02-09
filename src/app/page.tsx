import Hero from "./components/hero"
import Gallery from "./components/gallery"
import Portfolio from "./components/portfolio"
import Footer from "./components/footer"
import HeroGeometric from "@/components/kokonutui/hero-geometric"
import Faq02 from "@/components/kokonutui/faq-02"
export default function Page() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Hero />
            <Portfolio />
            <HeroGeometric />
            <Gallery />
            <Faq02 />
            <Footer />
        </main>
    )
}
