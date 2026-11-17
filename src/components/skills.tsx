import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import type { SkillsSection } from "@/lib/profile";

type SkillsProps = {
  section: SkillsSection;
};

export function Skills({ section }: SkillsProps) {
  const [areaLabel, toolsLabel] = section.columns;

  return (
    <section id={section.id} className="border-t border-line">
      <Container className="py-20 md:py-28">
        <SectionHeading index={section.index} title={section.title} />
        <div className="mt-14 border-y border-line">
          <div className="hidden grid-cols-12 gap-8 border-b border-line py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-accent md:grid">
            <p className="col-span-4">{areaLabel}</p>
            <p className="col-span-8">{toolsLabel}</p>
          </div>
          {section.groups.map((group) => (
            <div
              key={group.area}
              data-reveal
              className="grid gap-2 border-b border-line py-6 last:border-b-0 md:grid-cols-12 md:gap-8 md:py-5"
            >
              <h3 className="font-serif text-2xl tracking-tight md:col-span-4">
                {group.area}
              </h3>
              <p className="leading-relaxed text-muted md:col-span-8">
                {group.tools}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
