import coverAi from "@/assets/cover-ai.jpg";
import coverPipeline from "@/assets/cover-pipeline.jpg";
import coverSql from "@/assets/cover-sql.jpg";
import coverAgents from "@/assets/cover-agents.jpg";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  cover: string;
};

export const categories = [
  "Tout",
  "Intelligence Artificielle",
  "Data Engineering",
  "Analytics",
  "Outils",
];

export const featured: Article = {
  slug: "rag-en-production",
  title: "Mettre un RAG en production sans se brûler les ailes",
  excerpt:
    "Découpage, embeddings, évaluation, coûts : le chemin complet entre un prototype qui impressionne en démo et un système que l'on peut réellement exploiter au quotidien.",
  category: "Intelligence Artificielle",
  date: "11 août 2026",
  readingTime: "12 min",
  cover: coverAi,
};

export const articles: Article[] = [
  {
    slug: "pipelines-modernes",
    title: "Pipelines de données modernes : l'essentiel, rien de plus",
    excerpt:
      "Pourquoi la plupart des équipes n'ont pas besoin d'une stack à dix outils pour livrer de la donnée fiable.",
    category: "Data Engineering",
    date: "4 août 2026",
    readingTime: "9 min",
    cover: coverPipeline,
  },
  {
    slug: "sql-qui-tient",
    title: "Écrire du SQL que l'on relira encore dans six mois",
    excerpt:
      "Nommage, CTE, tests : les habitudes simples qui transforment une requête jetable en actif d'équipe.",
    category: "Analytics",
    date: "28 juillet 2026",
    readingTime: "7 min",
    cover: coverSql,
  },
  {
    slug: "agents-ia-utiles",
    title: "Agents IA : où ils apportent vraiment de la valeur",
    excerpt:
      "Au-delà de la démo virale, une lecture honnête des tâches que les agents automatisent bien — et de celles qu'ils ratent.",
    category: "Intelligence Artificielle",
    date: "19 juillet 2026",
    readingTime: "10 min",
    cover: coverAgents,
  },
];

export const notes = [
  {
    title: "Le coût caché des embeddings recalculés",
    category: "Outils",
    date: "9 août 2026",
  },
  {
    title: "dbt ou SQL brut : trancher selon la taille d'équipe",
    category: "Data Engineering",
    date: "1 août 2026",
  },
  {
    title: "Évaluer un modèle sans jeu de test parfait",
    category: "Intelligence Artificielle",
    date: "24 juillet 2026",
  },
  {
    title: "Trois métriques qui remplacent un dashboard entier",
    category: "Analytics",
    date: "15 juillet 2026",
  },
];
