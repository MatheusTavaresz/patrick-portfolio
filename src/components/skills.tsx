import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { skillGroups } from "@/lib/profile";

export function Skills() {
  return (
    <section id="stack" className="border-t border-line">
      <Container className="py-20 md:py-28">
        <SectionHeading
          index="03"
          title="Stack"
          lede="O que eu uso para entregar e sustentar sistemas em produção."
        />
        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <li key={group.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-lg leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
