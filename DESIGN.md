---
name: From Zero to Data
description: Blog francophone sur la data et l'IA — clair, respirant, systématique.
colors:
  background: "oklch(0.985 0.008 160)"
  background-dark: "oklch(0.19 0.03 220)"
  foreground: "oklch(0.24 0.035 215)"
  foreground-dark: "oklch(0.96 0.01 160)"
  surface: "oklch(0.955 0.018 165)"
  surface-dark: "oklch(0.24 0.035 200)"
  card: "oklch(1 0 0)"
  card-dark: "oklch(0.23 0.032 205)"
  primary: "oklch(0.55 0.13 168)"
  primary-dark: "oklch(0.82 0.16 168)"
  primary-foreground: "oklch(0.99 0.005 160)"
  primary-foreground-dark: "oklch(0.19 0.03 220)"
  primary-glow: "oklch(0.68 0.15 162)"
  primary-glow-dark: "oklch(0.92 0.15 160)"
  secondary: "oklch(0.93 0.03 165)"
  secondary-dark: "oklch(0.32 0.06 165)"
  muted: "oklch(0.94 0.012 180)"
  muted-dark: "oklch(0.26 0.03 210)"
  muted-foreground: "oklch(0.48 0.02 205)"
  muted-foreground-dark: "oklch(0.72 0.02 180)"
  accent: "oklch(0.9 0.05 165)"
  accent-dark: "oklch(0.4 0.09 162)"
  border: "oklch(0.89 0.015 190)"
  border-dark: "oklch(0.32 0.03 200)"
  ring: "oklch(0.55 0.13 168)"
  ring-dark: "oklch(0.82 0.16 168)"
  destructive: "oklch(0.55 0.2 25)"
  destructive-dark: "oklch(0.62 0.2 25)"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  body:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.22em"
    textTransform: "uppercase"
rounded:
  sm: "0"
  md: "2px"
  lg: "4px"
  xl: "8px"
  full: "9999px"
spacing:
  section: "7rem"
  block: "4rem"
  gutter: "1.5rem"
  container: "72rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.lg}"
    padding: "24px 16px"
    typography: "0.875rem / 600"
  button-primary-pill:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "20px 8px"
  input-field:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  card-article:
    backgroundColor: "transparent"
    rounded: "{rounded.lg}"
---

# Design System: From Zero to Data

## Overview

**Creative North Star: "Le Jardin Systématique"**

Le blog cultive la clarté comme un jardin : chaque élément pousse lentement, en profondeur, et rien ne crie. Le système visuel est une serre calme où la data est expliquée une idée à la fois — pas un laboratoire bruyant ni un portfolio tape-à-l'oeil. Le fond est une brume de serre très légèrement teintée de vert, les titres respirent dans un display géométrique, et la seule touche de couleur vive — la Menthe Éclat — apparaît rarement, comme une pousse éclairée au milieu du feuillage.

L'esthétique est **restreinte et précise** : bords presque droits (radius de base 4px), ombres discrètes, hiérarchie typographique nette. L'espace est le luxe principal — sections de 7rem, marges généreuses, lignes de lecture courtes. Le mode sombre n'est pas un inversé mécanique : les verts s'éclaircissent (la menthe devient lumineuse sur fond profond), les teintes restent dans la même famille chromatique.

**Key Characteristics:**
- Palette unique famille verte-cyan (mint), appliquée avec parcimonie
- Typographie duale : Space Grotesk (display) + DM Sans (body)
- Radius serré (4px de base) — bords proches du franc, jamais mous
- Élévation plate par défaut, une seule ombre « lift » pour les cartes, glow mint rare
- Espacement généreux et constant (7rem / 4rem / 1.5rem)

## Colors

Palette monofamiliale vert-cyan : un seul accent vif (la Menthe Éclat), des neutres légèrement teintés de vert, et un rendu qui reste calme en clair comme en sombre.

### Primary
- **Menthe Éclat** (oklch 0.55 0.13 168 / sombre 0.82 0.16 168): l'accent unique du système. Utilisé pour les liens actifs, le bouton principal, les « eyebrows », et le texte en dégradé du logo. Jamais appliqué sur plus d'un élément par zone — sa rareté est sa force. En sombre, il s'éclaircit fortement (0.82) pour rester lisible sur fond profond.
- **Éclat Lumineux** (primary-glow, oklch 0.68 0.15 162 / sombre 0.92 0.15 160): l'extrémité claire du dégradé mint. N'existe que comme second arrêt du `--gradient-mint` et du halo `--glow-mint` — jamais utilisé seul.

### Secondary
- **Mousse** (secondary, oklch 0.93 0.03 165 / sombre 0.32 0.06 165): fond de remplissage secondaire discret (surfaces de liste, fonds hover). Reste dans la même famille verte.

