export type NavItem = {
  href: string;
  label: string;
};

export const navigation: readonly NavItem[] = [
  { href: "#trabalho", label: "Trabalho" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#stack", label: "Stack" },
  { href: "#formacao", label: "Formação" },
  { href: "#contato", label: "Contato" },
];
