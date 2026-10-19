import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import ThemeProvider from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import ScrollbarGutterController from "@/components/common/scrollbar-gutter-controller";
import { accessibilityInitScript } from "@/lib/accessibility";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Repertór.io",
    template: "%s | Repertór.io",
  },
  description: SITE_DESCRIPTION,
  // Inherited by routes that don't set their own, so each layout/page overrides it.
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Repertór.io",
    title: "Repertór.io",
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: "/icon/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: accessibilityInitScript }} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* Only shows up when it receives keyboard focus (first Tab).
              data-nosnippet keeps it out of Google's result snippet. */}
          <a
            href="#conteudo"
            data-nosnippet
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
          >
            Pular para o conteúdo
          </a>
          <ScrollbarGutterController />
          {children}
          <div className="fixed">
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
      {/* Only loads when the measurement ID is configured (NEXT_PUBLIC_GA_ID). */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
