import coverAi from "@/assets/cover-ai.jpg";
import coverPipeline from "@/assets/cover-pipeline.jpg";
import coverSql from "@/assets/cover-sql.jpg";
import coverAgents from "@/assets/cover-agents.jpg";

export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  cover: string;
  body: ArticleSection[];
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
  body: [
    {
      heading: "Le prototype, c'est la partie facile",
      paragraphs: [
        "Tout le monde a un RAG qui fonctionne en démo. Vous collez quelques documents, vous posez une question, le modèle répond avec une citation. Impressionnant — jusqu'au moment où on le branche sur 500 PDF réels, avec du bruit, des doublons, des tableaux scannés et des notes de bas de page.",
        "Le vrai travail commence quand on passe de la démo au système. Et c'est là que la plupart des projets s'effondrent : non pas parce que le modèle est mauvais, mais parce que le pipeline de données en amont est négligé.",
      ],
    },
    {
      heading: "Découper intelligemment, pas juste en morceaux",
      paragraphs: [
        "La tentation classique : découper le texte en chunks de 500 tokens, les embedder, les stocker. Ça marche pour un POC. En production, c'est insuffisant.",
        "Un bon découpage respecte la structure du document. Un paragraphe de conclusion ne devrait jamais se retrouver collé à un tableau de résultats. Les sections, les titres, les listes à puces — chacun devient une unité sémantique. Des outils comme Unstructured ou LlamaIndex proposent des split-aware parsers qui font ce travail mieux qu'un simple `text.split('\\n\\n')`.",
        "L'autre piège : les chunks trop petits. Un embedding de 20 tokens ne contient pas assez de contexte pour être utile. Visez 300 à 800 tokens par chunk, avec un chevauchement de 10-15% pour ne pas couper les phrases en deux.",
      ],
    },
    {
      heading: "Évaluer avant d'optimiser",
      paragraphs: [
        "On neaméliore pas ce qu'on ne mesure pas. Avant de tuner les embeddings ou de changer de modèle, constituez un jeu de test : 50 à 100 paires (question, réponse attendue) issues de vos vraies données.",
        "Mesurez la précision du retrieval (les bons chunks sont-ils dans les top-k ?) séparément de la qualité de la réponse finale. Si le retrieval est mauvais, augmenter la taille du contexte ne fera que noyer le signal dans du bruit.",
        "Des métriques comme le MRR (Mean Reciprocal Rank) ou le Recall@k vous donneront une image fiable. Pas besoin d'un framework sophistiqué — un script Python avec quelques boucles suffit pour commencer.",
      ],
    },
    {
      heading: "Coûts et garde-fous",
      paragraphs: [
        "Un RAG en production appelle des embeddings à chaque requête. À 10 000 requêtes/jour avec un modèle comme text-embedding-3-large, on parle de quelques dollars. Mais le coût caché est dans le stockage vectoriel et les appels LLM pour la génération.",
        "Mettez en place un cache sémantique : si deux questions sont proches (cosine similarity > 0.95), retournez la réponse déjà calculée. Ça divise vos coûts par deux à trois sur un trafic réel.",
        "Enfin, prévoyez un fallback. Quand le RAG ne trouve rien de pertinent, il doit le dire plutôt qu'inventer. Un seuil de confiance sur le score de similarité, couplé à un message explicite, évite les hallucinations les plus embarrassantes.",
      ],
    },
  ],
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
    body: [
      {
        heading: "Le syndrome de la stack surdimensionnée",
        paragraphs: [
          "Airflow pour l'orchestration, dbt pour la transformation, Spark pour le processing, Kafka pour le streaming, Snowflake pour l'entreposage, Fivetran pour l'ingestion… En voulant copier les géants de la tech, beaucoup d'équipes se retrouvent avec une infrastructure qui consomme plus de temps de maintenance que de valeur ajoutée.",
          "La vérité, c'est qu'une équipe de 3 à 5 personnes n'a pas les mêmes besoins qu'une équipe de 50. Et la bonne nouvelle, c'est qu'on peut faire beaucoup avec peu.",
        ],
      },
      {
        heading: "Le minimum viable : trois briques",
        paragraphs: [
          "Un pipeline moderne tient sur trois composants : un extracteur qui récupère la donnée source, un transformateur qui la nettoie et la structure, et un chargeur qui la pousse vers la destination finale.",
          "Pour l'extraction, des outils comme dlt (data load tool) ou Sling remplacent avantageusement Fivetran sur des volumes modérés. Ils s'exécutent en local, s'intègrent facilement dans un cron, et ne nécessitent pas de service SaaS.",
          "Pour la transformation, SQL suffit dans 80% des cas. dbt reste excellent, mais un simple script Python qui exécute des requêtes dans l'ordre fait très bien l'affaire pour les petits projets. L'important est de versionner les requêtes et de documenter les transformations.",
        ],
      },
      {
        heading: "L'orchestration sans la complexité",
        paragraphs: [
          "Airflow est puissant mais lourd. Pour une pipeline qui tourne une fois par jour, un cron classique avec des alertes Slack en cas d'erreur suffit amplement. Si vous avez besoin de dépendances entre tâches, Dagster ou Prefect offrent une expérience développeur bien meilleure qu'Airflow, avec moins d'infrastructure à gérer.",
          "Le piège est de sur-orchestrer. Commencez par un DAG simple : extraction → transformation → chargement. N'ajoutez de la complexité que quand un vrai besoin se présente, pas parce qu'un article de blog vous a fait peur avec le « data mesh ».",
        ],
      },
      {
        heading: "Monitoring : la couche qu'on oublie",
        paragraphs: [
          "Le monitoring d'un pipeline, ce n'est pas juste « est-ce que le job a réussi ? ». C'est aussi : la donnée est-elle fraîche ? Les volumes sont-ils cohérents avec la tendance ? Y a-t-il des colonnes qui sont suddenly toutes nulles ?",
          "Des outils comme Elementary (pour dbt) ou même une simple table de métadonnées qui log chaque run avec le nombre de lignes traitées, la durée et les erreurs, permettent de détecter les problèmes avant que les utilisateurs ne les remarquent.",
          "L'investissement le plus rentable en data engineering n'est pas un outil — c'est l'habitude de vérifier que ce qu'on a livré hier fonctionne encore aujourd'hui.",
        ],
      },
    ],
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
    body: [
      {
        heading: "Le SQL jetable est un mensonge",
        paragraphs: [
          "On écrit souvent du SQL en pensant que c'est temporaire. « Je lance la requête une fois, j'exporte le CSV, et c'est fini. » Trois mois plus tard, quelqu'un demande « tu peux me relancer cette requête ? » — et personne ne sait ce que fait la ligne 47.",
          "Le SQL n'est pas un langage jetable. C'est un langage de production. Les requêtes que vous écrivez aujourd'hui seront relues, réutilisées et modifiées. Écrivez-les en conséquence.",
        ],
      },
      {
        heading: "Les CTE comme documentation vivante",
        paragraphs: [
          "Les Common Table Expressions (CTE) ne sont pas qu'une question de style — elles racontent une histoire. Au lieu d'un monstre de 200 lignes avec des sous-requêtes imbriquées, chaque CTE décrit une étape logique : filtrage, agrégation, jointure.",
          "Un bon nom de CTE remplace un commentaire. `with active_users as (...)` est plus clair que `with cte1 as (...)`. Quand vous lisez la requête de haut en bas, vous comprenez le raisonnement sans avoir besoin d'annotations.",
          "L'astuce : nommez vos CTE comme des étapes de raisonnement. `raw_orders`, `filtered_orders`, `orders_with_revenue`, `monthly_summary` — chaque nom raconte ce que la CTE contient.",
        ],
      },
      {
        heading: "Nommage : des conventions, pas de l'art",
        paragraphs: [
          "Snake_case pour les colonnes. Pluriel pour les tables (ou singulier, mais choisissez une convention et collez-y). Pas d'abréviations obscures : `cust_id` → `customer_id`, `rev` → `revenue`, `qty` → `quantity`.",
          "Les alias de tables doivent être explicites dans les requêtes complexes. `o` pour `orders`, `c` pour `customers` — acceptable dans une jointure simple. Mais dans une requête avec 6 jointures, préférez des alias plus descriptifs : `ord`, `cust`, `prod`.",
          "Et surtout : documentez les requêtes complexes en commentaire en haut du fichier. Pas ce que fait chaque ligne — pourquoi la requête existe, quel problème métier elle résout, et quand elle a été écrite.",
        ],
      },
      {
        heading: "Tester l'intestable",
        paragraphs: [
          "Comment tester du SQL ? Pas avec un framework de tests unitaires classique — mais avec des assertions simples. Vérifiez que les totaux sont cohérents (somme des lignes = total de la facture), que les jointures ne créent pas de doublons, que les filtres ne suppriment pas des données valides.",
          "Des outils comme dbt ont intégré cette approche avec les tests de modèles. Mais même sans dbt, une requête `SELECT COUNT(*) ... HAVING COUNT(*) > 1` placée après un `GROUP BY` vous évitera des surprises.",
          "L'habitude la plus rentable : après chaque requête qui produit un résultat, posez-vous la question « est-ce que ce nombre a du sens ? ». Un revenue de -3 milliards ou un taux de conversion de 470% devrait déclencher une alerte mentale.",
        ],
      },
    ],
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
    body: [
      {
        heading: "L'illusion de la démo",
        paragraphs: [
          "Les agents IA impressionnent en démo. Un agent qui résume des emails, un qui analyse des documents, un qui écrit du code. Mais la démo et la production sont deux mondes différents. En démo, les inputs sont propres, les cas limites sont absents, et personne ne vérifie la sortie.",
          "Le premier réflexe quand on évalue un agent devrait être : « que se passe-t-il quand l'input est ambigu, incomplet ou carrément faux ? ». Si la réponse est « l'agent invente quelque chose de plausible », alors ce n'est pas un agent — c'est un générateur de risques.",
        ],
      },
      {
        heading: "Les tâches où les agents excellent",
        paragraphs: [
          "Les agents IA brillent dans les tâches répétitives, bien définies, avec des critères de validation clairs. Le tri d'emails (spam vs. non-spam, catégorisation par urgence). La extraction de données structurées depuis des documents semi-structurés (factures, CVs, contrats). La traduction de spécifications en code boilerplate.",
          "Le point commun de ces tâches : elles ont un feedback loop. On peut vérifier si l'agent a correctement extrait le montant d'une facture en comparant avec la source. On peut vérifier si le code compile. Cette vérifiabilité est ce qui distingue un agent utile d'un agent expérimental.",
          "Un autre terrain gagnant : la synthèse de documents longs. Résumer un rapport de 50 pages en 10 bullet points, c'est exactement le genre de tâche où un LLM apporte une valeur réelle — à condition que le résumé soit vérifié par un humain pour les points critiques.",
        ],
      },
      {
        heading: "Les tâches où ils échouent",
        paragraphs: [
          "Les agents sont mauvais quand la tâche nécessite du jugement contextuel, de la créativité véritable, ou quand les erreurs sont coûteuses et irréversibles. Un agent qui rédige un email de refus à un candidat, un qui prend des décisions financières, un qui diagnostique un patient — ces cas demandent une validation humaine systématique.",
          "L'autre écueil : les tâches où le contexte dépasse la fenêtre de contexte du modèle. Un agent qui doit tenir compte de l'historique complet d'un projet, de la politique de l'entreprise, et des préférences implicites d'un client — il manque souvent d'informations pour bien faire.",
          "Le piège le plus subtil : les tâches où l'agent a l'air de réussir mais produit des résultats subtilement incorrects. Un résumé qui omet un point crucial, du code qui compile mais contient un bug logique, une analyse qui ignore un facteur confondant. C'est là que le coût de la supervision dépasse le gain d'automatisation.",
        ],
      },
      {
        heading: "Construire avec lucidité",
        paragraphs: [
          "La bonne approche pour intégrer un agent dans un workflow : commencez par définir le pire cas. Quel est le coût d'un échec ? Si c'est un email mal résumé, le risque est faible. Si c'est une erreur de facturation, le risque est élevé. Adaptez le niveau de supervision en conséquence.",
          "Mettez en place un système de feedback : chaque sortie de l'agent est notée par un humain (correcte / partiellement correcte / incorrecte). Ces données alimentent à la fois le monitoring et le fine-tuning futur. Sans feedback, un agent ne s'améliore pas — il stagne.",
          "Enfin, acceptez que certains workflows ne gagnent pas d'automatisation. Parfois, un humain avec un bon template fait mieux qu'un agent avec un bon prompt. L'automatisation n'est pas une fin en soi — c'est un moyen d'allouer le temps humain là où il compte vraiment.",
        ],
      },
    ],
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
