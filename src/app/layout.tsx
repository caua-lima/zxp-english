import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/state/provider";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-face",
  weight: ["600", "700", "800"],
  display: "swap",
});

const body = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "ZXP ENGLISH", template: "%s · ZXP ENGLISH" },
  description:
    "Aprenda inglês do zero ao B2 com uma trilha clara, explicações em português, revisão espaçada e prática real. Sem assinatura e sem conta.",
  applicationName: "ZXP ENGLISH",
  appleWebApp: { capable: true, title: "ZXP English", statusBarStyle: "default" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6ef" },
    { media: "(prefers-color-scheme: dark)", color: "#12131f" },
  ],
};

/**
 * Aplica tema e preferência de movimento ANTES da primeira pintura (evita "flash").
 * As preferências ficam espelhadas no localStorage; a fonte de verdade é o IndexedDB.
 */
const THEME_SCRIPT = `(function(){try{var d=document.documentElement,t=localStorage.getItem("zxp-theme")||"system",m=localStorage.getItem("zxp-motion")||"system";var dark=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);d.setAttribute("data-theme",dark?"dark":"light");if(m==="on")d.setAttribute("data-motion","reduce");else if(m==="off")d.setAttribute("data-motion","full");}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full">
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  );
}
