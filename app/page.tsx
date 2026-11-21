import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Partners } from "@/components/Partners";
import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Blog } from "@/components/Blog";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Partners />
        <About />
        <Process />
        <Services />
        <Blog />
      </main>
      <Footer />
    </>
  );
}
