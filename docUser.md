# Fonctionnement du site

## Connexion

- Le site amène directement sur la page de connxion. Il est impossible d'accéder à une autre page sans être connecté, mis à part la page d'inscription.
- Si vous ne possédez pas encore de compte, il vous suffit de cliquer sur le bouton s'inscrire en bas de la page pour accéder à cette page.
- Pour vous connecter, il vous suffit de rentrer votre adresse mail et votre mot de passe. Ceci vous amènera sur la page des projets.

## Inscription

- Pour créer un compte, il faut entrer une adresse, un nom d'utilisateur, et un mot de passe à rentrer deux fois pour le confirmer.
- Si l'adresse mail est déjaà liée à un compte, il sera impossible de créer un nouveau compte qui lui soit lié. Une fois le compte créé, vous serez automatiquement connecté.

## Profil

- Ici, il sera possible de changer son nom d'utilisateur et son mot de passe, de la même manière que lors de l'inscription.
- Il faut obligatoirement remplir tous les champs, même pour modifier uniquement le nom d'utilisateur.
- Il faut entrer le nouveau mot de passe deux fois, afin de le confirmer.
- Il y a également la possibilité de remettre le même que l'ancien, pour ne pas le changer.

## Projets

- Cette page contient la liste des projets pour lesquels vous êtes collaborateur.
- Vous pouvez accéder aux détails d'un projet en cliquant sur le nom de celui-ci, ou bien en créer un nouveau en appuyant sur le bouton prévu à cet effet.
- Pour créer un projet, il faut donner son nom et sa description. Vous serez automatiquement ajouté en tant qu'unique collaborateur sur ce projet.

## Résumé du projet

- Cette page contient le résumé du projet, à savoir son nom, sa description et la liste de ses collaborateurs.
- Vous pouvez rechercher un utilisateur et l'ajouter en tant que collaborateur grâce à la barre de recherche en bas de la page
- Il est également possible de supprimer le projet grâce au bouton à côté de son nom.

## Backlog

- Cette page contient la liste de toutes les issues liées au projet actuel.
- Pour créer une nouvelle issue, il suffit de cliquer sur le bouton en haut de la page. Il faut ensuite remplir le formulaire donné, en fournissant un ID (unique pour le projet), une description, une priorité et une difficulté.
- Chaque issue peut être développée pour afficher la difficulté et la priorité de celle-ci en cliquant sur le bouton chevron droit juste au-dessus de son ID. Lorsqu'elle est développée, le bouton devient un chevron vers le bas, qui permet de cacher le détail de l'issue.
- Le bouton stylo permet de modifier une issue, ce qui pré-remplira les champs du formulaire, qui est le même que lors de la création. Il est impossible de changer l'ID de l'issue après sa création.
- Pour supprimer l'issue, il suffit de cliquer sur le bouton rouge au-dessus de son ID.
- Sa couleur de fond indique l'état des tâches qui lui sont liées.
    - Rouge : Aucune de ses tâches liées n'est commencée.
    - Orange : Au moins une de ses tâches liées est en cours et elles ne sont pas toutes terminées.
    - Vert : Toutes ses tâches liées ont terminées.

## Tâches

- Cette page contient la liste de toutes les tâches liées au projet actuel.
- Pour créer une nouvelle tâche, il suffit de cliquer sur le bouton en haut de la page. Il faut ensuite remplir le formulaire donné, en fournissant un ID (unique pour le projet), une description, une estimation du temps, des dépendances d'autres tâches si besoin, les issues à lier et les développeurs qui se chargeront de cette tâche.
- Chaque tâche peut être développée pour afficher sa description, l'estimation du temps nécessaire à sa réalisation et les développeurs attribués à celle-ci en cliquant sur le bouton chevron droit juste au-dessus de son ID. Lorsqu'elle est développée, le bouton devient un chevron vers le bas, qui permet de cacher le détail de la tâche.
- Le bouton stylo permet de modifier une tâche, ce qui pré-remplira les champs du formulaire, qui est le même que lors de la création. Il est impossible de changer l'ID de la tâche après sa création.
- Pour supprimer la tâche, il suffit de cliquer sur le bouton rouge au-dessus de son ID.
- Sa couleur de fond indique son état.
    - Rouge : Elle n'est pas commencée (À faire).
    - Orange : Elle est en cours.
    - Vert : Elle est terminée.

## Sprints

- Cette page présente la liste des sprints du projet actuel.
- En cliquant sur le bouton en haut de la page, on peut créer un nouveau sprint en donnant un nom, une liste d'issues à lier à ce sprint, une date de début et une date de fin.
- En cliquant sur un sprint, on accède à la page de résumé de ce sprint.
- Il est également possible de supprimer un sprint en cliquant sur le bouton rouge à sa droite.

## Résumé du sprint

- Cette page contient à gauche la liste des issues liées au sprint actuel, et à droite la liste des tâches liées à l'issue en surbrillance.
- Les issues et les tâches ont les mêmes boutons que sur leur pages respectives, qui ont les mêmes effets. Seule exception, le bouton + pour les issues, qui permet de lier une tâche à cette dernière.
- On peut lier une issue au sprint actuel en cliquant sur le bouton en haut de la page.

## Tests

- Cette page contient la liste de tous les tests liés au projet actuel.
- Pour créer un nouveau test, il suffit de cliquer sur le bouton en haut de la page. Il faut ensuite remplir le formulaire donné, en fournissant un nom et une description.
- Le bouton stylo permet de modifier un test, ce qui pré-remplira les champs du formulaire, qui est le même que lors de la création.
- Pour supprimer le test, il suffit de cliquer sur le bouton rouge au-dessus de son nom.

## Releases

- Cette page contient la liste des releases associées à ce projet.
- Il est possible d'ajouter une nouvelle release en cliquant sur le bouton en haut de la page, puis en fournissant un nom et une description. La date de la release sera définie automatiquement avec l'horloge de la machine. De même, les issues effectuées pour cette nouvelle release sont définies automatiquement lors de sa création.
- Il est impossible de supprimer une release une fois créée.
- En cliquant sur une release, on accède à la page de résumé de cette release, qui affiche son nom, sa description, la date à laquelle elle a été effectuée, la somme des difficultés et les issues effectuées pour cette release.