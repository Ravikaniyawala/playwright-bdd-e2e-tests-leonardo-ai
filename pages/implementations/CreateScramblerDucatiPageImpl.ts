
import { BasePage } from '../BasePage';
import { Page } from "@playwright/test";
import { CreateScramblerDucatiPage } from "../interfaces/CreateScramblerDucatiPage";
import { CreateYourCustomScramblerComponent } from "../components/CreateYourCustomScramblerComponent";

export class CreateScramblerDucatiPageImpl extends BasePage implements CreateScramblerDucatiPage {

  private locators = {
  };

  private createYourCustomScramblerComponent: CreateYourCustomScramblerComponent;

  constructor(page: Page) {
    super(page);
    this.createYourCustomScramblerComponent = new CreateYourCustomScramblerComponent(page);

  }

    async inputDescription(locator: string): Promise<CreateScramblerDucatiPage> {
      await this.createYourCustomScramblerComponent.inputCustomScramblerPrompt(locator);
        return this;
    }

    async clickOnGenerateButton(): Promise<CreateScramblerDucatiPage> {
        await this.createYourCustomScramblerComponent.submitForm();
        return this;
    }

}