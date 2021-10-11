import { TestBasePo } from '../common/test-base.po';
import {by, element, ElementFinder} from 'protractor';

export class SignUpPo extends TestBasePo {
  getForm(): ElementFinder {
    return element(by.css(''))
  }
}
