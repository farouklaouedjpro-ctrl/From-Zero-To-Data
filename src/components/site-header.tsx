import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { useScrollDirection } from "@/hooks/use-scroll-direction";

const navLinks = [
  { label: "Accueil", href: "#top" },
  { label: "Articles", href: "#articles" },
  { label: "Notes", href: "#notes" },
  { label: "Newsletter", href: "#newsletter" },
  { label: "À propos", to: "/a-propos" },
];

export function SiteHeader() {
  const direction = useScrollDirection();
  const isHidden = direction === "down";
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md transition-transform duration-300 ease-in-out ${
        isHidden && !open ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-lg font-bold tracking-tight">
            From Zero to <span className="text-gradient-mint">Data</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 text-sm text-muted-foreground md:flex">
          {navLinks.map((link) =>
            link.to ? (
              <Link
                key={link.to}
                to={link.to}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#newsletter"
            className="hidden rounded-full border border-primary/60 px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:inline-block"
          >
            S'abonner
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-border/60 bg-background/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={close}
                  className="rounded-md px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="rounded-md px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </a>
              ),
            )}
            <a
              href="#newsletter"
              onClick={close}
              className="mt-2 rounded-md bg-primary px-3 py-3 text-center text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              S'abonner
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
