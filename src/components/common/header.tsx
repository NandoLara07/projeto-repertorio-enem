import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/paths";

export const Header = () => {
  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="fixed top-0 left-0 right-0 z-50 flex h-[9dvh] w-full items-center justify-between border-b border-border bg-background px-4"
    >
      <Link
        href="/"
        className="flex h-full items-center gap-2 py-2 hover:opacity-80 transition-opacity"
      >
        <div className="relative aspect-square h-full">
          <Image
            src={asset("/temp_logo.svg")}
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>
    </header>
  );
};

export default Header;
