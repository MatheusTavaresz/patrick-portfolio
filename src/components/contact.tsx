import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { TextLink } from "@/components/text-link";
import {
  resolveChannels,
  type ContactSection,
  type Profile,
} from "@/lib/profile";

type ContactProps = {
  section: ContactSection;
  profile: Profile;
};

export function Contact({ section, profile }: ContactProps) {
  const channels = resolveChannels(section.channels, profile);

  return (
    <section id={section.id} className="border-t border-line bg-surface">
      <Container className="py-20 md:py-28">
        <SectionHeading
          index={section.index}
          title={section.title}
          lede={section.lede}
        />
        <ul className="mt-12 space-y-8">
          {channels.map((channel) => (
            <li key={channel.label}>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {channel.label}
              </p>
              {channel.href ? (
                <TextLink
                  href={channel.href}
                  external={channel.external}
                  className="mt-2 inline-block font-serif text-3xl tracking-tight break-all sm:text-5xl"
                >
                  {channel.text}
                </TextLink>
              ) : (
                <p className="mt-2 font-serif text-3xl tracking-tight sm:text-5xl">
                  {channel.text}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
