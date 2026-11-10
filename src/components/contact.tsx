import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { TextLink } from "@/components/text-link";
import { profile } from "@/lib/profile";

export function Contact() {
  return (
    <section id="contato" className="border-t border-line bg-surface">
      <Container className="py-20 md:py-28">
        <SectionHeading
          index="05"
          title="Contato"
          lede="Para falar de backend, pagamento, legado ou integração de arquivo."
        />
        <ul className="mt-12 space-y-8">
          <li>
            <TextLink
              href={`mailto:${profile.email}`}
              className="font-serif text-3xl tracking-tight break-all sm:text-5xl"
            >
              {profile.email}
            </TextLink>
          </li>
          <li>
            <TextLink
              href={profile.github}
              external
              className="font-serif text-3xl tracking-tight sm:text-5xl"
            >
              GitHub
            </TextLink>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              {profile.githubLabel}
            </p>
          </li>
        </ul>
      </Container>
    </section>
  );
}
