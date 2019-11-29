# Conduite de projet - Groupe 1 équipe 3

## Tâches du sprint 2

|ID  | DESCRIPTION  | Definition of Done | Temps prévu (pour un développeur)  | Dépendances  | US Liée(s)  | Etat | Responsable|
|---|---|---|---|---|---|---|---|
|TK3_SP1  | Modification du fichier **backlog.ejs** pour mettre en place une flèche, sur le côté gauche de l'issue, permettant d'étendre la case de la liste correspondante à l'issue pour afficher les détails (ID, nom, description, difficulté, priorité) de cette dernière.   | Depuis la page *Backlog*, on voit une flèche à gauche de chaque issue. Lorsqu'on clique dessus, on voit la description et la difficulté de l'issue. | 1h  | TK1_SP1  | US4  | Terminée  | Nicolas |
|TK4_SP1  | Modification du fichier **backlog.ejs** pour pouvoir voir l'état (à faire, en cours, terminée) d'une issue de la liste qui sera visible via la couleur de la case de cette dernière (rouge = à faire, orange = en cours, vert = terminée). | Sur la page *Backlog*, on voit l'état de chaque issue grâce à sa couleur (rouge = à faire, orange = en cours, vert = terminée) | 1h  | TK1_SP1  | US2  | Terminée  | Nicolas |
| TK12_SP1 | Modification du fichier **tasks.ejs** pour pouvoir voir l'état (à faire, en cours, terminée) d'une tâche via la couleur de cette dernière (rouge = à faire, orange = en cours, vert = terminée). | Sur la page *Tâches*, on voit l'état de chaque tâche grâce à sa couleur (rouge = à faire, orange = en cours, vert = terminée) | 1h  | TK10_SP1  | US7 | Terminée | Axel |
|TK23_SP1  | Création du fichier **issue.sel** contenant les test des fonctions présentes dans le fichier **issueManager.js** | On peut lancer les tests en lançant l'exécution du fichier issue.sel et obtenir en sortie un résultat nous indiquant les tests ayant échoué et ceux ayant réussi. Voir la fin du fichier pour plus de détails. | 1h  | TK6_SP1/TK7_SP1  | US1/US2/US3/US4/US5  | Terminée  | Nicolas |
|TK24_SP1  | Création du fichier **task.sel** contenant les test des fonctions présentes dans le fichier **taskController.js** | On peut lancer les tests en lançant l'exécution du fichier task.sel et obtenir en sortie un résultat nous indiquant les tests ayant échoué et ceux ayant réussi. Voir la fin du fichier pour plus de détails. | 1h  | TK14_SP1/TK15_SP1  | US6/US8/US9/US10/US11/US12  | Terminée  | Axel |
|TK25_SP1  | Création du fichier **log.sel** contenant les test des fonctions présentes dans le fichier **logManager.js** | On peut lancer les tests en lançant l'exécution du fichier log.sel et obtenir en sortie un résultat nous indiquant les tests ayant échoué et ceux ayant réussi. Voir la fin du fichier pour plus de détails. | 1h  | TK21_SP1  | US19  | Terminée  | Florian |
|TK26_SP1  | Création du fichier **docCode.md** contenant la documentation du code (architecture, API, code source) | Il est simple pour un développeur, après avoir lu le fichier docUser.md et regardé notre code source, de comprendre notre architecture et notre code. | 1h | Aucune | Toutes  | A faire  | Tous |
|TK27_SP1  | Création du fichier **docUser.md** contenant la documentation du site pour les utilisateurs (détail des fonctionnalités de l'outil et comment les utiliser) | Il est simple pour un utilisateur, après avoir lu le fichier docUser.md, d'utiliser pleinement notre outil. | 1h | Aucune | Toutes | A faire  | Tous |
|TK28_SP1  | Création du fichier **docAdmin.md** contenant les instructions d'installation du logiciel. Il faut préciser les pré-requis, le processus d'installation et la façon dont on peut la vérifier. | Il est simple pour un administrateur, après avoir lu le fichier docAdmin.md, d'installer notre outil. | 1h  | Aucune | Toutes  | A faire | Tous |
|TK1_SP2| Modification des fichiers **backlog.ejs**, **issueRoutes.js**, et **createTask.ejs**. Ajout d'un bouton sur chaque issue de la page Backlog, permettant de créer une nouvelle tâche qui sera liée à l'issue depuis laquelle on a cliqué. | Quand on clique sur le bouton *ajouter une tâche* qui se situe à côté de l'issue USX dans la liste des issues (sur la page Backlog), on est redirigé sur la page de création d'une tâche, avec le champ *issues liées* pré-rempli avec USX. | 1h00 | Aucune | US9 | Terminée | Nicolas |
|TK2_SP2| Modification des fichiers **backlog.ejs** et **issueController.js**. Ajout d'un bouton sur chaque issue de la page Backlog, permettant de lier une tâche existante à l'issue depuis laquelle on a cliqué. | Quand on clique sur le bouton *lier à une tâche existante* qui se situe à côté de l'issue USX dans la liste des issues (sur la page Backlog), un menu contenant la liste des tâches existantes apparait. Quand je clique sur l'une d'elles, elle est ajoutée à la liste des tâches liées à l'USX. De même, l'USX est ajoutée à la liste des issues liées à la tâche sur laquelle j'ai cliqué. | 3h00 | Aucune | US10 | Terminée | Nicolas |
| TK3_SP2 | Modification de la structure de la base de données pour permettre la gestion des projets. | Mise en place d'une arborescence dans la base de données. La base de données *Projets* contient la liste des projets, et chaque projet contient une liste d'issues, une liste de tâches, une liste de sprints, une liste de tests, une liste de releases et une liste de collaborateurs. | 4h | Aucune | Toutes | A faire | Axel |
| TK4_SP2 | Création des fichiers **projectModel.js**, **projectRoutes.js**, et **projectController.js** pour implémenter les fonctions CRUD sur les projets, et les routes correspondantes. | Il est possible d'ajouter, modifier, et supprimer des projets grâce à des requêtes post et get qui appelleront les fonctions adéquates. | 2h00 | TK3_SP2 | US12/US20/US21/US22 | Terminée | Axel |
| TK5_SP2 | Création des fichiers **projects.ejs** et **createProject.ejs** permettant d'utiliser les fonctions CRUD liées aux projets depuis notre site web. | Sur la page projects, on voit la liste de tous les projets pour lequels on est collaborateur ou administrateur. Sur la page createProject, on a un formulaire permettant de créer un projet. Les champs de ce formulaire sont : *nom du projet*, *description*, *collaborateurs*. | 1h00 | TK4_SP2 | US20/US21/US22 | Terminée | Axel |
| TK6_SP2| Création des fichiers **testModel.js**, **testRoutes.js**, et **testController.js** pour implémenter les fonctions CRUD sur les tests, et les routes correspondantes.| Il est possible d'ajouter, modifier, et supprimer des tests grâce à des requêtes post et get qui appelleront les fonctions adéquates. | 1h00 | Aucune | US23/US24/US25 | Terminée | Nicolas |
| TK7_SP2| Création des fichiers **test.ejs**, **createTest.ejs**, et **updateTets.ejs** permettant d'utiliser les fonctions CRUD liées aux tests depuis notre site web. | Sur la page tests, on voit la liste de tous les tests créés. Sur les pages createTest et updateTest, on a un formulaire permettant de créer un test. Les champs de ce formulaire sont : *nom*, *description*. Sur la page updateTest, le formulaire est pré-rempli| 1h00 | TK6_SP2 | USX | Terminée | Nicolas |
| TK8_SP2 | Amélioration du système de login | Quand un utilisateur se connecte, une session est créée, ce qui lui permet de toujours être connecté après avoir quitté le site et être revenu dessus. | 4h00 | Aucune | Toutes | Terminée | Florian |
|TK9_SP1  | Création du fichier de test contenant les tests de validation concernant les tests | On peut lancer les tests et obtenir en sortie un résultat nous indiquant les tests ayant échoué et ceux ayant réussi. Voir la fin du fichier pour plus de détails. | 1h  | TK6_SP2/TK7_SP2 | US23/US24/US25  | A faire  | Nicolas |
|TK10_SP1  | Création du fichier de test contenant les tests de validation concernant les projets | On peut lancer les tests et obtenir en sortie un résultat nous indiquant les tests ayant échoué et ceux ayant réussi. Voir la fin du fichier pour plus de détails. | 1h  | TK3_SP2/TK4_SP2/TK5_SP2/  | US20/US21/US22  | A faire  | Axel |


- Tests :
  - **issue.sel** : 
    - 6 tests pour l'ajout d'une *issue* :
      - un en remplissant tous les champs et en cliquant sur le bouton *Sauvegarder*
      - un en ne remplissant que quelques champs et en cliquant sur le bouton *Sauvegarder*
      - un en ne remplissant aucun champ et en cliquant sur le bouton *Sauvegarder*
      - un en cliquant sur *Annuler* en n'ayant rempli aucun champ
      - un en cliquant sur *Annuler* en n'ayant rempli que quelques champs
      - un en cliquant sur *Annuler* en ayant rempli tous les champs
    - 3 tests pour la supression d'*issues* (après avoir ajouté cinq *issues*) :
      - un en supprimant les issues dans l'ordre d'ajout à l'aide du bouton *Supprimer* à côté de chaque *issue*
      - un les supprimant dans l'ordre inverse de celui d'ajout à l'aide du bouton *Supprimer* à côté de chaque *issue*
      - un les supprimant de façon aléatoire à l'aide du bouton *Supprimer* à côté de chaque *issue*
    - 8 tests pour la modification d'une *issue* :
      - un en modifiant tous les champs de l'issue et en cliquant sur le bouton *Sauvegarder*
      - un en ne modifiant que quelques champs et en cliquant sur le bouton *Sauvegarder*
      - un en ne modifiant aucun champ et en cliquant sur le bouton *Sauvegarder*
      - un en ayant effacé le contenu de quelques champs et en cliquant sur le bouton *Sauvegarder*
      - un en ayant effacé le contenu de tous les champs et en cliquant sur le bouton *Sauvegarder*
      - un en cliquant sur *Annuler* en n'ayant modifié aucun champ
      - un en cliquant sur *Annuler* en n'ayant modifié que quelques champs
      - un en cliquant sur *Annuler* en ayant modifié tous les champs
  - **task.sel** :
    - 6 tests pour l'ajout d'une *tâche* :
      - un en remplissant tous les champs et en cliquant sur le bouton *Sauvegarder*
      - un en ne remplissant que quelques champs et en cliquant sur le bouton *Sauvegarder*
      - un en ne remplissant aucun champ et en cliquant sur le bouton *Sauvegarder*
      - un en cliquant sur *Annuler* en n'ayant rempli aucun champ
      - un en cliquant sur *Annuler* en n'ayant rempli que quelques champs
      - un en cliquant sur *Annuler* en ayant rempli tous les champs
    - 3 tests pour la supression de *tâche* (après avoir ajouté cinq *tâches*) :
      - un en supprimant les tâches dans l'ordre d'ajout à l'aide du bouton *Supprimer* à côté de chaque *issue*
      - un les supprimant dans l'ordre inverse de celui d'ajout à l'aide du bouton *Supprimer* à côté de chaque *issue*
      - un les supprimant de façon aléatoire à l'aide du bouton *Supprimer* à côté de chaque *issue*
    - 8 tests pour la modification d'une *tâche* :
      - un en modifiant tous les champs de la tâche et en cliquant sur le bouton *Sauvegarder*
      - un en ne modifiant que quelques champs et en cliquant sur le bouton *Sauvegarder*
      - un en ne modifiant aucun champ et en cliquant sur le bouton *Sauvegarder*
      - un en ayant effacé le contenu de quelques champs et en cliquant sur le bouton *Sauvegarder*
      - un en ayant effacé le contenu de tous les champs et en cliquant sur le bouton *Sauvegarder*
      - un en cliquant sur *Annuler* en n'ayant modifié aucun champ
      - un en cliquant sur *Annuler* en n'ayant modifié que quelques champs
      - un en cliquant sur *Annuler* en ayant modifié tous les champs
  - **log.sel** :
    - 6 tests pour la création d'un compte :
      - un en remplissant tous les champs et en cliquant sur le bouton *S'inscrire*
      - un en ne remplissant que quelques champs et en cliquant sur le bouton *S'inscrire*
      - un en ne remplissant aucun champ et en cliquant sur le bouton *S'inscrire*
      - un en cliquant sur *Annuler* en n'ayant rempli aucun champ
      - un en cliquant sur *Annuler* en n'ayant rempli que quelques champs
      - un en cliquant sur *Annuler* en ayant rempli tous les champs
    - 2 tests pour la déconnexion :
      - Un en se déconnectant depuis la page *Backlog* à l'aide du bouton *Déconnexion* à droite de la barre de navigation de la page
      - Un en se déconnectant depuis la page *Tâches* à l'aide du bouton *Déconnexion* à droite de la barre de navigation de la page
    - 8 tests pour la connexion :
      - Un en remplissant tous les champs et en cliquant sur *Connexion*
      - Un en ne remplissant que le champ *Adresse mail* et en cliquant sur *Connexion*
      - Un en ne remplissant que le champ *Mot de passe* et en cliquant sur *Connexion*
      - Un en ne remplissant aucun champ et en cliquant sur *Connexion*
      - Un en remplissant tous les champs et en cliquant sur *Créer un compte*
      - Un en ne remplissant que le champ *Adresse mail* et en cliquant sur *Créer un compte*
      - Un en ne remplissant que le champ *Mot de passe* et en cliquant sur *Créer un compte*
      - Un en ne remplissant aucun champ et en cliquant sur *Créer un compte*
  - Les tests concernant les tests et les projets sont similaires aux tests décrits ci-dessus.