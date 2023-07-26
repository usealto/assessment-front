# AssessmentFront

[![Tests CI](https://github.com/usealto/assessment-front/actions/workflows/node.js.yml/badge.svg)](https://github.com/usealto/assessment-front/actions/workflows/node.js.yml)

== With Angular 15 and VS Code, you need this version of Node ==

    https://nodejs.org/dist/v18.10.0/

https://angular.io/guide/cheatsheet

### Required

- VS Code
- to use **ng** commands => `npm install @angular/cli -g`

### Run

`npm run start`

### Build

`npm run build`

Files will be placed in _dist/alto_

## Dev

- git clone
- change to project directory
- npm install
- npm run start
- in VS code, press F5 to launch Chrome in debug mode.

### Components

The component demo page is here (http://localhost:4200/test)

### Packages

- ng bootstrap (https://ng-bootstrap.github.io/#/components/accordion/examples)
- bootstrap (https://getbootstrap.com/docs/5.1/utilities/api/)
- bootstrap icons (https://icons.getbootstrap.com/)
- until-destroy (https://www.npmjs.com/package/@ngneat/until-destroy)

### VS code extensions

#### Mandatory

Everything in `extensions.json`

#### Recommanded

```
code --install-extension Mikael.Angular-BeastCode
code --install-extension WallabyJs.quokka-vscode
code --install-extension sainoba.px-to-rem
code --install-extension aaron-bond.better-comments
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## E2E testing

Using Cypress

- Ask a friend

`npm run e2e`

## Push to Staging

Merge `develop` branch into `admin`

## Push to Prod

- Create a tag with '3.x.x' and push it
- Create a pull request to `main` with title 'v3.x.x' and merge it

## Hotfix

- Create a commit on `main` with the hotfix
- Make a 'git cherry pick' to bring the hot fix on `develop`

## EMOJIS

Demo page https://fluentemoji.com/

You can access all names with the `enum EmojiName`

```
Figma => fluent-emoji:waving-hand

EmojiName =>
```

You can use the `emoji` pipe to to transform the Enum to an SVG

You then, have to set the height and width with CSS

```
  <img [src]="EmojiName.Gear | emoji" loading="lazy" />
```
