import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import type { BackgroundSection } from "@/lib/profile";

type BackgroundProps = {
  section: BackgroundSection;
};

export function Background({ section }: BackgroundProps) {
  return (
    <section id={section.id} className="border-t border-line">
      <Container className="py-20 md:py-28">
        <SectionHeading index={section.index} title={section.title} />
        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <ul className="space-y-8">
            {section.education.map((item) => (
              <li key={item.place} data-reveal>
                <p className="font-serif text-3xl tracking-tight">{item.place}</p>
                <p className="mt-2 leading-relaxed text-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {section.studiesTitle}
            </h3>
            <ul className="mt-6 space-y-8">
              {section.studies.map((item) => (
                <li key={item.place} data-reveal>
                  <p className="font-serif text-3xl tracking-tight">{item.place}</p>
                  <p className="mt-2 leading-relaxed text-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
