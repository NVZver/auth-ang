# AuthAng

Roadmap
* [done] Add a service with the API call to the test server and cover it by unit-tests
  * [how to improve] Now all the fields (including password) are sent as one object and it's not secure. To fix it we could send the password to another end-point in a different request.
* [done] Implement an initial sign-up form and make it send data via the service.
  * [how to improve] Improve design, consider the responsive view.
* [done] Add localization
* [done] Add accessibility features to improve the user experience for users who rely on screen readers:
  * [done] add labels to all inputs
  * [done] add "aria-live" to the all error blocks
  * [done] add "aria-live" to the "sign up status" blocks
* [done] Add form validators.
  * [how to improve] Validate password complexity.
* [done] Cover template, validators and event handlers by unit-tests
  * [todo] Testing of the sing up status was missed due to lack of time
* [todo] Cover the app by e2e tests [tests were missed due to lack of time]
  * Sign up - No errors on BE: I'm as a user fill all the fields correctly, click the 'sing up' button and see statuses: "Processing..." and then "Account was created successfully"
  * Sign up - Errors on BE: I'm as a user fill all the fields correctly, click the 'sing up' button and see statuses: "Processing..." and then "Something went wrong".
* [todo] Add visual tests to catch all changes in the template.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
