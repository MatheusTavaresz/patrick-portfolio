import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { roles } from "@/lib/profile";

export function Experience() {
  return (
    <section id="experiencia" className="border-t border-line">
      <Container className="py-20 md:py-28">
        <SectionHeading
          index="02"
          title="Experiência"
          lede="O ciclo atual é fintech em produção. O anterior foi um contrato para colocar API, interface e coleta no ar."
        />
        <div className="mt-14 border-b border-line">
          {roles.map((role) => (
            <article
              key={role.id}
              className="grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-10 md:py-14"
            >
              <div className="md:col-span-4">
                <h3 className="font-serif text-3xl tracking-tight md:text-4xl">
                  {role.company}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {role.period}
                </p>
                {role.note ? (
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                    {role.note}
                  </p>
                ) : null}
              </div>
              <div className="md:col-span-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {role.title}
                </p>
                <p className="mt-3 text-lg leading-relaxed">{role.summary}</p>
                <ul className="mt-6 space-y-3">
                  {role.points.map((point) => (
                    <li
                      key={point}
                      className="border-l border-line pl-4 leading-relaxed text-muted"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
