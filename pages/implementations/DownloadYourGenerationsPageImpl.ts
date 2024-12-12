
import { BasePage } from '../BasePage';

import { Page } from "@playwright/test";
import { DownloadYourGenerationsPage } from "../interfaces/DownloadYourGenerationsPage";
import { DownloadYourFavouriteGenerationsComponent } from "../components/DownloadYourFavouriteGenerationsComponent";

export class DownloadYourGenerationsPageImpl extends BasePage implements DownloadYourGenerationsPage {

  private downloadYourFavouriteGenerationsComponent: DownloadYourFavouriteGenerationsComponent;

  private locators = {
  };

  constructor(page: Page) {
    super(page);
    this.downloadYourFavouriteGenerationsComponent = new DownloadYourFavouriteGenerationsComponent(page);
  }

    async downloadAndVerifyGeneration(downloadDir: string, expectedWidth: number, expectedHeight: number): Promise<DownloadYourGenerationsPage> {
        await this.downloadYourFavouriteGenerationsComponent.downloadAndVerifyImage(downloadDir, expectedWidth, expectedHeight);
        return this;
    }





}