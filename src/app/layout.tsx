import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { asset } from "@/lib/paths";
import "./globals.css";
import ThemeProvider from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import ScrollbarGutterController from "@/components/common/scrollbar-gutter-controller";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Repertór.io",
  description: "Não sabe qual repertório usar na redação? Nós te ajudamos!",
  icons: {
    icon: asset("/icon/icon.ico"),
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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ScrollbarGutterController />
          {children}
          {/* `fixed` makes Next's post-navigation focus handler skip this
              wrapper; otherwise it focuses the Toaster's <section tabindex="-1">
              and steals the autoFocus from the next page's textarea. */}
          <div className="fixed">
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
