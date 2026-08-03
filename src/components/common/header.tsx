import Link from "next/link";
import ThemeSwitcher from "../ui/theme-switcher";

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
        <svg
          viewBox="0 0 320 360"
          role="img"
          aria-label="Logo R Repertór.io"
          className="h-full aspect-square text-[#101D17] dark:text-white"
        >
          <path
            fill="currentColor"
            d="M72 42h102c53 0 96 39 96 91 0 39-24 72-59 85l76 100h-66l-83-111h33c30 0 53-21 53-51 0-29-23-50-53-50h-43v101H72V42z"
          />
          <circle cx="92" cy="266" r="30" fill="#2F8F46" />
        </svg>
      </Link>

      <ThemeSwitcher />
    </header>
  );
};

export default Header;
