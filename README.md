Presentation du sujet School - Backend
Ce projet a pour objectif de gérer les aspects backend d’une application de gestion d’école. Il permet de :
- gérer les utilisateurs 
- gérer les cours et les inscriptions
- fournir des statistiques sur les cours et les notes
- assurer la persistance des données via MongoDB

 Architecture
Le projet suit une architecture MVC (Model-View-Controller) simplifiée pour le backend :
- Models : définitions des schémas de données avec Mongoose
- Controllers : logique métier pour chaque ressource (utilisateurs, cours, inscriptions)
- Routes : endpoints exposés via Express.js
- Services: opérations complexes ou interactions avec la base de données
- Config : configuration des variables d'environnement et de la connexion à MongoDB
- Server.js / app.js : initialisation du serveur et des routes

Appels API
POST Création d'un nouveau compte utilisateur.
GET Récupère tous les cours
PUT Met à jour intégralement les informations
DELETE Supprime un cours
GET avec aggregation Récupère des statistiques agrégées sur les cours, comme le nombre total de cours, la moyenne des notes ou le nombre de cours par catégorie.
Exemple: 
 {
    "name": "Database Systems",
    "code": "CS201",
    "description": "Introduction to MongoDB and SQL",
    "credits": 5
  }

Modele des données
Cette application utilise MongoDB avec Mongoose pour structurer et valider les données.
Chaque ressource (Teacher, Student, Module) possède son propre schéma, qui définit les champs, les types de données, les contraintes, ainsi que les relations entre les entités
Exemple:
name: {
    type: String,
    required: true,
    trim: true
  }

Instruction d’installation 
 1. Cloner le dépôt
2. Installer les dépendances
3. Configuration des Variables d'Environnement
4. Lancer le serveur


Technologies Utilisées
Ce projet a été développé en utilisant la pile technologique suivante.
Langage Principal:  Node.js, Moteur d'exécution JavaScript côté serveur. 
Framework Web: Express.js , Framework minimaliste et flexible pour Node.js.
Base de Données: MongoDB, Base de données NoSQL orientée documents. 
ORM/ODM: Mongoose, Outil de modélisation d'objet pour MongoDB. 
Gestionnaire de Paquets: npm, Outil par défaut pour la gestion des dépendances Node.js. 
Format de Données: JSON, Utilisé pour les échanges de données entre le client et le serveur. 

 Prérequis
Pour pouvoir exécuter ce projet en local, vous devez avoir installé :
1.  Node.js 
2.  npm 
3.  Un serveur MongoDB (localement ou via un service cloud comme MongoDB Atlas)
4.  Git



