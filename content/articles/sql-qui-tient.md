---
title: "Écrire du SQL que l'on relira encore dans six mois"
slug: "sql-qui-tient"
excerpt: "Nommage, CTE, tests : les habitudes simples qui transforment une requête jetable en actif d'équipe."
category: "Analytics"
date: "28 juillet 2026"
readingTime: "7 min"
cover: "/media/cover-sql.jpg"
---

## Le SQL jetable est un mensonge

On écrit souvent du SQL en pensant que c'est temporaire. « Je lance la requête une fois, j'exporte le CSV, et c'est fini. » Trois mois plus tard, quelqu'un demande « tu peux me relancer cette requête ? » — et personne ne sait ce que fait la ligne 47.

Le SQL n'est pas un langage jetable. C'est un langage de production. Les requêtes que vous écrivez aujourd'hui seront relues, réutilisées et modifiées. Écrivez-les en conséquence.

## Les CTE comme documentation vivante

Les Common Table Expressions (CTE) ne sont pas qu'une question de style — elles racontent une histoire. Au lieu d'un monstre de 200 lignes avec des sous-requêtes imbriquées, chaque CTE décrit une étape logique : filtrage, agrégation, jointure.

Un bon nom de CTE remplace un commentaire. `with active_users as (...)` est plus clair que `with cte1 as (...)`. Quand vous lisez la requête de haut en bas, vous comprenez le raisonnement sans avoir besoin d'annotations.

L'astuce : nommez vos CTE comme des étapes de raisonnement. `raw_orders`, `filtered_orders`, `orders_with_revenue`, `monthly_summary` — chaque nom raconte ce que la CTE contient.

## Nommage : des conventions, pas de l'art

Snake_case pour les colonnes. Pluriel pour les tables (ou singulier, mais choisissez une convention et collez-y). Pas d'abréviations obscures : `cust_id` → `customer_id`, `rev` → `revenue`, `qty` → `quantity`.

Les alias de tables doivent être explicites dans les requêtes complexes. `o` pour `orders`, `c` pour `customers` — acceptable dans une jointure simple. Mais dans une requête avec 6 jointures, préférez des alias plus descriptifs : `ord`, `cust`, `prod`.

Et surtout : documentez les requêtes complexes en commentaire en haut du fichier. Pas ce que fait chaque ligne — pourquoi la requête existe, quel problème métier elle résout, et quand elle a été écrite.

## Tester l'intestable

Comment tester du SQL ? Pas avec un framework de tests unitaires classique — mais avec des assertions simples. Vérifiez que les totaux sont cohérents (somme des lignes = total de la facture), que les jointures ne créent pas de doublons, que les filtres ne suppriment pas des données valides.

Des outils comme dbt ont intégré cette approche avec les tests de modèles. Mais même sans dbt, une requête `SELECT COUNT(*) ... HAVING COUNT(*) > 1` placée après un `GROUP BY` vous évitera des surprises.

L'habitude la plus rentable : après chaque requête qui produit un résultat, posez-vous la question « est-ce que ce nombre a du sens ? ». Un revenue de -3 milliards ou un taux de conversion de 470% devrait déclencher une alerte mentale.
