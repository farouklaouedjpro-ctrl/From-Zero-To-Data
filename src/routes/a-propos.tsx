import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — From Zero to Data" },
      {
        name: "description",
        content:
          "Qui écrit ce blog, pourquoi il existe, et ce que vous pouvez en attendre.",
      },
      { property: "og:title", content: "À propos — From Zero to Data" },
      {
        property: "og:description",
        content:
          "Qui écrit ce blog, pourquoi il existe, et ce que vous pouvez en attendre.",
      },
      { property: "og:type", content: "profile" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen">
      <PageHeader />

      <main id="main-content" className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="eyebrow">À propos</p>
        <h1 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
          Ce blog, en bref.
        </h1>

        <div className="mt-14 space-y-10 text-base leading-[1.8] text-foreground/90">
          <section>
            <h2 className="text-2xl font-bold leading-tight">
              Pourquoi ce blog existe
            </h2>
            <p className="mt-5">
              J'ai commencé à écrire sur la data et l'IA parce que j'en apprenais
              en construisant, et que la plupart des ressources que je trouvais
              étaient soit trop théoriques, trop marketing, ou trop avancées pour
              quelqu'un qui démarre.
            </p>
            <p className="mt-4">
              Ce blog est le journal de bord de ce parcours. Pas des tutoriels
              pas-à-pas, pas des résumés d'actualité. Des retours d'expérience
              bruts : ce qui a fonctionné, ce qui a échoué, et ce que j'aurais
              aimé savoir avant.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold leading-tight">
              Ce que vous trouverez ici
            </h2>
            <p className="mt-5">
              Des articles sur la data engineering, l'analytics et l'intelligence
              artificielle, écrits lentement, avec le souci d'être utile plutôt
              que spectaculaire.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                <strong>Comprendre la donnée</strong> : d'où elle vient, comment
                la lire, comment ne pas se tromper — les bases qui rendent une
                analyse fiable.
              </li>
              <li>
                <strong>Analytics</strong> : SQL, requêtes, métriques, dashboards,
                comment transformer la donnée en décisions sans se perdre en
                chemin.
              </li>
              <li>
                <strong>Intelligence Artificielle</strong> : RAG, agents, LLM,
                une lecture honnête de ce qui fonctionne et de ce qui ne
                fonctionne pas.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold leading-tight">
              La philosophie
            </h2>
            <p className="mt-5">
              Peu d'articles, beaucoup de place pour respirer. Je préfère écrire
              un article réfléchi toutes les deux semaines plutôt qu'un billet
              par jour qui ne dit rien.
            </p>
            <p className="mt-4">
              Chaque article est écrit comme si je l'adressais à un collègue :
              sans jargon inutile, sans promesses exagérées, avec les limites
              clairement exposées. Si un outil ne fait pas ce qu'on prétend, je
              le dis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold leading-tight">
              Rester au courant
            </h2>
            <p className="mt-5">
              Le plus simple pour suivre ce blog : la{" "}
              <a
                href="/#newsletter"
                className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
              >
                newsletter
              </a>
              . Un article, deux fois par mois, rien d'autre.
            </p>
          </section>
        </div>

        {/* Back */}
        <div className="mt-20 border-t border-border/60 pt-10">
          <Link
            to="/"
            className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </main>
    </div>
  );
}
