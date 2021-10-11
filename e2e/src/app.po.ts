import {browser, by, element, ElementFinder} from 'protractor';
import appLocators from './app.locators';
import {TestBasePo} from './common/test-base.po';

export class AppPage extends TestBasePo {
  getSignUp(): ElementFinder {
    return element(by.css(appLocators.signUp));
  }
}
