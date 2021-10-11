import {browser, by, element, ElementFinder} from 'protractor';

export class TestBasePo {
  navigateTo(path?: string): Promise<unknown> {
    let url = browser.baseUrl;
    if(path){
      url += `/${path}`;
    }
    return browser.get(url) as Promise<unknown>;
  }
}
