---
title: "Mettre un RAG en production sans se brûler les ailes"
slug: "rag-en-production"
excerpt: "Découpage, embeddings, évaluation, coûts : le chemin complet entre un prototype qui impressionne en démo et un système que l'on peut réellement exploiter au quotidien."
category: "Intelligence Artificielle"
date: "11 août 2026"
readingTime: "12 min"
cover: "/media/cover-ai.jpg"
featured: true
---

## Le prototype, c'est la partie facile

Tout le monde a un RAG qui fonctionne en démo. Vous collez quelques documents, vous posez une question, le modèle répond avec une citation. Impressionnant — jusqu'au moment où on le branche sur 500 PDF réels, avec du bruit, des doublons, des tableaux scannés et des notes de bas de page.

Le vrai travail commence quand on passe de la démo au système. Et c'est là que la plupart des projets s'effondrent : non pas parce que le modèle est mauvais, mais parce que le pipeline de données en amont est négligé.

## Découper intelligemment, pas juste en morceaux

La tentation classique : découper le texte en chunks de 500 tokens, les embedder, les stocker. Ça marche pour un POC. En production, c'est insuffisant.

Un bon découpage respecte la structure du document. Un paragraphe de conclusion ne devrait jamais se retrouver collé à un tableau de résultats. Les sections, les titres, les listes à puces — chacun devient une unité sémantique. Des outils comme Unstructured ou LlamaIndex proposent des split-aware parsers qui font ce travail mieux qu'un simple `text.split('\n\n')`.

L'autre piège : les chunks trop petits. Un embedding de 20 tokens ne contient pas assez de contexte pour être utile. Visez 300 à 800 tokens par chunk, avec un chevauchement de 10-15% pour ne pas couper les phrases en deux.

## Évaluer avant d'optimiser

On n'améliore pas ce qu'on ne mesure pas. Avant de tuner les embeddings ou de changer de modèle, constituez un jeu de test : 50 à 100 paires (question, réponse attendue) issues de vos vraies données.

Mesurez la précision du retrieval (les bons chunks sont-ils dans les top-k ?) séparément de la qualité de la réponse finale. Si le retrieval est mauvais, augmenter la taille du contexte ne fera que noyer le signal dans du bruit.

Des métriques comme le MRR (Mean Reciprocal Rank) ou le Recall@k vous donneront une image fiable. Pas besoin d'un framework sophistiqué — un script Python avec quelques boucles suffit pour commencer.

## Coûts et garde-fous

Un RAG en production appelle des embeddings à chaque requête. À 10 000 requêtes/jour avec un modèle comme text-embedding-3-large, on parle de quelques dollars. Mais le coût caché est dans le stockage vectoriel et les appels LLM pour la génération.

Mettez en place un cache sémantique : si deux questions sont proches (cosine similarity > 0.95), retournez la réponse déjà calculée. Ça divise vos coûts par deux à trois sur un trafic réel.

Enfin, prévoyez un fallback. Quand le RAG ne trouve rien de pertinent, il doit le dire plutôt qu'inventer. Un seuil de confiance sur le score de similarité, couplé à un message explicite, évite les hallucinations les plus embarrassantes.
