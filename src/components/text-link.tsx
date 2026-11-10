import type { ReactNode } from "react";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
};

export function TextLink({
  href,
  children,
  external = false,
  className,
}: TextLinkProps) {
  return (
    <a
      href={href}
      className={`underline decoration-line underline-offset-[0.18em] transition-colors hover:text-accent hover:decoration-accent ${className ?? ""}`}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}
