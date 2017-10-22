# Rentalcars frontend test by Andrei Mihaila Botez 

## Technology stack
Angular 4 ( Typescrypt, RXJS, Webpack, Karma/Jasmine ) and Express for serving the AOT compiled code and for Heroku deployment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.5.

## Development server
First run `node backend.js` to launch the backend server ; Ensure you have CORS enabled (ex: chrome plugin)
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Run node app.js. Navigate to to `http://localhost:3001/` (needs running backend.js)

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Design/ Architecture
Project follows angular 4 standards
- components: button, panel, grid - and app root
- services: JsonService makes the json request
- unit tests reside near each component, service, etc