### Neutral
- **Brume de Serre** (background, oklch 0.985 0.008 160 / sombre 0.19 0.03 220): le fond général. À peine vert — l'oeil le lit comme un blanc cassé frais. En sombre, un bleu-vert profond.
- **Encre Feuillage** (foreground, oklch 0.24 0.035 215 / sombre 0.96 0.01 160): le texte principal. Bleu-vert très foncé en clair, presque blanc légèrement mentholé en sombre.
- **Blanc Semis** (card, oklch 1 0 0 / sombre 0.23 0.032 205): cartes et popovers — blanc pur en clair (le seul blanc du système), vert profond en sombre.
- **Encre Douce** (muted-foreground, oklch 0.48 0.02 205 / sombre 0.72 0.02 180): textes secondaires, extraits, métadonnées. Gris légèrement bleu-vert.
- **Liseré** (border, oklch 0.89 0.015 190 / sombre 0.32 0.03 200): bordures et séparateurs, presque toujours à 60% d'opacité.

### Named Rules
**The Rarity Rule.** L'accent Menthe Éclat couvre au plus ~5% d'un écran. Une seule zone en dégradé mint par viewport. Sa rareté est ce qui le rend précieux.

**The Family Rule.** Tous les neutres sont teintés de la même famille vert-cyan. Interdit d'introduire un gris pur ou un teinte chaude dans le neutre.

## Typography

**Display Font:** Space Grotesk (500, 700) — charpente géométrique, personnalité technique douce
**Body Font:** DM Sans (400, 500) — humaniste, très lisible, sans fioritures
**Label Font:** Space Grotesk (500), 0.6875rem, lettres espacées de 0.22em, majuscules — l'« eyebrow »

