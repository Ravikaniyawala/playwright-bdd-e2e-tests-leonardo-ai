
import { BasePage } from '../BasePage';
import { ScramblerDucatiHomePage } from "../interfaces/ScramblerDucatiHomePage";

import { Page } from "@playwright/test";

export class ScramblerDucatiHomePageImpl extends BasePage implements ScramblerDucatiHomePage {

  private locators = {
    startToCreatButton: 'a.primary-button',
    acceptAllCookie: 'button#onetrust-accept-btn-handler'
  };

  constructor(page: Page) {
    super(page);
  }

  async acceptCookies(): Promise<ScramblerDucatiHomePage> {
        await this.click(this.locators.acceptAllCookie);
        return this;
    }

  async startToCreate(): Promise<ScramblerDucatiHomePage> {
    const element = await this.getVisibleElement(this.locators.startToCreatButton);
    await element.click();
    return this;
  }
}