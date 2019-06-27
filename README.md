#Documentation technique
 
 Ce document est un document technique dans laquelle nous expliquons toutes les procédures à
 suivre pour avoir un environnement de développement fonctionnel et de production en tant que
 *.exe*.
 
 Pour ce projet, nous utilisons [Electron](https://electronjs.org/) pour exporter un tous les
 éléments développés en application exécutable pour *Windows*, *Mac* et *Linux*.

 
## 1. Installer l'environnement de DEV :
 Comme ce projet est un prototype, nous utilisons une base de données locale `hotel.db` en
 SQLite3. Et pour avoir un environement fonctionnelle en tant de développeur, il faut exécuter
 quelques commandes sur la ligne de comandes/terminal avant de lancer le projet:
 
 ```bash
 # Installer les modules nécessaires à compilation de SQLite avec C++
 npm install windows-build-tools --vs2015
 
 # Installer toutes les autres dépendances
 npm install
 
 # Run the app
 npm start
 ```
 
 Nous avons donc une application fonctionnelle et prête à être exécutée. Nous pouvons aussi si
 besoin vérifier si le code correspond à la charte de codage en utilisant le linter **ESLINT** :
 
 ````bash
  # Lancer le linter
  npm run lint
 ````
 
 Nous avons aussi en place **NODE-SASS** qui nous permet de compiler le code *.SCSS* en *.CSS*.
 Pour le compiler il suffit juste de exécuter la commande suivante :
 
 ```bash
  # Compiler le code SCSS en CSS
  npm run build-css
 ``` 

## 2. Générer l'exécutable en PROD:
Pour génerer les exécutables à partir du code réalisé, nous utilisons **electron-packager** et
**electron-rebuild** pour construire avec toutes les modules nécessaires :

```bash
  # Génerer les executables en Windows Linux et Mac
  npm run package-rebuild
  
  # Générer la documentation technique
  npm run esdoc
```

Une fois cela fait, nous avons tous les exécutables dans le dossier **build/"OS"**.

## 3. Architecture/structure du projet :

```
  .
  |---build/                          --> Où on trouve tous les .exe 
  |     |---win/
  |     |     |- (...)
  |     |---mac/
  |     |     |- (...)
  |     |---linux/
  |           |- (...)
  |
  |---node_modules/                   --> Toutes les dépendances
  |
  |---public/
  |     |---app/
  |     |     |---controllers/        --> Controlleurs
  |     |     |     |- (...)
  |     |     |---models/             --> Modèles
  |     |     |     |- (...)
  |     |     |---views/              --> Vues
  |     |           |- (...)
  |     |
  |     |---assets/                   --> Images et icones
  |     |     |---icons/
  |     |     |     |- (...)
  |     |     |---img/
  |     |           |- (...)
  |     |
  |     |---constants/                --> Variables globales
  |     |     |- (...)
  |     |
  |     |---database/                 --> Tout ce qui concerne la BDD
  |     |     |- (...)
  |     |
  |     |---docs/                     --> La documentation technique
  |     |     |- (...)
  |     |
  |     |---plugins/                  --> Les plugins du projet
  |     |     |- (...)
  |     |
  |     |---styles/                   --> Tous les fichiers style
  |     |     |---css/
  |     |     |     |- (...)
  |     |     |---fonts/
  |     |     |     |- (...)
  |     |     |---sass/
  |     |           |- (...)
  |     |
  |     |---utils/                    --> Les fonctions globales
  |     |      |- (...)
  |     |     
  |     |---main.js                   --> Point d'entrée de l'application
  |
  |---(tous les fichiers de configuration)
```

## 4. Outils utilisés :

- [Electron](https://electronjs.org/)
- [Materialize](https://materializecss.com/)
- [Material Icons](https://material.io/tools/icons/)
- [Jquery](https://www.npmjs.com/package/jquery)
- [DataTables](https://datatables.net/)
- [ChartJS](https://www.chartjs.org/)
- [FullCalendarJS](https://fullcalendar.io/)
- [Air-DatepickerJS](http://t1m0n.name/air-datepicker/docs/)
- [Node-Sass](https://github.com/sass/node-sass)
- [Node-SQLite3](https://www.npmjs.com/package/sqlite3)
- [ESLint](https://www.npmjs.com/package/eslint)
