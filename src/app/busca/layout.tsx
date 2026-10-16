import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscar repertórios",
};

export default function BuscaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
