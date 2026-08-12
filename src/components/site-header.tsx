import { Link } from "@tanstack/react-router";

import { ThemeToggle } from "@/components/theme-toggle";
import { useScrollDirection } from "@/hooks/use-scroll-direction";


export function SiteHeader() {
  const direction = useScrollDirection();
  const isHidden = direction === "down";

  return (
    <header
      className={`sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md transition-transform duration-300 ease-in-out ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-lg font-bold tracking-tight">
            From Zero to <span className="text-gradient-mint">Data</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 text-sm text-muted-foreground md:flex">
          <a href="#top" className="transition-colors hover:text-foreground">
            Accueil
          </a>
          <a href="#articles" className="transition-colors hover:text-foreground">
            Articles
          </a>
          <a href="#notes" className="transition-colors hover:text-foreground">
            Notes
          </a>
          <a href="#newsletter" className="transition-colors hover:text-foreground">
            Newsletter
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#newsletter"
            className="rounded-full border border-primary/60 px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            S'abonner
          </a>
        </div>

      </div>
    </header>
  );
}
