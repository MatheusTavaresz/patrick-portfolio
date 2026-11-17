import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import type { ExperienceSection } from "@/lib/profile";

type ExperienceProps = {
  section: ExperienceSection;
};

export function Experience({ section }: ExperienceProps) {
  return (
    <section id={section.id} className="border-t border-line">
      <Container className="py-20 md:py-28">
        <SectionHeading index={section.index} title={section.title} />
        <div className="mt-14 border-b border-line">
          {section.items.map((role) => (
            <article
              key={role.id}
              data-reveal
              className="grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-10 md:py-14"
            >
              <div className="md:col-span-4">
                <h3 className="font-serif text-3xl tracking-tight md:text-4xl">
                  {role.company}
                </h3>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  {role.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {role.period}
                </p>
              </div>
              <ul className="space-y-3 md:col-span-8">
                {role.points.map((point) => (
                  <li
                    key={point}
                    className="border-l border-line pl-4 leading-relaxed text-muted"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
