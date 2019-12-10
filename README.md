[![Build Status](https://travis-ci.com/abouneau/CDP_gr1eq3_dev.svg?branch=master)](https://travis-ci.com/abouneau/CDP_gr1eq3_dev)

# Conduite de projet - Groupe 1 équipe 3

## Membres de l'équipe
- BOUNEAU Axel
- DUROC   Nicolas
- ROULET  Florian

## Sections :
- [Définitions](#définitions)
- [Backlog](#backlog)
- [Burdown chart](#burndown-chart)
- [Installation](#installation-et-lancement-du-serveur)
- [Fonctionnement et utilisation du site](#fonctionnement-et-utilisation-du-site)
- [Sprints et tâches](#informations-sur-les-sprints-et-les-tâches)
- [Releases](#releases)

## Définitions

- Un **Visiteur** est quelqu'un qui accède au site. Il a le statut de **Visiteur** tant qu'il n'est pas identifié. Il peut créer un compte, ou s'identifer sur son compte s'il en a déjà un.

- Un **Utilisateur** est un **Visiteur** qui s'est identifié sur son compte. Il peut créer un projet. Il sera automatiquement  **Administrateur** de ce projet.

- Un **Collaborateur** est un membre d'un projet. Il a les droits d'ajout, de suppression et de modification des issues, tâches, etc...

- Un **Administrateur** est un **Collaborateur** avec des droits supplémentaires : il peut ajouter et supprimer des **Collaborateurs** à un projet. Il peut aussi promouvoir un **Collaborateur** au rang d' **Administrateur**. Il peut enfin supprimer le projet.

- Les champs à remplir pour la création d'une **Issue** sont les suivants :
  - Un ID unique
  - Un nom
  - Une description, de la forme "*En tant que* ..., *je peux* ..., *afin de* ..."
  - Une difficulté, sous la forme d'un nombre de la suite de Fibonacci, décrivant la difficulté estimée pour la réalisation de l'issue, relativement aux autres issues. Un nombre élevé représente une difficulté élevée.
  - Une priorité (haute ou basse).

- Les champs à remplir pour la création d'une **Tâche** sont les suivants : 
  - Un nom
  - Le travail à faire
  - Les issues auxquelles elle est liée
  - Les tâches desquelles elle dépend
  - Les personnes en charge de sa réalisation (facultatif)

- Les champs à remplir pour la création d'un **Test** sont les suivants :
  - Un nom
  - Une description de la forme "*Étant donné*..., *lorsque*..., *alors*...".

- Les champs à remplir pour la création d'un **Sprint** sont les  suivants :
  - Un numéro de sprint
  - Une durée (en jours ou en semaines)

- Les champs à remplir pour la création d'une **Release** sont les suivants :
  - Un numéro de version
  - Une date de sortie
  - Une liste des issues réalisées par la release
  - Un lien de téléchargement
  - Un lien vers la **documentation** (de code, administrateur, et utilisateur) relative à la release

- Somme des difficultés = 68

## Backlog

| ID | DESCRIPTION | DIFFICULTÉ | PRIORITÉ |
|---|---|---|---|
| US1 | **En tant que** Collaborateur, **je peux** accéder à la liste des issues en cliquant sur le bouton *backlog* présent dans le header, **afin d'** avoir une vue d'ensemble de toutes les issues. Pour plus de lisibilité, on ne voit dans la liste que l'id, le nom et la priorité de chaque issue. | 1 | Haute |
| US2 | **En tant que** Collaborateur, **je peux** voir le statut d'une issue (à faire, en cours, terminée) depuis la liste des issues grâce à la couleur de cette issue (rouge = à faire, orange = en cours, vert = terminée) **afin de** voir facilement quelles issues sont à faire / en cours / terminées. Par défaut, une issue a le statut "à faire". Elle passe au statut "en cours" quand l'une des tâches lui étant liées passe au statut "en cours". Elle passe au statut "terminée" quand toutes les tâches lui étant liées ont le statut "terminée".| 1 | Haute |
| US3 | **En tant que** Collaborateur,  **je peux** créer une issue en cliquant sur le bouton *Nouvelle Issue* depuis la page *Backlog*, **afin de** pouvoir compléter ses champs. | 3 | Haute |
| US4 | **En tant que** Collaborateur, **je peux** afficher l'ensemble des champs d'une issue, ainsi que les tâches devant être réalisées pour que l'issue soit réalisée (et leur description), en cliquant sur le bouton *détails* présent à côté d'une issue dans la liste des issues, **afin de** lire le contenu des champs qui lui sont attachés, et de savoir exactement ce qui doit être fait pour que cette issue soit réalisée. | 1 | Haute |
| US5 | **En tant que** Collaborateur, **je peux** modifier les champs d'une issue ou supprimer une issue en cliquant sur le bouton *Editer* ou sur le bouton *Supprimer* présent à côté d'une issue dans la liste des issues, **afin d'**  y apporter des précisions, ou de la supprimer de la liste des issues. | 3 | Haute |
| US6 | **En tant que** Collaborateur, **je peux** accéder à la liste des tâches en cliquant sur le bouton *Tâches* présent dans le header, **afin d'** avoir une vue d'ensemble de toutes les tâches. | 1 | Haute |
| US7 | **En tant que** Collaborateur, **je peux** voir le statut d'une tâche (à faire, en cours, terminée) depuis la liste des tâches grâce à la couleur de cette tâche (rouge = à faire, orange = en cours, vert = terminée) **afin de** voir facilement quelles tâches sont à faire / en cours / terminées. | 1 | Haute |
| US8 | **En tant que** Collaborateur, **je peux** créer une tâche en cliquant sur le bouton *Nouvelle Tâche* depuis la page *Tâches*, **afin de** pouvoir compléter ses champs. | 3 | Haute |
| US9 | **En tant que** Collaborateur, **je peux** créer une tâche en cliquant droit sur une issue présente dans la liste des issues sur la page *backlog*, puis en cliquant sur *ajouter une tâche pour cette issue* dans le menu s'étant ouvert après mon clic droit, **afin de** pouvoir créer une tâche directement liée à une issue. | 3 | Haute |
| US10 | **En tant que** Collaborateur, **je peux** lier une tâche à une issue présente dans la liste des issues sur la page *backlog*, en cliquant droit sur l'issue, puis en cliquant sur *lier cette issue à une tâche existante* dans le menu s'étant ouvert après mon clic droit, **afin de** pouvoir lier à une issue à une tâche depuis la liste des issues. | 3 | Haute |
| US11 | **En tant que** Collaborateur, **je peux** modifier les champs d'une tâche ou supprimer une tâche en cliquant sur le bouton *Editer* ou sur le bouton *Supprimer* présent à côté d'une tâche dans la liste des tâches, **afin d'**  y apporter des précisions ou de la supprimer de la liste des tâches. | 3 | Haute |
| US12 | **En tant que** Collaborateur, **je peux** assigner un Collaborateur à une tâche, et changer le statut de celle-ci, en cliquant droit sur la tâche depuis la liste des tâches, puis en cliquant sur *assigner un Collaborateur* ou *changer le statut* dans le menu apparaisant après le clic droit **afin de** choisir qui doit s'occuper de cette tâche, et quel est son statut. | 3 | Haute |
| US13 | **En tant que** Collaborateur,  **je peux** accéder à la liste des sprints en cliquant sur le bouton *Sprints* présent dans le header, **afin d'** avoir une vue d'ensemble de tous les sprints. | 3  | Basse |
| US14 | **En tant que** Collaborateur,  **je peux** créer un sprint en cliquant sur le bouton *Nouveau Sprint* depuis la page *Sprints*, **afin de** pouvoir compléter ses champs. | 3  | Basse |
| US15 | **En tant que** Collaborateur, **je peux** accéder au backlog du sprint numéro i en cliquant sur le sprint numéro i de la page *Sprints*, **afin d'** avoir une vue d'ensemble des issues qui sont programmées pour le sprint numéro i. La page *Sprint i* se découpe en deux colonnes : à gauche, on voit le backlog du sprint numéro i ; à droite, on voit l'ensemble des tâches associées aux issues du backlog du sprint numéro i. | 2 | Basse |
| US16 | **En tant que** Collaborateur, **je peux** ajouter des issues dans le sprint numéro i en cliquant sur le bouton *ajouter une issue au sprint* sur la page **Sprint**, qui permet de choisir quelle issue ajouter parmi la liste des issues non réalisées, **afin de** programmer les issues devant être réalisées durant le sprint numéro i. | 3 | Basse |
| US17 | **En tant que** Collaborateur, **je peux** transférer toutes les issues (et les tâches correspondantes) non terminées du sprint numéro i au sprint numéro i+1 en cliquant sur le bouton *transférer les issues non terminées au sprint suivant*, **afin de** pouvoir continuer à travailler dessus. | 2 | Basse |
| US18 |   **En tant que** Visiteur, **je peux** créer un compte en renseignant un *mail*, un *nom d'utilisateur*, un *mot de passe*, **afin de** gérer mes projets. |  5 |  Basse |
| US19 | **En tant que** Visiteur, **je peux** me connecter à mon compte grâce à mon *mail* (ou mon *nom d'utilisateur*) et mon *mot de passe* et me déconnecter, **afin d'** accéder à mes projets ou de me déconnecter. | 2 | Basse |
| US20 |  **En tant qu'** Utilisateur, **je peux** créer un projet, **afin de** m'y enregistrer en tant qu'Administrateur. | 3  | Basse  |
| US21 |  **En tant qu'** Administrateur, **je peux** ajouter des collaborateurs, modifier leurs droits ou les exclure, **afin de** gérer leur accès au projet et leurs droits sur celui-ci. | 3  | Basse |
| US22 | **En tant qu'** Administrateur, **je peux** supprimer le projet, **afin d'** y mettre fin. |  2 |  Basse |
| US23 | **En tant que** Collaborateur,  **je peux** créer un test en cliquant sur le bouton *Nouveau Test* depuis la page *Tests*, **afin de** pouvoir compléter ses champs. | 3 | Basse |
| US24 | **En tant que** Collaborateur, **je peux** accéder à la liste des tests en cliquant sur la page *test*, **afin d'** avoir une vue d'ensemble de tous les tests. | 1 | Basse |
| US25 |  **En tant que** Collaborateur, **je peux** modifier les champs d'un test ou supprimer un test en cliquant sur le bouton *Editer* ou sur le bouton *Supprimer* présent à côté d'un test dans la liste des tests, **afin d'**  y apporter des précisions ou de le supprimer de la liste des tests. | 3 | Basse |
| US26 |  **En tant qu'** Administrateur, **je peux** créer une release en cliquant sur le bouton *Nouvelle Release* sur la page *Releases*, **afin de** pouvoir completer ses champs. | 3 | Basse |
| US27 |  **En tant qu'** Collaborateur, **je peux** accéder à la liste des releases en cliquant sur la page *Releases*, **afin d'** avoir une vue d'ensemble de toutes les releases. | 1  | Basse  |
| US28 | **En tant qu'** Administrateur, **je peux** modifier les champs d'une release en cliquant sur le bouton *Editer* présent à côté d'une release dans la liste des releases, **afin de** corriger une éventuelle erreur. | 3 | Basse |

### Burndown chart

<img src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRcuUNXiAr1-M5QOFj5ubV4c4GDsldV0FoHFl7N8oojtEsbX-xUu3ZCFDY_VXGTMFBNCdF-pU7Gwrlg/pubchart?oid=2092740216&amp;format=image"/>

### Installation et lancement du serveur

Voir le fichier [docAdmin.md](docAdmin.md)

### Fonctionnement et utilisation du site

Voir le fichier [docUser.md](docUser.md)

### Informations sur les sprints et les tâches

Les issues du sprint 1 sont disponibles [ici](Sprint1.md).

Les tâches du sprint 1 sont disponibles [ici](Task1.md).

Les issues du sprint 2 sont disponibles [ici](Sprint2.md).

Les tâches du sprint 2 sont disponibles [ici](Task2.md).

Les issues du sprint 3 sont disponibles [ici](Sprint3.md).

Les tâches du sprint 3 sont disponibles [ici](Task3.md).

### Releases

Les issues réalisées dans chaque release sont disponibles dans les fichers [RELEASE-0.1.0](RELEASE-0.1.0.md), [RELEASE-0.2.0](RELEASE-0.2.0.md) et [RELEASE-0.3.0](RELEASE-0.3.0.md)