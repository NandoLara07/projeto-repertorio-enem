import type { Metadata } from "next";

// A title set in an intermediate layout resets the parent's template for the
// nested routes (/repertorios/[id]), so the template is declared again here.
export const metadata: Metadata = {
  title: {
    default: "Repertórios",
    template: "%s | Repertór.io",
  },
  alternates: { canonical: "/repertorios" },
};

export default function RepertoriosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
