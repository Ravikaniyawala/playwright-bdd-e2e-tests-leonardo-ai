// @ts-ignore
import { Page } from '@playwright/test';
import { ScramblerDucatiHomePageImpl } from './implementations/ScramblerDucatiHomePageImpl';
import { CreateScramblerDucatiPageImpl } from "./implementations/CreateScramblerDucatiPageImpl";
import { PickYourGenerationsPageImpl } from "./implementations/PickYourGenerationsPageImpl";
import { DownloadYourGenerationsPageImpl } from "./implementations/DownloadYourGenerationsPageImpl";
import { ScramblerDucatiHomePage } from "./interfaces/ScramblerDucatiHomePage";
import { CreateScramblerDucatiPage } from "./interfaces/CreateScramblerDucatiPage";
import { PickYourGenerationsPage } from "./interfaces/PickYourGenerationsPage";
import { DownloadYourGenerationsPage } from "./interfaces/DownloadYourGenerationsPage";

export class PageFactory {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  createScramblerDucatiHomePage(version: 'v1' | 'v2'): ScramblerDucatiHomePage {
    //instead of v1 and v2, use toggle to choose implementation
    if (version === 'v1') {
      throw new Error('Invalid version specified');
    } else if (version === 'v2') {
      return new ScramblerDucatiHomePageImpl(this.page);
    }
    throw new Error('Invalid version specified');
  }

  createCreateScramblerPage(version: 'v1' | 'v2'): CreateScramblerDucatiPage {
    //instead of v1 and v2, use toggle to choose implementation
    if (version === 'v1') {
      throw new Error('Invalid version specified');
    } else if (version === 'v2') {
      return new CreateScramblerDucatiPageImpl(this.page);
    }
    throw new Error('Invalid version specified');
  }

  createPickYourGenerationsPage(version: 'v1' | 'v2'): PickYourGenerationsPage {
    //instead of v1 and v2, use toggle to choose implementation
    if (version === 'v1') {
      throw new Error('Invalid version specified');
    } else if (version === 'v2') {
      return new PickYourGenerationsPageImpl(this.page);
    }
    throw new Error('Invalid version specified');
  }

  createDownloadYourGenerationsPage(version: 'v1' | 'v2'): DownloadYourGenerationsPage {
    //instead of v1 and v2, use toggle to choose implementation
    if (version === 'v1') {
      throw new Error('Invalid version specified');
    } else if (version === 'v2') {
      return new DownloadYourGenerationsPageImpl(this.page);
    }
    throw new Error('Invalid version specified');
  }
}
