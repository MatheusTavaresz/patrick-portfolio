import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { education, studies } from "@/lib/profile";

export function Background() {
  return (
    <section id="formacao" className="border-t border-line">
      <Container className="py-20 md:py-28">
        <SectionHeading
          index="04"
          title="Formação"
          lede="Graduação em andamento e estudo aplicado ao que o trabalho pede."
        />
        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              Acadêmica
            </h3>
            <ul className="mt-6 space-y-8">
              {education.map((item) => (
                <li key={item.place}>
                  <p className="font-serif text-3xl tracking-tight">
                    {item.place}
                  </p>
                  <p className="mt-2 leading-relaxed text-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              Estudos
            </h3>
            <ul className="mt-6 space-y-8">
              {studies.map((item) => (
                <li key={item.place}>
                  <p className="font-serif text-3xl tracking-tight">
                    {item.place}
                  </p>
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
