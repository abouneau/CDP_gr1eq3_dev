## Défintions

- Un **visiteur** est quelqu'un qui accède au site. Il a le statut de **visiteur** tant qu'il n'est pas identifié. Il peut créer un compte, ou s'identifer sur son compte s'il en a déjà un.

- Un **utilisateur** est un **visiteur** qui s'est identifié sur son compte. Il peut créer un projet. Il sera automatiquement  **administrateur** de ce projet.

- Un **collaborateur** est un membre d'un projet. Il a les droits d'ajout, de suppression et de modification des issues, tâches, etc...

- Un **administrateur** est un **collaborateur** avec des droits supplémentaires : il peut ajouter et supprimers des **collaborateurs** à un projet. Il peut aussi promouvoir un **collaborateur** au rang d' **administrateur**. Il peut enfin supprimer le projet.

## Backlog

|ID   | CATEGORIE  | FEATURE  | DESCRIPTION  | DIFFICULTE  | PRIORITE |
|---|---|---|---|---|---|
| US1  | Issue  | Création  | **En tant que** Collaborateur,  **je peux** créer une issue, **afin de** pouvoir la compléter. |   |   |
| US2  |  Issue | Définition  | **En tant que** Collaborateur, **je peux** compléter les champs de l'issue, **afin de** la définir.  |  |   |
| US3 |  Issue | Modification  |  **En tant que** Collaborateur, **je peux** selectionner une issue (en cliquant dessus), **afin de** modifier ses champs. |   |   |
| US4 |  Issue |  Liste | **En tant que** Collaborateur, **je peux** accéder à la liste des issues, **afin d'** en sélectionner une.  |   |   |
| US5 |  Issue |  Accès | **En tant que** Collaborateur, **je peux** accéder à une issue, **afin de** lire le contenu des champs qui lui sont attachés.  |   |   |
| US6 |  Issue |  Suppression | **En tant que** Collaborateur, **je peux** supprimer une issue (depuis la page de la liste), **afin de** la supprimer.  |   |   |
| US7 |  Issue |  Prorité | **En tant que** Collaborateur, **je peux** définir la priorité [Haute, Normale, Basse] d'une issue (avec une liste déroulante), **afin de** classer les issues par priorité.  |   |   |
| US8 |  Issue |  Difficulté | **En tant que** Collaborateur, **je peux** assigner à une issue une difficulté (nombres de Fibonacci en liste déroulante), **afin d'** estimer le temps nécessaire à sa réalisation.  |   |   |
| US9 |  Compte | Création  |  **En tant que** Visiteur, **je peux** créer un compte, **afin de** gérer mes projets. |   |   |
| US10 | Compte | Connexion | **En tant que** Visiteur, **je peux** me connecter à mon compte, **afin d'** accéder à mes projets. |   |   |
| US11 | Compte | Déconnexion | **En tant qu'** utilisateur, **je peux** me déconnecter de mon compte, **afin de** ne plus être connecté. |   |   |
| US12 | Projet | Création | **En tant qu'** Utilisateur, **je peux** créer un projet, **afin de** m'y enregistrer en tant qu'Administrateur de projet. |   |   |
| US13 | Projet | Ajout collaborateur | **En tant qu'** Administrateur de projet, **je peux** ajouter des collaborateurs, **afin de** leur donner accès au projet. |   |   |
| US14 | Projet | Modification des droits des Membres | **En tant qu'** Administrateur de projet, **je peux** modifier les droits d'un collaborateur, **afin de** le promouvoir Administrateur de projet. |   |   |
| US15 | Projet | Exclusion d'un Membre | **En tant qu'** Administrateur de projet, **je peux** exclure un collaborateur, **afin de** lui interdire l'accès au projet. |   |   |
| US16 | Projet | Suppression | **En tant qu'** Administrateur de projet, **je peux** supprimer le projet, **afin d'** y mettre fin. |   |   |
| US17 | Tâche  | Création | **En tant que** Collaborateur, **je peux** créer une tâche, **afin de** la définir. |   |   |
| US18 | Tâche  | État | **En tant que** Collaborateur, **je peux** modifier l'état [À faire, En cours, Terminée] d'une tâche, **afin de** les trier par état. |   |   |
| US19 | Tâche  | Modification | **En tant que** Collaborateur, **je peux** modifier les champs d'une tâche, **afin de** la mettre à jour |   |   |
| US20 | Release |  | **En tant que** , **je peux** , **afin de**  |   |   |