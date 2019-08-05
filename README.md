# Spirited

https://spirited-app.porterhyphenborden.now.sh/

## Sumary

### Motivation

While the craft cocktail movement has taken the art of the cocktail to new levels, cocktail apps have lagged behind. Most are full of outdated recipes from the 70's and don't include the numerous liqueurs that have been created or revitalized by modern distillers. There is also no functional free cocktail recipe API available. Spirited is a tool for cocktail enthusiasts, professional bartenders, and aims to make a free cocktail recipe API available to developers in the future.

### Concept

"Spirited is a tool for the modern bartender and craft cocktail enthusiast. Search our curated selection of cocktail recipes, including both classics and modern favorites. Register for an account to create a personal cocktail library, add your own recipes, and update those recipes as you make changes."

### Description

Spirited provides a free cocktail database of curated selections for users to search by name or ingredient, as well as themed collections of cocktails for users to browse. Registered users have access to their own private cocktail library, and may add and update their own recipes.

## Screenshots

### Cocktail Search Page:

![Cocktail Search Page](https://i.imgur.com/2paBjIv.png)

### My Cockails Page:

![My Cockails Page](https://i.imgur.com/xdLJWZH.png)

### Add Cocktail Page:

![Add Cocktail Page](https://i.imgur.com/nNPEx1s.png)

## Spirited API

### Endpoints

* /cocktails - GET, POST cocktails
* /cocktails/id - DELETE, PATCH a cocktail
* /ingredients - GET, POST ingredients
* /ingredients/id - DELETE, PATCH an ingredient
* /cocktails/id/ingredients - GET ingredients for a specific cocktail by id
* /cocktail-ingredients - GET, POST cocktail ingredients
* /cocktail-ingredients/id - DELETE, PATCH a cocktail ingredient
* /collections/ - GET, POST cocktail collections
* /collections/id - DELETE, PATCH a cocktail collection
* /collections/id/cocktails - GET cocktails within a collection
* /units - GET, POST units
* /units/id - DELETE, PATCH a unit
* /my-cocktails - GET cocktails by user ID for logged in user
* /users - GET, POST users
* /users/id - DELETE, PATCH a user

## Built with

* HTML
* CSS
* Javascript
* NodeJS
* Express
* React
* PostgreSQL

## Author

Callie Porter-Borden




