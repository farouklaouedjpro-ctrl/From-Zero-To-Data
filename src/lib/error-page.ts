export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>La page n'a pas pu charger</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: oklch(0.985 0.008 160); color: oklch(0.24 0.035 215); display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: oklch(0.48 0.02 205); margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 4px; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: oklch(0.55 0.13 168); color: oklch(0.99 0.005 160); }
      .secondary { background: oklch(1 0 0); color: oklch(0.24 0.035 215); border-color: oklch(0.89 0.015 190); }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>La page n'a pas pu charger</h1>
      <p>Une erreur est survenue de notre côté. Tu peux réessayer ou revenir à l'accueil.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Réessayer</button>
        <a class="secondary" href="/">Retour à l'accueil</a>
      </div>
    </div>
  </body>
</html>`;
}
