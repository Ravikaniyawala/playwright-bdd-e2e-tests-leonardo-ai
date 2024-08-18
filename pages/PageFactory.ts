// @ts-ignore
import { Page } from '@playwright/test';
import { UppPageImpl } from './implementations/UppPageImpl';

export class PageFactory {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  createUppPage(version: 'v1' | 'v2'): UppPageImpl {
    //instead of v1 and v2, use toggle to choose implementation
    if (version === 'v1') {
      throw new Error('Invalid version specified');
    } else if (version === 'v2') {
      return new UppPageImpl(this.page);
    }
    throw new Error('Invalid version specified');
  }

  // Add methods to create other Page Objects as needed
}
