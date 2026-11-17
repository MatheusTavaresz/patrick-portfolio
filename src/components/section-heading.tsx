type SectionHeadingProps = {
  index: string;
  title: string;
  lede?: string;
};

export function SectionHeading({ index, title, lede }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl" data-reveal>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        {index}
      </p>
      <h2 className="mt-3 font-serif text-4xl tracking-tight text-balance md:text-5xl">
        {title}
      </h2>
      {lede ? (
        <p className="mt-4 text-lg leading-relaxed text-muted">{lede}</p>
      ) : null}
    </div>
  );
}
