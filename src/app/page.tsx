import { Background } from "@/components/background";
import { Cases } from "@/components/cases";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Repositories } from "@/components/repositories";
import { Skills } from "@/components/skills";
import { profile, sections, type Section } from "@/lib/profile";

function renderSection(section: Section) {
  switch (section.kind) {
    case "hero":
      return <Hero key={section.id} section={section} profile={profile} />;
    case "projects":
      return <Cases key={section.id} section={section} />;
    case "repositories":
      return <Repositories key={section.id} section={section} />;
    case "experience":
      return <Experience key={section.id} section={section} />;
    case "skills":
      return <Skills key={section.id} section={section} />;
    case "background":
      return <Background key={section.id} section={section} />;
    case "contact":
      return <Contact key={section.id} section={section} profile={profile} />;
    default: {
      const unknown: never = section;
      return unknown;
    }
  }
}

export default function Home() {
  return <>{sections.map((section) => renderSection(section))}</>;
}
