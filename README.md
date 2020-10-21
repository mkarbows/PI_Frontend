# Deltalax

This is the repository for the frontend of the Delta LAX project dashboard. Development is carried out using Bitbucket, so if you are viewing this repository on GitLab, please click [here](https://bitbucket.org/arupdigital/deltalax/) to access the live codebase.

Backend code is located [here](https://bitbucket.org/arupdigital/deltalax_rest_api/).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

## Project Branching and Code Review Instructions

Please read these steps carefully before starting development. All code on this project is required to undergo Code Review before being accepted.

### Getting Started
* Create a branch using Jira, by clicking the `Create branch` link
* Choose the correct repository (**deltalax**)
* Choose **feature** from the Type dropdown
* Press Create
* `fetch` and `pull` the new branch
* Make your code changes
* Commit regularly, prefixing all commit messages with the task number (i.e. DELTALAX-5**)

### Submitting a Pull Request
* Remove all console logs
* Run `ng lint` and fix any reported linting errors
* Run `npm run compodoc` to update documentation
* Merge develop into your branch and fix any merge conflicts - DO NOT merge your branch into develop
* When you're ready to submit a pull request (i.e. when you've finished the task and the code is how you want it), push your branch with the command `git push <yourbranchname>`
* Go to https://bitbucket.org/arupdigital/deltalax/branches/ and `create` a pull request
* `Create pull request`

### Closing a Pull Request
* Once your code has been reviewed, your reviewer(s) will approve it. If your task is large or affects multiple files, you may wish to request approval from multiple reviewers
* Fix merge conflicts at this stage if they have appeared while your code was being reviewed
* Make any changes or implement suggestions before you merge into develop
* Merge into develop using the `Merge` button in the Bitbucket web interface, and delete the merged branch

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
* Clone the repo from [Bitbucket](https://bitbucket.org/arupdigital/deltalax/)
* Install Node 8.11.4 or higher (or `nvm use 8.11.4`+)
* Run `npm install -g @angular/cli` in the root directory  
* Run `npm install` in the root directory

If you previously had GitLab set up for this project, edit your git config file (.git\config).
Remove the `remote "origin"` line, and change `remote "bitbucket"` to read `remote "origin"`. Then replace all instances of `bitbucket` with `origin`.

Users who are deploying code to production should continue to push release versions to GitLab.

## Development server

* Run `npm start -- -o` for a dev server. Your browser will open at `http://localhost:4200/deltalax` and will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Linting  

Run `ng lint` to lint the project.

## Build

If you are deploying, you need to be connected to both Bitbucket and GitLab. To set up GitLab for this project, visit https://gitlab.arup.com/ArupDigitalAmericas/deltalax/ and use the Clone dropdown to get the correct link. Run `git remote add gitlab <gitlab_link>`. If that works correctly your git config file (.git\config) should have your GitLab settings stored at the bottom of the file.

* Prior to building, update the version number in `package.json` to match the release in Jira
* Reinstall the latest npm components by running `npm install`
* If necessary, run `npm audit fix`
* Run `ng build --prod` to build the project
* Commit any changes to the develop branch
* Tag the latest commit with the version number
* Switch to the master branch, and merge develop into master
* Push develop, master, and tags to [Bitbucket](https://bitbucket.org/arupdigital/deltalax/)
* Push the master branch and tags to [GitLab](https://gitlab.arup.com/ArupDigitalAmericas/deltalax/)
* Copy the `dist/` directory onto L-AWEBGIS03 by opening a Windows Explorer window to `\\l-awebgis03\aruphome\`

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

#### Paging & Prev/Next
  * Clicking through pages of items should change page content
  * Clicking between fullsize items should change page content
    * Going past item number 20 should allow you to navigate to item 21
  * Closing fullsize item when on page 2 of results should keep you on page 2

#### Hover & Click
  * With no segment selected:
    * Hovering on items from Media tab should also highlight segments on the map (if a segment is set in the item)
    * Now click into an item. Map highlight should be held, but filters should not change
    * Close the item. Map highlight should be cleared, and filters should not change
    * Repeat all checks above for Drawings tab
    * Repeat all checks above for CA tab
  * With a segment selected:
    * Hovering on items from Media tab should also highlight markers on the map
    * Hovering on markers in the map should also highlight items on Media tab

## Generate Documentation

Code comments should be made in the JSDoc format, to be picked up by the automated code generator.
Documentation can be created by users on their local machine as needed, but is not stored in Git or included in builds.
Run `npm run compodoc` to generate or update the documentation via [Compodoc](https://compodoc.app/).
See https://compodoc.app/guides/usage.html for more usage tips (rendering documentation, changing the default port etc.)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