**Character:** Un contraste net mais serein : les titres en Space Grotesk ont une ossature géométrique moderne (clin d'oeil technique), le corps en DM Sans reste chaleureux et accessible (accueil des débutants). L'espacement des lettres est resserré sur les titres (-0.025em), très ouvert sur les labels (0.22em).

### Hierarchy
- **Display** (700, clamp 2.25–3.75rem, 1.08): le hero de la home (« Comprendre la data et l'IA, une idée à la fois »). Max 3 lignes.
- **Headline** (700, 1.875–2.25rem, 1.1–1.25): titres de section (« Derniers articles », « Notes courtes »).
- **Title** (700, 1.25rem, 1.375): titres de cartes d'articles.
- **Body** (400, 1rem, 1.6): paragraphes de contenu. Largeur de ligne max ~65ch (max-w-xl).
- **Label** (500, 0.6875rem, 0.22em, uppercase): eyebrows de section et de carte (« Le blog », « À la une · Data Engineering », catégorie d'article).

### Named Rules
**The Breathing Rule.** Aucun bloc de texte ne dépasse ~65 caractères par ligne. L'espace respire : les titres ont des marges supérieures généreuses (mt-6 à mt-10), jamais de texte collé à un titre.

## Layout

Grille simple à un flux central : **conteneur max-w-6xl (72rem)**, gouttière de 1.5rem (px-6), sections espacées de **7rem (py-28)** avec des blocs internes de 4rem (py-16). Les bords sont toujours alignés sur la même colonne centrale — pas de mise en page éclatée.

- **Hero** : aligné à gauche, pas centré — la lecture commence à gauche, l'espace à droite respire.
- **Grille d'articles** : 3 colonnes sur desktop (md:grid-cols-3), 1 colonne mobile, écart de 3.5rem (gap-14).
- **Article à la une** : 2 colonnes asymétriques (1.15fr / 1fr) sur desktop, empilées sur mobile.
- **Breakpoints** : mobile-first, `sm` (640px), `md` (768px), `lg` (1024px). Les grilles passent à 1 colonne sous md.
- **Densité** : volontairement basse. Les listes de notes utilisent des rangées espacées (py-7) séparées par des hairlines, pas des cartes empilées.

## Elevation & Depth

Système **plat par défaut** avec un seul niveau de lift discret. La profondeur est d'abord tonale (surfaces légèrement différentes du fond), les ombres sont l'exception, pas la règle.

- **Brume de Serre** (fond) → **Mousse** (surface secondaire) → **Blanc Semis** (cartes) : la hiérarchie se lit d'abord par clarté du fond, pas par ombre.
- **Shadow-lift** (`0 24px 60px -34px oklch(0.3 0.03 215 / 0.28)` / sombre `0 24px 60px -30px oklch(0.1 0.02 220 / 0.9)`): réservée aux éléments qui doivent se détacher nettement.
- **Glow-mint** (`0 0 60px -10px color-mix(in oklab, primary 30%, transparent)`): uniquement autour des accents primaires, en quantité très faible.

### Named Rules
**The Flat-by-Default Rule.** Les surfaces sont plates au repos. Une ombre n'apparaît que lorsqu'un élément a une raison fonctionnelle de se détacher (carte en hover, dialogue ouvert).

## Shapes

Langage de formes **franc mais pas coupant** : radius de base **4px** (`--radius: 0.25rem`), légèrement dérivé par échelle (sm=0, md=2px, lg=4px, xl=8px). Les seules formes pleinement rondes (9999px) sont les **pills** — bouton « S'abonner » du header, filtres de catégorie, avatars. Les images d'articles sont recadrées en 4/3 et passent par un coin de 4px (lg).

- Boutons de contenu (newsletter) : **2px** (sm) — presque carrés.
- Cartes, inputs, conteneurs : **4px** (lg).
- Surfaces proéminentes (section newsletter) : **8px** (xl).
- Pills et filtres : **9999px**.

## Components

### Header
- **Style:** sticky, fond `background` à 80% d'opacité + backdrop-blur-md, bordure basse hairline (border-border/60), hauteur fixe 5rem (h-20).
- **Logo:** « From Zero to » en Space Grotesk 700 + « Data » en dégradé mint (`text-gradient-mint`). C'est la seule occurrence permanente du dégradé.
- **Navigation:** liens text-sm en muted-foreground, hover vers foreground. Espacement large (gap-10).
- **CTA « S'abonner »:** pill outline — bordure primary/60, texte primary, hover : fond primary + texte primary-foreground.
- **Mobile:** hamburger rond (bordure + icône), menu déroulant avec rangées py-3, CTA pleine largeur en primary.

### Boutons
- **Primaire (contenu):** fond Menthe Éclat, texte primary-foreground, radius 2px, padding 12px 24px, font-semibold 0.875rem. Hover : opacity 0.9 (pas de changement de couleur).
- **Primaire (pill):** transparent, bordure primary/60, texte primary, radius full, hover : fond primary. Usage : CTA header.
- **Ghost / outline:** bordure border, fond background, texte foreground, hover : fond accent. Usage : retours, actions secondaires.
- **Focus:** anneau de focus `ring` (Menthe Éclat) — accessible par clavier.

### Champs (Inputs)
- **Style:** fond background, bordure `input` (1px), radius 2px, padding 12px 16px, placeholder en muted-foreground, texte sm.
- **Focus:** bordure passe à Menthe Éclat (`focus:border-primary`), pas d'ombre — précis, pas de glow.
- **Étiquette:** sr-only + placeholder explicite (« prenom@exemple.com »).

### Cartes d'articles
- **Structure:** image (4/3, radius 4px, bordure hairline) + eyebrow catégorie + titre + extrait + métadonnées (date · temps de lecture).
- **Image hover:** scale 1.03 sur 700ms (transition très lente, douce).
- **Titre hover:** passe en Menthe Éclat.
- **Fond:** transparent — la carte vit par son contenu, pas par un conteneur.

### Section newsletter
- **Conteneur:** surface Mousse, radius 8px, bordure hairline, padding 4rem (py-16) à 5rem (py-20).
- **Titre:** headline + une phrase en dégradé mint (la deuxième occurrence autorisée du dégradé).
- **Disposition:** champ email (flex-1) + bouton primaire côte à côte sur ≥sm, empilés sur mobile.

### Footer
- **Structure:** bordure haute hairline, padding vertical 5rem, deux colonnes de liens (Lire / Suivre) sur desktop, empilées sur mobile.
- **Liens:** text-sm muted-foreground, hover foreground.
- **Bas de page:** copyright 0.75rem en muted-foreground.

## Do's and Don'ts

### Do:
- **Do** utiliser la Menthe Éclat avec parcimonie — une seule zone d'accent par zone de l'écran.
- **Do** garder les coins presque droits (4px) pour les surfaces de contenu ; les pills restent l'exception pour les CTAs et filtres.
- **Do** laisser respirer : sections à 7rem, gouttières à 1.5rem, lignes de texte ≤65ch.
- **Do** teinter tous les neutres de la famille vert-cyan (jamais de gris pur).
- **Do** utiliser le dégradé mint uniquement sur le logo et l'accent de la section newsletter.

### Don't:
- **Don't** ajouter une seconde couleur d'accent — la palette est monofamiliale par design.
- **Don't** multiplier les ombres : surface plate par défaut, shadow-lift seulement pour détacher un élément.
- **Don't** centrer le hero ou les blocs de texte — le système lit de gauche à droite.
- **Don't** utiliser le glow mint comme décoration permanente ; il est réservé aux accents ponctuels.
- **Don't** introduire des arrondis doux (12px+) sur les surfaces de lecture — le radius serré est l'identité.
