import Link from "next/link";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-between border-b border-border bg-background px-4">
      <Link
        href="/"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <h1 className="font-extrabold text-foreground leading-tight tracking-tight">
          Repertór.<span className="text-primary">io</span>
        </h1>
      </Link>
    </header>
  );
};

export default Header;
