# Installation & lancement du serveur

## Avec docker-compose

    $ docker-compose up

## Sans docker-compose

    $ npm install
    $ node app.js

Dans les deux cas, l'application est lancée en local sur le port 4321, et est accessible avec un navigateur à l'adresse localhost:4321.

# Lancement des tests

    $ npm test

# Lancement des linters

    $ npm run lint controllers database models routes test

# API simplifiée de l'application

## SignIn, signUp, et profil

- /signUp
  - get &rarr; Retourne la page de création d'un compte
  - post &rarr; Envoie une requête de création d'un compte
    - email : string
    - username : string
    - password : string

- /signIn
  - get &rarr; Retourne la page de connexion
  - post &rarr; Envoie une requête de connexion
    - email : string
    - password : string

- /profile
  - get &rarr; Retourne la page de profil
  - post &rarr; Envoie une requête pour éditer le profil
    - username : string
    - password : string

## Projets

- /projects
  - get &rarr; Retourne la page des projets

- /projects/create
  - post &rarr; Envoie une requête de pour la création d'un projet
    - projectName : string
    - description : string

- /projects/:projectID 
  - get &rarr; Retourne la page du projet projectID
  - post &rarr; Envoie une requête pour l'ajout d'un collaborateur au projet projectID
    - contributor : string

- /projects/:projectID/delete
  - post &rarr; Envoie une requête pour la suppression du projet projectID

## Issues

- /projects/:projectID/issues
  - get &rarr; Retourne le backlog de projectID

- /projects/:projectID/issues/create
  - post &rarr; Envoie une requête pour la création d'une issue
    - id : string
    - description : string
    - priority : int
    - difficulty : int 

- /projects/:projectID/issues/:id/update
  - post &rarr; Envoie une requête pour la modification de l'issue id
    - description : string
    - priority : int
    - difficulty : int 

- /projects/:projectID/issues/:id/delete
  - post &rarr; Envoie une requête pour la suppression de l'issue id

## Tâches

- /projects/:projectID/tasks
  - get &rarr; Retourne les tâches de projectID

- /projects/:projectID/tasks/create
  - post &rarr; Envoie une requête pour la création d'une tâche
    - id : string
    - description : string
    - estimatedTime : string
    - dependencies : string
    - linkedUserStories : string
    - developer : string

- /projects/:projectID/tasks/:id/update
  - post &rarr; Envoie une requête pour la modification de la tâche id
    - description : string
    - estimatedTime : string
    - dependencies : string
    - linkedUserStories : string
    - advancementState : string
    - developer : string

- /projects/:projectID/tasks/:id/linkTask
  - post &rarr; Envoie une requête pour lier la tâche id à une issue
    - issueID : string

- /projects/:projectID/tasks/:id/delete
  - post &rarr; Envoie une requête pour la suppression de la tâche id

## Tests

- /projects/:projectID/tests
  - get &rarr; Retourne les tests de projectID

- /projects/:projectID/tests/create
  - post &rarr; Envoie une requête pour la création d'un test
    - name : string
    - description : string

- /projects/:projectID/tests/:id/update
  - post &rarr; Envoie une requête pour la modification du test id
    - name : string
    - description : string

- /projects/:projectID/tests/:id/delete
  - post &rarr; Envoie une requête pour la suppression du test id

## Sprints 

- /projects/:projectID/sprints
  - get &rarr; Retourne la page des sprints de projectID

- /projects/:projectID/sprints/create
  - post &rarr; Envoie une requête pour la création d'un sprint
    - name : string
    - description : string
    - linkedUserStories : stirng
    - beginDate : string
    - endDate : stirng

- /projects/:projectID/sprints/:id
  - get &rarr; Retourne la page du sprint id

- /projects/:projectID/sprints/:id/linkIssue
  - post &rarr; Envoie une requête pour l'ajout d'une issue au sprint id
    - issueID : string

- /projects/:projectID/sprints/:id/delete
  - post &rarr; Envoie une requête pour la suppression du sprint id
