## Défintions

- Un **visiteur** est quelqu'un qui accède au site. Il a le statut de **visiteur** tant qu'il n'est pas identifié. Il peut créer un compte, ou s'identifer sur son compte s'il en a déjà un.

- Un **utilisateur** est un **visiteur** qui s'est identifié sur son compte. Il peut créer un projet. Il sera automatiquement  **administrateur** de ce projet.

- Un **collaborateur** est un membre d'un projet. Il a les droits d'ajout, de suppression et de modification des issues, tâches, etc...

- Un **administrateur** est un **collaborateur** avec des droits supplémentaires : il peut ajouter et supprimer des **collaborateurs** à un projet. Il peut aussi promouvoir un **collaborateur** au rang d' **administrateur**. Il peut enfin supprimer le projet.

- Une **issue** comprend les champs suivants :
        - Un ID unique
        - Un nom
        - Une description, de la forme "En tant que ..., je peux ..., afin de ..."
        - Une difficulté, sous la forme d'un nombre de la suite de Fibonacci, décrivant la difficulté estimée pour la réalisation de l'issue, relativement aux autres issues. Un nombre élevé représente une difficulté élevée.
        - Une priorité (haute ou basse).

- Une **tâche** comprend les champs suivants : 
        - Un nom
        - Le travail à faire
        - Les issues auxquelles elle est liée
        - Les personnes en charge de sa réalisation
        - Un état d'avancement (à faire, en cours, terminée)

## Backlog

|ID   | CATEGORIE  | FEATURE  | DESCRIPTION  | DIFFICULTE  | PRIORITE |
|---|---|---|---|---|---|
| US1  | Issue  | Création  | **En tant que** Collaborateur,  **je peux** créer une issue en cliquant sur le bouton *Nouvelle Issue* depuis l'onglet *Backlog*, **afin de** pouvoir compléter ses champs. |   |  Haute |
| US2 |  Issue |  Liste | **En tant que** Collaborateur, **je peux** accéder à la liste des issues en cliquant sur l'onglet *backlog*, **afin d'** avoir une vue d'ensemble de toutes les issues. Pour plus de lisibilité, on ne voit dans la liste que l'id, le nom et la priorité de chaque issue. |   | Haute  |
| US3 |  Issue |  Accès | **En tant que** Collaborateur, **je peux** afficher l'ensemble des champs d'une issue en cliquant sur le bouton *détails* présent à côté d'une issue dans la liste des issues, **afin de** lire le contenu des champs qui lui sont attachés.  |   | Haute  |
| US4 |  Issue | Modification  |  **En tant que** Collaborateur, **je peux** modifier les champs d'une issue en cliquant sur le bouton *Editer* présent à côté d'une issue dans la liste des issues, **afin d'**  y apporter des précisions ou changements. |   |  Haute |
| US5 |  Issue |  Suppression | **En tant que** Collaborateur, **je peux** supprimer une issue en cliquant sur le bouton *Supprimer* présent à côté d'une issue dans la liste des issues, **afin de** la supprimer.  |   | Haute  |
| US6 | Tâche  | Création | **En tant que** Collaborateur, **je peux** créer une tâche en cliquant sur le bouton *Nouvelle Tâche* depuis l'onglet *Tâches*, **afin de** pouvoir compléter ses champs. |   | Haute  |
| US7 |  Tâche |  Liste | **En tant que** Collaborateur, **je peux** accéder à la liste des tâches en cliquant sur l'onglet *Tâches*, **afin d'** avoir une vue d'ensemble de toutes les tâches. |   | Haute  |
| US8 | Tâche | Modification | **En tant que** Collaborateur, **je peux** modifier les champs d'une tâche en cliquant sur le bouton *Editer* présent à côté d'une tâche dans la liste des tâches, **afin d'**  y apporter des précisions ou changements. | | Haute |
| US9 |  Compte | Création  |  **En tant que** Visiteur, **je peux** créer un compte, **afin de** gérer mes projets. |   |  Basse |
| US10 | Compte | Connexion | **En tant que** Visiteur, **je peux** me connecter à mon compte, **afin d'** accéder à mes projets. |   | Basse  |
| US11 | Compte | Déconnexion | **En tant qu'** utilisateur, **je peux** me déconnecter de mon compte, **afin de** ne plus être connecté. |   |  Basse |
| US12 | Projet | Création | **En tant qu'** Utilisateur, **je peux** créer un projet, **afin de** m'y enregistrer en tant qu'Administrateur de projet. |   | Basse  |
| US13 | Projet | Ajout collaborateur | **En tant qu'** Administrateur de projet, **je peux** ajouter des collaborateurs, **afin de** leur donner accès au projet. |   | Basse  |
| US14 | Projet | Modification des droits des Membres | **En tant qu'** Administrateur de projet, **je peux** modifier les droits d'un collaborateur, **afin de** le promouvoir Administrateur de projet. |   |  Basse |
| US15 | Projet | Exclusion d'un Membre | **En tant qu'** Administrateur de projet, **je peux** exclure un collaborateur, **afin de** lui interdire l'accès au projet. |   | Basse  |
| US16 | Projet | Suppression | **En tant qu'** Administrateur de projet, **je peux** supprimer le projet, **afin d'** y mettre fin. |   |  Basse |