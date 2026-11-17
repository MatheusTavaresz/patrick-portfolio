import content from "@/content/site.json";

export type Profile = {
  name: string;
  brand: string;
  role: string;
  discipline: string;
  location: string;
  linkedin: string;
  linkedinLabel: string;
  github: string;
  githubLabel: string;
  nameLines: string[];
  lead: string;
  support: string;
};

export type Chrome = {
  lang: string;
  locale: string;
  mainId: string;
  skipLabel: string;
  menu: string;
  close: string;
  themeToLight: string;
  themeToDark: string;
};

export type CaseStudy = {
  id: string;
  index: string;
  title: string;
  context: string;
  solution: string;
  result: string;
  tools: string[];
};

export type ProjectsSection = {
  kind: "projects";
  id: string;
  index: string;
  nav: string;
  title: string;
  labels: {
    context: string;
    solution: string;
    result: string;
  };
  items: CaseStudy[];
};

export type Role = {
  id: string;
  company: string;
  title: string;
  period: string;
  points: string[];
};

export type RepositoryItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  stack: string[];
};

export type RepositoriesSection = {
  kind: "repositories";
  id: string;
  index: string;
  nav: string;
  title: string;
  lede?: string;
  items: RepositoryItem[];
};

export type ExperienceSection = {
  kind: "experience";
  id: string;
  index: string;
  nav: string;
  title: string;
  items: Role[];
};

export type SkillGroup = {
  area: string;
  tools: string;
};

export type SkillsSection = {
  kind: "skills";
  id: string;
  index: string;
  nav: string;
  title: string;
  columns: [string, string];
  groups: SkillGroup[];
};

export type Study = {
  place: string;
  detail: string;
};

export type BackgroundSection = {
  kind: "background";
  id: string;
  index: string;
  nav: string;
  title: string;
  studiesTitle: string;
  education: Study[];
  studies: Study[];
};

export type ContactSource = "linkedin" | "github" | "location";

export type ContactChannel = {
  label: string;
  source: ContactSource;
};

export type ContactSection = {
  kind: "contact";
  id: string;
  index: string;
  nav: string;
  title: string;
  lede: string;
  channels: ContactChannel[];
};

export type HeroSection = {
  kind: "hero";
  id: string;
};

export type Section =
  | HeroSection
  | ProjectsSection
  | RepositoriesSection
  | ExperienceSection
  | SkillsSection
  | BackgroundSection
  | ContactSection;

export type SiteContent = {
  profile: Profile;
  chrome: Chrome;
  sections: Section[];
};

export type NavItem = {
  href: string;
  label: string;
};

export type ResolvedChannel = {
  label: string;
  text: string;
  href?: string;
  external?: boolean;
};

const site = content as SiteContent;

export const profile = site.profile;
export const chrome = site.chrome;
export const sections = site.sections;

export const navigation: NavItem[] = sections.flatMap((section) =>
  "nav" in section ? [{ href: `#${section.id}`, label: section.nav }] : [],
);

export const homeHref = `#${sections.find((section) => section.kind === "hero")?.id ?? "topo"}`;

function externalChannel(text: string, href: string) {
  return { text, href, external: true as const };
}

const channelReaders: Record<
  ContactSource,
  (profile: Profile) => Omit<ResolvedChannel, "label">
> = {
  linkedin: (current) => externalChannel(current.linkedinLabel, current.linkedin),
  github: (current) => externalChannel(current.githubLabel, current.github),
  location: (current) => ({
    text: current.location,
  }),
};

export function resolveChannels(
  channels: ContactChannel[],
  current: Profile,
): ResolvedChannel[] {
  return channels.map((channel) => ({
    label: channel.label,
    ...channelReaders[channel.source](current),
  }));
}
