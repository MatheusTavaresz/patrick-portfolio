import { Container } from "@/components/container";
import { profile } from "@/lib/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-2 py-8 md:flex-row md:items-center md:justify-between">
        <p className="font-serif text-lg tracking-tight">{profile.name}</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          {profile.role} · {profile.location}
        </p>
      </Container>
    </footer>
  );
}
