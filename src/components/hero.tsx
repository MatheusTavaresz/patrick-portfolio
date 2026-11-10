import { Container } from "@/components/container";
import { VantaGlobe } from "@/components/vanta-globe";
import { highlights, profile } from "@/lib/profile";

export function Hero() {
  return (
    <section id="topo" className="border-b border-line">
      <Container className="py-16 md:py-24">
        <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <p>Full Stack · Fintech</p>
          <p>{profile.location}</p>
        </div>
        <div className="mt-8 grid items-start gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <h1 className="font-serif text-[clamp(3.4rem,8vw,6.4rem)] leading-[0.88] tracking-[-0.035em]">
              Matheus
              <br />
              Patrick
              <br />
              Tavares
            </h1>
            <p className="mt-8 max-w-xl text-xl leading-relaxed md:text-2xl">
              {profile.lead}
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              {profile.support}
            </p>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {profile.stackLine}
            </p>
          </div>
          <div className="flex flex-col gap-6 md:col-span-5">
            <VantaGlobe />
            <dl className="border border-line">
              {highlights.map((item) => (
                <div
                  key={item.value}
                  className="border-t border-line px-5 py-5 first:border-t-0"
                >
                  <dt className="font-serif text-4xl tracking-tight">
                    {item.value}
                  </dt>
                  <dd className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                    {item.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
