import { Link } from "@tanstack/react-router";

import { ThemeToggle } from "@/components/theme-toggle";

export function PageHeader({ backLabel = "Retour" }: { backLabel?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-lg font-bold tracking-tight">
            From Zero to <span className="text-gradient-mint">Data</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← {backLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
