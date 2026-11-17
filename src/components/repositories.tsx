import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { TextLink } from "@/components/text-link";
import type { RepositoriesSection } from "@/lib/profile";

type RepositoriesProps = {
  section: RepositoriesSection;
};

export function Repositories({ section }: RepositoriesProps) {
  return (
    <section id={section.id} className="border-t border-line">
      <Container className="py-20 md:py-28">
        <SectionHeading
          index={section.index}
          title={section.title}
          lede={section.lede}
        />
        <div className="mt-14 border-b border-line">
          {section.items.map((item) => (
            <article
              key={item.id}
              className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-10"
            >
              <div className="md:col-span-4">
                <TextLink
                  href={item.url}
                  external
                  className="font-serif text-3xl tracking-tight md:text-4xl"
                >
                  {item.title}
                </TextLink>
                <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-muted">
                  {item.stack.join(" · ")}
                </p>
              </div>
              <p className="leading-relaxed text-muted md:col-span-8">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
