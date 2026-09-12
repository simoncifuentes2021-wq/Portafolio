import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Stack } from "@/components/sections/Stack";
import { ProjectObservatory } from "@/components/interactive/ProjectObservatory";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <ProjectObservatory />
      <Projects />
      <About />
      <Stack />
      <Services />
      <Contact />
    </main>
  );
}
