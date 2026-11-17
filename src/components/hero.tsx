import { Container } from "@/components/container";
import { HeroMedia } from "@/components/hero-media";
import type { HeroSection, Profile } from "@/lib/profile";

type HeroProps = {
  section: HeroSection;
  profile: Profile;
};

export function Hero({ section, profile }: HeroProps) {
  return (
    <section
      id={section.id}
      className="relative isolate overflow-hidden border-b border-line bg-background"
    >
      <HeroMedia />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/80 via-background/55 to-background md:bg-gradient-to-r md:from-background/90 md:via-background/55 md:to-background/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />
      <Container className="relative z-10 py-16 md:py-24">
        <div className="flex items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <p>{profile.discipline}</p>
          <p className="shrink-0 text-right">{profile.location}</p>
        </div>
        <h1 className="mt-8 max-w-4xl font-serif text-[clamp(3.4rem,8vw,6.4rem)] leading-[0.88] tracking-[-0.035em]">
          {profile.nameLines.map((line, index) => (
            <span key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-8 max-w-xl text-xl leading-relaxed md:text-2xl">
          {profile.lead}
        </p>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">{profile.support}</p>
      </Container>
    </section>
  );
}
