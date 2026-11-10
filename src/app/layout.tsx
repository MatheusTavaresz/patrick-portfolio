import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { navigation } from "@/lib/navigation";
import { profile } from "@/lib/profile";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const description =
  "Desenvolvedor Full Stack em fintech. Backend em NestJS e PHP, fluxos de pagamento em Next.js, integrações SFTP e extração de boletos.";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description,
  authors: [{ name: profile.name, url: profile.github }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description,
    locale: "pt_BR",
    type: "profile",
  },
};

export const viewport: Viewport = {
  themeColor: "#efeae1",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${serif.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
        >
          Ir para o conteúdo
        </a>
        <SiteHeader brand={profile.brand} items={navigation} />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
