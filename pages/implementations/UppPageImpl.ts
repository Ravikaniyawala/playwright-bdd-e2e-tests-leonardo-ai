
import { BasePage } from '../BasePage';
import { Card } from '../../utils/testdata/Card';
import { UppPage } from "../interfaces/UppPage";
import { CardDetailsComponent } from "../components/CardDetailsComponent";
import { ThreeDSComponent } from "../components/ThreeDSComponent";
// @ts-ignore
import { Page } from "@playwright/test";

export class UppPageImpl extends BasePage implements UppPage {
  private locators = {
    usernameInput: '#user',
    passwordInput: '#pass',
    loginButton: 'text=Sign In',
    errorMessage: '.error-msg'
  };

  private cardDetailsComponent: CardDetailsComponent;
  private threeDSComponent: ThreeDSComponent;

  constructor(page: Page) {
    super(page);
    this.cardDetailsComponent = new CardDetailsComponent(page);
    this.threeDSComponent = new ThreeDSComponent(page);
  }

  async enterCardDetails(card: Card): Promise<UppPage> {
    await this.cardDetailsComponent.enterCardDetails(card);
    return this;
  }

  async acceptTnc(): Promise<UppPage> {
    await this.cardDetailsComponent.acceptTnc();
    return this;
  }

  async clickConfirmPayment(): Promise<UppPage> {
    await this.cardDetailsComponent.clickConfirmPayment();
    return this;
  }

  async clickOnPayNow(): Promise<UppPage> {
    await this.cardDetailsComponent.clickOnPayNow();
    return this;
  }

  async enter3DSCode(card: Card): Promise<UppPage> {
    await this.threeDSComponent.enter3DSCode(card);
    return this;
  }

  async login(username: string, password: string): Promise<UppPage> {
    await this.fill(this.locators.usernameInput, username);
    await this.fill(this.locators.passwordInput, password);
    await this.click(this.locators.loginButton);
    return this;
  }

  async verifyErrorMessage(errorMessage: string): Promise<UppPage> {
    await this.assertTextContains(this.locators.errorMessage, errorMessage);
    return this;
  }
}