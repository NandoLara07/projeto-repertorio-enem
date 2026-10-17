import type { Metadata } from "next";
import Link from "next/link";
import { House } from "lucide-react";
import Header from "@/components/common/header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main
        id="conteudo"
        tabIndex={-1}
        className="flex flex-1 flex-col items-center justify-center gap-6 px-6 pt-[calc(var(--header-height)+2rem)] pb-12 text-center outline-none fade-in"
      >
        {/* Same artwork as public/404_page_logo.svg, inlined so the R follows
            the theme (dark on light, white on dark / accessibility mode). */}
        <svg
          viewBox="0 0 320 360"
          aria-hidden="true"
          className="h-40 w-auto text-[#101D17] dark:text-white accessibility:text-white"
        >
          <path
            fill="currentColor"
            d="M72 42h102c53 0 96 39 96 91 0 39-24 72-59 85l76 100h-66l-83-111h33c30 0 53-21 53-51 0-29-23-50-53-50h-43v101H72V42z"
          />
          <circle cx="92" cy="266" r="30" fill="#2F8F46" />
          <circle cx="78.6" cy="262.2" r="5.6" fill="#101D17" />
          <circle cx="105.4" cy="262.2" r="5.6" fill="#101D17" />
          <circle cx="79.9" cy="260.4" r="1.6" fill="#FFFFFF" />
          <circle cx="106.7" cy="260.4" r="1.6" fill="#FFFFFF" />
          <path
            d="M83.8 277.4Q92 265.4 100.2 277.4"
            fill="none"
            stroke="#101D17"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
        </svg>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-foreground">Oops!</h1>
          <p className="text-lg text-muted-foreground">
            Essa página não existe ou foi removida.
          </p>
        </div>

        {/* data-slot lets the accessibility mode style this link as a button. */}
        <Link
          href="/"
          data-slot="button"
          // Wraps instead of overflowing when the text is zoomed on a phone.
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-auto min-h-10 px-4 py-2 whitespace-normal",
          )}
        >
          <House />
          Voltar para a página inicial
        </Link>
      </main>
    </div>
  );
}
