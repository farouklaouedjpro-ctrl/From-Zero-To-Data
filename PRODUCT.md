# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Débutants en data et IA : des personnes qui démarrent dans la data (pipelines, SQL, RAG, agents IA) et cherchent des explications claires, sans jargon, qui tiennent la route en pratique. Le blog s'adresse aussi, en second cercle, à toute personne curieuse de comprendre comment la data se construit réellement.

## Product Purpose

Blog personnel francophone qui explique la data et l'IA « une idée à la fois ». Il documente ce que l'auteur apprend en construisant — pipelines, modèles, requêtes qui tiennent — et le rend compréhensible pour des débutants. Le succès se mesure à une audience régulière : des lecteurs qui reviennent, s'abonnent à la newsletter et lisent chaque publication.

## Positioning

Là où beaucoup de contenus data sont soit trop techniques, soit trop vagues, From Zero to Data tient une ligne éditoriale claire : peu d'articles, beaucoup de place pour respirer, des retours d'expérience réels (construit en vrai, pas théorisé) expliqués simplement. La promesse est la clarté au service de la pratique.

## Operating Context

- Contenu rédigé en markdown avec frontmatter (titre, extrait, catégorie, date, temps de lecture, couverture), géré via Decap CMS (`public/admin/config.yml`, serveur CMS : `bun run cms`).
- Deux formats : articles longs (avec couverture, extrait, temps de lecture) et notes courtes (titre + catégorie + date).
- Catégories d'articles : Intelligence Artificielle, Data Engineering, Analytics, Outils.
- Site statique généré par TanStack Start (`bun run dev` → http://localhost:8080).
- Le contenu actuel (articles et notes) est volontairement vide : l'auteur est en cours de réécriture du contenu.

## Capabilities and Constraints

- Page d'accueil avec hero, article à la une, filtres par catégorie, grille d'articles, liste de notes courtes, section newsletter.
- Pages : À propos, article individuel (`/articles/$slug`), flux RSS, sitemap XML, robots.txt, og:image.
- Thème clair/sombre (theme-toggle) ; typographie Space Grotesk (display) via Google Fonts.
- Section newsletter intégrée (inscription par email).
- Décap CMS permet de gérer articles et notes sans toucher au code.

## Brand Commitments

- Nom : « From Zero to Data » — clin d'œil au parcours « from zero to hero », promesse d'accompagnement des débutants.
- Langue : français (toute la copy, titres et contenus sont en français).
- Voix éditoriale : claire, honnête, sans bruit — « peu d'articles, beaucoup de place pour respirer ».

## Evidence on Hand

- Structure de site complète et fonctionnelle (routes, composants, SEO, CMS).
- Aucun contenu publié actuellement : articles et notes sont en cours de réécriture. Ne pas inventer de contenu, de témoignages, de statistiques ou de preuves sociales.
- Pas de DESIGN.md ni de PRODUCT.md antérieurs (init crée le premier).

## Product Principles

1. La clarté prime : chaque article doit rendre une idée compréhensible par un débutant, sans sacrifier la justesse.
2. Le vrai vaut mieux que le théorique : tout contenu repose sur des retours d'expérience réels en construction.
3. La qualité plutôt que la quantité : peu d'articles, mais profonds et utiles.
4. L'audience se construit par la régularité et la newsletter, pas par le volume.
5. Le contenu reste toujours éditable par l'auteur via le CMS, sans friction technique.

## Accessibility & Inclusion

Aucune exigence produit spécifique établie au-delà du standard web de base (contraste, navigation clavier, HTML sémantique).
