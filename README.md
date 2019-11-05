# Conduite de projet - Groupe 1 équipe 3

## Membres de l'équipe
- BOUNEAU Axel
- DUROC Nicolas
- ROULET Florian

## Installation & lancement du serveur

- git pull
- npm install
- node app.js

## Utilisation

Pour l'instant, seule la partie back concernant les fonctionnalités CRUD sur les tâches est présente. Les requêtes suivantes sont supportées : 

- **POST localhost:4321/create** avec un body contenant les champs :
  - id : ...
  - description : ...
  - estimatedTime : ...
  - dependencies : ...
  - linkedUserStories : ...
  - advancementState : ...
  - assignedDeveloper : ...

  Qui ajoute une tâche à la base de données, avec les champs spécifiés.

- **GET localhost:4321/:id**
Qui affiche les champs de la tâche ayant l'id spécifié dans l'url.

- **PUT localhost:4321/:id/update**
Qui modifie les champs de la tâche ayant l'id spécifié dans l'url, en fonctions des champs fournis dans le body.

- **DELETE localhost:4321/:id/delete** 
Qui supprime la tâche ayant l'id spécifié dans l'url de la base de données.

**/!\\ A noter /!\\** : Comme le front n'est pas encore développé, l'utilisation d'un outil comme *Postman* peut permettre de tester les requêtes ci-dessus.

## Autres informations

Le backlog est disponible [ici](specs/README.md).

Les issues du sprint 1 sont disponibles [ici](specs/Sprint1.md).

Les tâches du sprint 1 sont disponibles [ici](specs/Task1.md).