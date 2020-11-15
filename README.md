# Presentation du projet

L'idée est de proposer un service de ramassage des ordures. Ce serveur à pour but de repondre aux requêtes du front concernant :

* L'abonnement des particuliers
* Le suivi des incidents
* Gestion des collaborateurs

## Point d'entrée du serveur

* Fichier start.ts : ici on crée une instance de App, ensuite on configure un port et enfin on lance le serveur
* Pour lancer le serveur : npm start
* REMARQUE : Pour mieux appréhender l'architecture, n'hésiter pas de parcourir le code à partir du fichier start.ts

## Tester

* Ouvrir Postman ou un autre client web => method : GET url : http://localhost:3000/user/5e44836acd6a7258b83a1aea => pour recuperer un user donné
* Ouvrir Postman ou un autre client web => method : POST url : http://localhost:3000/user/save body (raw): {
	"nom": "TARATATA",
	"prenom": "Zoro"
    }  => pour enregister un nouveau user 

## Environnement de travail

* NodeJS : 10.15.3
* Gestion des paquets : npm 6.4.1
* Framework : express ^4.16.1
* Injection de dépendances : express-dependency-injection ^1.5.0
* Gestion des données : typegoose ^5.3.22
* Git : git version 2.21.0.windows.1
* IDE : visual studio code

## Base Données

* MongoLab en ligne pour stocker les données sous forme de documents (NoSQL) :https://account.mongodb.com/account/login
* Pour se connecter avec Gmail: aller dans GoogleDrive => Projet Afrique => Africlean => Specs => utiliser le compte GMAIL
* Une fois connecter, cliquez sur "africlean-cluster" => "Collections" pour voir les données mongoDB
* REMARQUE : Si vous essayer d'accèder aux données en faissant une requête (POST, PUT, GET...) et que ça marche pas, référez vous à ce lien : https://docs.atlas.mongodb.com/tutorial/whitelist-connection-ip-address/

## Installation

* Importer les fichiers package.json, tsconfig.json, tslint.json
* Ensuite éxécuter npm install 

## Liens utiles

* Comprendre les annotations (@ExRouter, @ExRoute, @ExMiddleware(), @ExRepository(), @Service()) : https://www.npmjs.com/package/express-dependency-injection?activeTab=readme
* Comprendre Typegoose pour le modèle de données  : https://github.com/szokodiakos/typegoose
* Comprendre les middlewares : https://alligator.io/nodejs/creating-your-own-express-middleware/
* Comprendre typeORM : https://typeorm.io/#/
* find typORM requet : https://github.com/typeorm/typeorm/blob/master/docs/find-options.md
* typeORM mongoDb: https://github.com/typeorm/typeorm/blob/master/docs/mongodb.md