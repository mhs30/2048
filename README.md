# Qlik Front-End Assignment - 2048 game

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.7.

This project uses:

[Angular Material](https://material.angular.io/) version 10.2.5

[confetti-js](https://www.npmjs.com/package/confetti-js) version 0.0.18

[lodash](https://lodash.com/) version ^4.17.20

[ngx-device-detector](https://www.npmjs.com/package/ngx-device-detector) version ^2.0.0

## Live demo

You can check a live demo [HERE](https://mario-herrero-siles.000webhostapp.com/2048/)

## Documentation

You can read the documentation [HERE](https://marioherrerosiles.gitbook.io/2048/)

## Install

Run `npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Features

Header with title and button to start the game generating two tiles with values of either 2 or 4

Grid to display multidimensional array of tiles with 4 rows and 4 columns

Move tiles with arrow keys or touch swipe

Merge tiles into one if they have the same value

Tiles with same value share same color

Dialogs for both victory - comes with conffeti animation, and defeat

Animation/Transitions when tiles are moved, merged and spawned

Score counter

Best score stored on localStorage if played in Desktop

Button to enable/disable sound effects

Button to display bottom sheet with share information

Button to display bottom sheet wth game information

Footer

Responsive Design for Web, Ipad & Mobile

P.S. In case you are wondering about the second line in the footer here is the explanation: This weekend i had to take care of my uncle’s daughters and i let her choose the colors of the tiles from the Materialize Documentation to keep them busy while i was coding, then i added their name to the footer so they could share the game with their friends.
