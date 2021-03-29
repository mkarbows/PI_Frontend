# Project Integrator (PI)

This is the repository for the frontend of the Project Integrator project.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

## Code Review

All developers are expected to review each others' code. No exceptions!

If you are tagged as a reviewer, start by opening the task in Jira and ensuring you understand what was requested.

Consider the following when reviewing:

* Does the solution work?
* Does it meet the requirements set out in the task?
* Does it affect other components?
* Was the code easy to understand?
* Is the code of a high standard?

## Installation  
* Clone the repo
* Install Node 8.11.4 or higher (or `nvm use 8.11.4`+)
* Run `npm install -g @angular/cli` in the root directory  
* Run `npm install` in the root directory

## Development server

* Run `npm start -- -o` for a dev server.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Linting  

Run `ng lint` to lint the project.

## Build

* Prior to building, update the version number in `package.json`
* Reinstall the latest npm components by running `npm install`
* If necessary, run `npm audit fix`
* Run `ng build --prod` to build the project
* Commit any changes to the develop branch
* Tag the latest commit with the version number
* Switch to the master branch, and merge develop into master
* Push develop, master, and tags
* Push the master branch and tags

## Tests

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

While the end-to-end tests are still in development, please run through the following manual tests:

#### Filters
  * Click on a segment in the map. Item count (by paging in top right) should change. Media tab should only show items belonging to that segment
    * Repeat check for Drawings tab
    * Repeat check for CA tab
  * Click the level filtering. Choose L1. Media tab should show only items belonging to segment and level
    * Repeat check for Drawings tab
    * Repeat check for CA tab
  * On Media tab, change Media Types. Selection of items should change and map should change displayed markers
  * Change Drawing Types / CA Types dropdown. Selection should change
  * On Drawing Types tab, change Sheet Types dropdown. Selection should change
  * Click Reset button. Media tab should show original set of images

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
