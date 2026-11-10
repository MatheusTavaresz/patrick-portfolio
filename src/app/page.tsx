import { Background } from "@/components/background";
import { Cases } from "@/components/cases";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <>
      <Hero />
      <Cases />
      <Experience />
      <Skills />
      <Background />
      <Contact />
    </>
  );
}
