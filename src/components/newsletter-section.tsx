import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section id="newsletter" className="mx-auto max-w-6xl px-6 py-28">
      <div className="rounded-lg border border-border/60 bg-surface px-8 py-16 md:px-16 md:py-20">
        <div className="max-w-xl">
          <p className="eyebrow">Newsletter</p>
          <h2 className="mt-6 text-3xl font-bold leading-tight md:text-4xl">
            Un article, deux fois par mois.
            <br />
            <span className="text-gradient-mint">Rien d'autre.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Pas de résumé d'actualité, pas de liste de liens. Juste le prochain article, envoyé
            quand il est prêt.
          </p>

          {sent ? (
            <p className="mt-10 text-sm text-primary">
              Merci — tu recevras le prochain article dans ta boîte.
            </p>
          ) : (
            <form
              className="mt-10 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Adresse e-mail
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="prenom@exemple.com"
                className="w-full flex-1 rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
              />
              <button
                type="submit"
                className="rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Je m'abonne
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
