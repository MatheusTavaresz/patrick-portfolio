type NameAnnotateProps = {
  lines: string[];
};

export function NameAnnotate({ lines }: NameAnnotateProps) {
  const marked = lines.slice(0, -1);
  const rest = lines.at(-1);

  return (
    <h1 className="max-w-4xl font-serif text-[clamp(2.7rem,7vw,6.2rem)] leading-[0.88] tracking-[-0.035em]">
      <span className="fx-annotate">
        {marked.map((line, index) => (
          <span key={line}>
            {index > 0 ? <br /> : null}
            {line}
          </span>
        ))}
        <svg viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="fx-annotate-ring"
            pathLength={100}
            d="M 104 8 C 58 5 22 18 12 36 C 2 56 30 82 78 90 C 126 98 178 88 190 68 C 202 48 170 20 122 10 C 108 7 92 6 78 8"
          />
          <path
            className="fx-annotate-line"
            pathLength={100}
            d="M 30 82 C 52 76 68 86 92 80 S 132 74 152 82 S 168 84 172 78"
          />
        </svg>
      </span>
      {rest ? <span className="mt-3 block">{rest}</span> : null}
    </h1>
  );
}
