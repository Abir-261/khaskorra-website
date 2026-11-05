import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { About } from "@/components/site/about";
import { Programs } from "@/components/site/programs";
import { Gallery } from "@/components/site/gallery";
import { Donate } from "@/components/site/donate";
import { Transparency } from "@/components/site/transparency";
import { Volunteer } from "@/components/site/volunteer";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <About />
        <Programs />
        <Gallery />
        <Donate />
        <Transparency />
        <Volunteer />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
