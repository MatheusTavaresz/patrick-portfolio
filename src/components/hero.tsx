import { Container } from "@/components/container";
import { HeroMedia } from "@/components/hero-media";
import { NameAnnotate } from "@/components/name-annotate";
import { WhenDetailed } from "@/components/portfolio-view";
import { SectionDial } from "@/components/section-dial";
import type { HeroSection, Profile } from "@/lib/profile";

type HeroProps = {
  section: HeroSection;
  profile: Profile;
};

export function Hero({ section, profile }: HeroProps) {
  return (
    <section
      id={section.id}
      className="relative isolate flex min-h-[calc(100svh-4.75rem)] items-center border-b border-line bg-background"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <HeroMedia />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/55 to-background md:bg-gradient-to-r md:from-background/90 md:via-background/55 md:to-background/10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>
      <Container className="relative z-10 w-full py-10">
        <div className="grid w-full items-center gap-[clamp(1.25rem,4vw,3rem)] md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="text-enter min-w-0">
            <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <p>{profile.discipline}</p>
              <p>{profile.location}</p>
            </div>
            <div className="mt-5">
              <NameAnnotate lines={profile.nameLines} />
              <p className="mt-4 font-mono text-sm uppercase tracking-[0.22em] text-accent">
                {profile.focusRole}
              </p>
            </div>
            <WhenDetailed>
              {profile.lead ? (
                <p className="mt-8 max-w-xl text-xl leading-relaxed md:text-2xl">{profile.lead}</p>
              ) : null}
              {profile.support ? (
                <p className="mt-4 max-w-xl leading-relaxed text-muted">{profile.support}</p>
              ) : null}
            </WhenDetailed>
          </div>
          <div className="mx-auto w-[min(62vw,13.5rem)] md:mx-0 md:w-[clamp(11rem,18vw,13.5rem)] md:justify-self-end">
            <SectionDial />
          </div>
        </div>
      </Container>
    </section>
  );
}
