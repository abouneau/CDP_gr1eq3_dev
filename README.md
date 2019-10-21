# Conduite de projet - Groupe 1 équipe 3

## Membres de l'équipe
- BOUNEAU Axel
- DUROC   Nicolas
- ROULET  Florian

## Définitions

- Un **Visiteur** est quelqu'un qui accède au site. Il a le statut de **Visiteur** tant qu'il n'est pas identifié. Il peut créer un compte, ou s'identifer sur son compte s'il en a déjà un.

- Un **Utilisateur** est un **Visiteur** qui s'est identifié sur son compte. Il peut créer un projet. Il sera automatiquement  **Administrateur** de ce projet.

- Un **Collaborateur** est un membre d'un projet. Il a les droits d'ajout, de suppression et de modification des issues, tâches, etc...

- Un **Administrateur** est un **Collaborateur** avec des droits supplémentaires : il peut ajouter et supprimer des **Collaborateurs** à un projet. Il peut aussi promouvoir un **Collaborateur** au rang d' **Administrateur**. Il peut enfin supprimer le projet.

- Une **Issue** comprend les champs suivants :
  - Un ID unique
  - Un nom
  - Une description, de la forme "*En tant que* ..., *je peux* ..., *afin de* ..."
  - Une difficulté, sous la forme d'un nombre de la suite de Fibonacci, décrivant la difficulté estimée pour la réalisation de l'issue, relativement aux autres issues. Un nombre élevé représente une difficulté élevée.
  - Une priorité (haute ou basse).

- Une **Tâche** comprend les champs suivants : 
  - Un nom
  - Le travail à faire
  - Les issues auxquelles elle est liée
  - Les personnes en charge de sa réalisation
  - Un état d'avancement (À faire, En cours, Terminée)

- Un **Test** comprend les champs suivants :
  - Un nom
  - Une description de la forme "*Étant donné*..., *lorsque*..., *alors*...".

- Un **Sprint** comprend les champs suivants :
  - Un numéro de sprint
  - Une durée (en jours ou en semaines)

- Une **Release** comprend les champs suivants :
  - Un numéro de version
  - Une date de sortie
  - Une liste des issues réalisées par la release
  - Un lien de téléchargement
  - Un lien vers la **documentation** (de code, administrateur, et utilisateur) relative à la release

## Backlog

