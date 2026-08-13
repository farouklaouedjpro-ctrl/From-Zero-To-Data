import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DRAFT_KEY = "fztd-newsletter-draft";

export function NewsletterSection() {
  const [email, setEmail] = useState(() => {
    try {
      return sessionStorage.getItem(DRAFT_KEY) ?? "";
    } catch {
      return "";
    }
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const updateEmail = (value: string) => {
    setEmail(value);
    try {
      if (value) sessionStorage.setItem(DRAFT_KEY, value);
      else sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const value = email.trim();
    if (!EMAIL_PATTERN.test(value)) {
      setError("Cette adresse ne semble pas valide.");
      return;
    }

    setError("");
    setStatus("sending");
    try {
      // TODO: brancher l'endpoint d'inscription réel ici.
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
    } catch {
      setStatus("error");
      setError("Une erreur est survenue. Réessaie dans un instant.");
    }
  };

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

          {status === "success" ? (
            <p className="mt-10 text-sm text-primary">
              Merci, tu recevras le prochain article dans ta boîte.
            </p>
          ) : (
            <form
              className="mt-10 flex flex-col gap-3 sm:flex-row"
              onSubmit={submit}
              noValidate
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
                aria-invalid={status === "error" || error !== ""}
                aria-describedby={error ? "newsletter-error" : undefined}
                className="w-full flex-1 rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Envoi…" : "Je m'abonne"}
              </button>
            </form>
          )}

          {error && status !== "success" && (
            <p id="newsletter-error" role="alert" className="mt-3 text-sm text-destructive">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
