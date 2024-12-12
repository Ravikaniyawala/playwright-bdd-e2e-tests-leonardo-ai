
import { BasePage } from '../BasePage';


import { Page } from "@playwright/test";
import { PickYourGenerationsPage } from "../interfaces/PickYourGenerationsPage";
import { PickYourFavouriteGenerationsComponent } from "../components/PickYourFavouriteGenerationsComponent";
import { EnterYourDetailsComponent } from "../components/EnterYourDetailsComponent";

export class PickYourGenerationsPageImpl extends BasePage implements PickYourGenerationsPage {

  private pickYourFavouriteGenerationsComponent: PickYourFavouriteGenerationsComponent;
  private enterYourDetailsComponent: EnterYourDetailsComponent;

  private locators = {
      loadingSpinner: 'img[alt=\'Spinning animated Scrambler Ducati loader icon\']',
  };

  constructor(page: Page) {
    super(page);
    this.pickYourFavouriteGenerationsComponent = new PickYourFavouriteGenerationsComponent(page);
    this.enterYourDetailsComponent = new EnterYourDetailsComponent(page);
  }

    async getGeneratedImagesCount(): Promise<number> {
        return await this.pickYourFavouriteGenerationsComponent.getGeneratedImagesCount();
    }

    async enterFirstName(firstName: string): Promise<PickYourGenerationsPage> {
        await this.enterYourDetailsComponent.enterFirstName(firstName);
        return this;
    }

    async enterLastName(lastName: string): Promise<PickYourGenerationsPage> {
        await this.enterYourDetailsComponent.enterLastName(lastName);
        return this;
    }
    async enterEmail(email: string): Promise<PickYourGenerationsPage> {
        await this.enterYourDetailsComponent.enterEmail(email);
        return this;
    }
    async selectCountry(country: string): Promise<PickYourGenerationsPage> {
        await this.enterYourDetailsComponent.selectCountry(country);
        return this;
    }
    async acceptTnc(): Promise<PickYourGenerationsPage> {
        await this.enterYourDetailsComponent.acceptTermsAndConditions()
        return this;

    }
    async acceptPreferences(): Promise<PickYourGenerationsPage> {
        await this.enterYourDetailsComponent.acceptPreferences();
        return this;
    }

    async submitForm(): Promise<PickYourGenerationsPage> {
        await this.enterYourDetailsComponent.submitForm();
        return this;
    }

    /**
     * This method is only for desktop for now, can be enhanced to support mobile view
     */
    async waitForLoadingSpinnerToDisappear(): Promise<PickYourGenerationsPage> {
        await this.waitForSelector(this.locators.loadingSpinner);
        await this.waitForElementToBeInvisible(this.locators.loadingSpinner, 60000);
        return this;
    }
    async pickYourGenerations(): Promise<PickYourGenerationsPage> {
        await this.pickYourFavouriteGenerationsComponent.pickYourFavouriteGenerations();
        return this;
    }

    async clickOnNextButton(): Promise<PickYourGenerationsPage> {
        await this.pickYourFavouriteGenerationsComponent.clickOnNext()
        return this;
    }

}