|ID   | CATEGORIE  | FEATURE  | DESCRIPTION  | DIFFICULTÉ  | PRIORITÉ |
|---|---|---|---|---|---|
| US1  | Issue  | Création  | **En tant que** Collaborateur,  **je peux** créer une issue en cliquant sur le bouton *Nouvelle Issue* depuis la page *Backlog*, **afin de** pouvoir compléter ses champs. |   |  Haute |
| US2 |  Issue |  Liste | **En tant que** Collaborateur, **je peux** accéder à la liste des issues en cliquant sur la page *backlog*, **afin d'** avoir une vue d'ensemble de toutes les issues. Pour plus de lisibilité, on ne voit dans la liste que l'id, le nom et la priorité de chaque issue. |   | Haute  |
| US3 |  Issue |  Accès | **En tant que** Collaborateur, **je peux** afficher l'ensemble des champs d'une issue en cliquant sur le bouton *détails* présent à côté d'une issue dans la liste des issues, **afin de** lire le contenu des champs qui lui sont attachés.  |   | Haute  |
| US4 |  Issue | Modification  |  **En tant que** Collaborateur, **je peux** modifier les champs d'une issue en cliquant sur le bouton *Editer* présent à côté d'une issue dans la liste des issues, **afin d'**  y apporter des précisions ou changements. |   |  Haute |
| US5 |  Issue |  Suppression | **En tant que** Collaborateur, **je peux** supprimer une issue en cliquant sur le bouton *Supprimer* présent à côté d'une issue dans la liste des issues, **afin de** l'effacer de la liste de mes issues.  |   | Haute  |
| US6 | Tâche  | Création | **En tant que** Collaborateur, **je peux** créer une tâche en cliquant sur le bouton *Nouvelle Tâche* depuis la page *Tâches*, **afin de** pouvoir compléter ses champs. |   | Haute  |
| US7 |  Tâche |  Liste | **En tant que** Collaborateur, **je peux** accéder à la liste des tâches en cliquant sur la page *Tâches*, **afin d'** avoir une vue d'ensemble de toutes les tâches. |   | Haute  |
| US8 | Tâche | Modification | **En tant que** Collaborateur, **je peux** modifier les champs d'une tâche en cliquant sur le bouton *Editer* présent à côté d'une tâche dans la liste des tâches, **afin d'**  y apporter des précisions ou changements. | | Haute |
| US9 | Sprint | Création | **En tant que** Collaborateur,  **je peux** créer un sprint en cliquant sur le bouton *Nouveau Sprint* depuis la page *Sprints*, **afin de** pouvoir compléter ses champs. |  | Haute |
| US10 | Sprint | Ajout de tâche | **En tant que** Collaborateur, **je peux** ajouter une tâche déjà créée à un sprint existant, **afin de** définir quelles tâches doivent être effectuées pendant ce sprint. |  | Haute |
| US11 | Sprint | Retrait de tâche | **En tant que** Collaborateur, **je peux** retirer une tâche d'un sprint, **afin de** corriger un éventuel ajout indésiré. |  | Haute |
| US12 |  Compte | Création  |  **En tant que** Visiteur, **je peux** créer un compte en renseignant un *mail*, un *nom d'utilisateur*, un *mot de passe*, **afin de** gérer mes projets. |   |  Basse |
| US13 | Compte | Connexion | **En tant que** Visiteur, **je peux** me connecter à mon compte grâce à mon *mail* (ou mon *nom d'utilisateur*) et mon *mot de passe*, **afin d'** accéder à mes projets. |   | Basse  |
| US14 | Compte | Déconnexion | **En tant qu'** Utilisateur, **je peux** me déconnecter de mon compte, **afin de** ne plus être connecté. |   |  Basse |
| US15 | Projet | Création | **En tant qu'** Utilisateur, **je peux** créer un projet, **afin de** m'y enregistrer en tant qu'Administrateur. |   | Basse  |
| US15 | Projet | Ajout collaborateur | **En tant qu'** Administrateur, **je peux** ajouter des collaborateurs, **afin de** leur donner accès au projet. |   | Basse |
| US17 | Projet | Modification des droits des Membres | **En tant qu'** Administrateur, **je peux** modifier les droits d'un collaborateur, **afin de** le promouvoir Administrateur. |   |  Basse |
| US18 | Projet | Exclusion d'un Membre | **En tant qu'** Administrateur, **je peux** exclure un collaborateur, **afin de** lui interdire l'accès au projet. |   | Basse  |
| US19 | Projet | Suppression | **En tant qu'** Administrateur, **je peux** supprimer le projet, **afin d'** y mettre fin. |   |  Basse |
| US20 | Test | Création | **En tant que** Collaborateur,  **je peux** créer un test en cliquant sur le bouton *Nouveau Test* depuis la page *Tests*, **afin de** pouvoir compléter ses champs. |  | Basse |
| US21 |  Test |  Liste | **En tant que** Collaborateur, **je peux** accéder à la liste des tests en cliquant sur la page *test*, **afin d'** avoir une vue d'ensemble de tous les test. |   | Basse  |
| US22 | Test | Modification | **En tant que** Collaborateur, **je peux** modifier les champs d'un test en cliquant sur le bouton *Editer* présent à côté d'un test dans la liste des tests, **afin d'**  y apporter des précisions ou changements. |  | Basse |
| US23 | Test | Suppression | **En tant que** Collaborateur, **je peux** supprimer un test en cliquant sur le bouton *Supprimer* présent à côté d'un test dans la liste des tests, **afin de** l'effacer de la liste de mes tests. |  | Basse |
| US24 | Release | Créer | **En tant qu'** Administrateur, **je peux** créer une release en cliquant sur le bouton *Nouvelle Release* sur la page *Releases*, **afin de** pouvoir completer ses champs. |  | Basse |
| US25 |  Release |  Liste | **En tant qu'** Administrateur, **je peux** accéder à la liste des releases en cliquant sur la page *Releases*, **afin d'** avoir une vue d'ensemble de toutes les releases. |   | Basse  |
| US26 | Release | Modification | **En tant qu'** Administrateur, **je peux** modifier les champs d'une release en cliquant sur le bouton *Editer* présent à côté d'une release dans la liste des releases, **afin de** corriger une éventuelle erreur. |  | Basse |
