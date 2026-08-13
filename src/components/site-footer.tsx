export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg font-bold">
              From Zero to <span className="text-gradient-mint">Data</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Un blog écrit lentement sur la data et l'IA : des retours d'expérience, pas des
              tendances recopiées.
            </p>
          </div>

          <div className="flex gap-16 text-sm">
            <div className="space-y-3">
              <p className="eyebrow">Lire</p>
              <a href="#articles" className="block text-muted-foreground hover:text-foreground">
                Articles
              </a>
              <a href="#notes" className="block text-muted-foreground hover:text-foreground">
                Notes courtes
              </a>
            </div>
            <div className="space-y-3">
              <p className="eyebrow">Suivre</p>
              <a
                href="#newsletter"
                className="block text-muted-foreground hover:text-foreground"
              >
                Newsletter
              </a>
              <a
                href="/rss.xml"
                className="block text-muted-foreground hover:text-foreground"
              >
                Flux RSS
              </a>
            </div>
          </div>
        </div>

        <p className="mt-16 text-xs text-muted-foreground">
          © 2026 From Zero to Data. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
