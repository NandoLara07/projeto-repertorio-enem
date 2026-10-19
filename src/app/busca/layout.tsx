import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscar repertórios",
  alternates: { canonical: "/busca" },
};

export default function BuscaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
