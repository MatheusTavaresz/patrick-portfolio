import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { cases } from "@/lib/profile";

export function Cases() {
  return (
    <section id="trabalho">
      <Container className="py-20 md:py-28">
        <SectionHeading
          index="01"
          title="Trabalho"
          lede="Três entregas em que o sistema assumiu trabalho manual, arquivo solto ou serviço cobrado por uso."
        />
        <div className="mt-14 border-b border-line">
          {cases.map((item) => (
            <article
              key={item.id}
              className="grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-10 md:py-14"
            >
              <div className="md:col-span-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {item.index}
                </p>
                <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-muted">
                  {item.tools.join(" · ")}
                </p>
              </div>
              <div className="md:col-span-8">
                <h3 className="font-serif text-3xl tracking-tight text-balance md:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed">{item.problem}</p>
                <p className="mt-3 leading-relaxed text-muted">{item.approach}</p>
                <div className="mt-6 border-l-2 border-accent pl-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                    Resultado
                  </p>
                  <p className="mt-2 leading-relaxed">{item.result}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
