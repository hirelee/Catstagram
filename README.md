# Catstagram
Think Instagram, but for Cats.

## Synopsis
This is a web application specifically designed for your Cat; Instagram for your feline friend if you will. It's been built on the robust MEAN stack under the component methodology (Angular 1.5) 

## Get The Application Purrring
These instructions will get the application up and running and prevent you from having an 'cat'astrophes. Below is the list of software you will need to locally install.
```
Node.js
```
In order to fire up this claw-some application, do the following (within terminal and applications route directory):
```
npm install
```
followed by:
```
node server.js
```
Then open your favourite browser and go to:
```
http://localhost:3000
```

## Structure
```
API
  - controllers
    - index.server.routes.js
  - library
  - models
  - routes
    - index.server.routes.js
  - views
    - index.html

APP
  - assets
    - css
    - fonts
    - icons
    - js
  - modules
    - app
      - stylus
      - app.comp.html
      - app.comp.js
    - private
    - public
      - index
        - stylus
        - index.comp.html
        - index.comp.js
    - module.js
  - application.js
  
CONFIG
  - env
    - development.js
    - production.js
  - config.js
  - express.js
```
## Built With
* [Angular](https://docs.angularjs.org/guide/component) - Frontend framework
* [Node](https://nodejs.org/en/) - Server framework
* [Express](https://expressjs.com/) - Middleware framework

## Future Refactoring
```
1. Create Http Service (Get, Put, Post)
2. Refactor Analytics into its own component (Reduce page load)
3. Analytics/User Stats search functionality
4. Analytics monthly averages (Comments vs. Likes)
5. Signup functionality
6. Login functionality
7. Extra small screen CSS (320px)
8. Truncate Username (for the small screen)
9. Refactor 'togglePopup', specifically 'popup.prompt'
10. Append timestamp to image comments
11. More advanced Lazy-loader
12. Refactor Data into Service
13. Write node script to automate xls to json
14. Allow comments to be posted via enter button
15. Count total comments made
16. More robust CRUD functionality on comments
```

## Authors
* **Lee Marshall** - [hirelee](https://github.com/hirelee)
