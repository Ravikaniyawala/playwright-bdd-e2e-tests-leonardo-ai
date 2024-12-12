import { Browser, BrowserContext, Page, expect, Locator } from '@playwright/test';
import * as path from 'path';

export class BasePage {
  protected page: Page;
  protected browser: Browser;
  // @ts-ignore
  protected context: BrowserContext;

  constructor(page: Page) {
    this.page = page;
    // @ts-ignore
    this.browser = page.context().browser();
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async pause() {
    await this.page.pause();
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async getAttribute(selector: string, attribute: string): Promise<string | null> {
    return this.page.getAttribute(selector, attribute);
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page.isVisible(selector);
  }

  async isEnabled(selector: string): Promise<boolean> {
    return this.page.isEnabled(selector);
  }

  async isChecked(selector: string): Promise<boolean> {
    return this.page.isChecked(selector);
  }

  async waitForElementToBeInvisible(selector: string, timeout?: number): Promise<void> {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: 'hidden', timeout });
  }

  async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector);
  }

  async waitForTimeout(timeout: number) {
    await this.page.waitForTimeout(timeout);
  }

  async selectOption(selector: string, value: string) {
    await this.page.selectOption(selector, value);
  }

  async screenshot(options?: { path?: string; fullPage?: boolean }) {
    await this.page.screenshot(options);
  }

  async check(selector: string) {
    await this.page.check(selector);
  }

  async uncheck(selector: string) {
    await this.page.uncheck(selector);
  }

  async type(selector: string, text: string, options?: { delay: number }) {
    await this.page.type(selector, text, options);
  }

  async press(selector: string, key: string, options?: { delay: number }) {
    await this.page.press(selector, key, options);
  }

  async hover(selector: string) {
    await this.page.hover(selector);
  }

  async focus(selector: string) {
    await this.page.focus(selector);
  }

  async clear(selector: string) {
    await this.page.fill(selector, '');
  }

  async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load') {
    await this.page.waitForLoadState(state);
  }

  async waitForResponse(url: string) {
    await this.page.waitForResponse(url);
  }

  async reload() {
    await this.page.reload();
  }

  async goBack() {
    await this.page.goBack();
  }

  async goForward() {
    await this.page.goForward();
  }

  async setViewportSize(width: number, height: number) {
    await this.page.setViewportSize({ width, height });
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }

  async close() {
    await this.page.close();
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async selectCheckbox(selector: string) {
    const isChecked = await this.page.isChecked(selector);
    if (!isChecked) {
      await this.page.check(selector);
    }
  }

  async deselectCheckbox(selector: string) {
    const isChecked = await this.page.isChecked(selector);
    if (isChecked) {
      await this.page.uncheck(selector);
    }
  }

  async assertTextContains(selector: string, text: string) {
    const content = await this.page.textContent(selector);
    expect(content).toContain(text);
  }

  async assertElementVisible(selector: string) {
    const isVisible = await this.page.isVisible(selector);
    expect(isVisible).toBe(true);
  }

  async assertElementNotVisible(selector: string) {
    const isVisible = await this.page.isVisible(selector);
    expect(isVisible).toBe(false);
  }

  async assertElementEnabled(selector: string) {
    const isEnabled = await this.page.isEnabled(selector);
    expect(isEnabled).toBe(true);
  }

  async assertElementDisabled(selector: string) {
    const isEnabled = await this.page.isEnabled(selector);
    expect(isEnabled).toBe(false);
  }

  async fillFrame(frameSelector: string, inputSelector: string, text: string) {
    const frame = this.page.frameLocator(frameSelector);
    await frame.locator(inputSelector).fill(text);
  }

  async clickFrame(frameSelector: string, buttonSelector: string) {
    const frame = this.page.frameLocator(frameSelector);
    await frame.locator(buttonSelector).click();
  }

  async waitForPresenceOfElement(selector: string, timeout?: number): Promise<void> {
    const locator = this.page.locator(selector);
    await locator.first().waitFor({ state: 'attached', timeout });
  }

  async clickVisibleElementByText( text: string): Promise<void> {
    // Create a locator that finds elements containing the specified text
    const locator = this.page.locator(`text=${text}`);

    // Wait for the first matching element to be visible
    await locator.first().waitFor({ state: 'visible' });

    // Click on the first visible element
    await locator.first().click();
  }

  async isElementVisibleByText( text: string): Promise<boolean> {
    const locator = this.page.locator(`text=${text}`);

    try {
      await locator.first().waitFor({ state: 'visible' });
    } catch (error) {
      return false;
    }

    // return true if the element is visible
    return locator.first().isVisible();
  }

  async getVisibleElement(selector: string): Promise<Locator> {
    // Locate all matching elements
    await this.waitForPresenceOfElement(selector);
    const elements = this.page.locator(selector);

    // Get the count of elements
    const count = await elements.count();

    // Filter only visible elements
    const visibleElements: Locator[] = [];
    for (let i = 0; i < count; i++) {
      const element = elements.nth(i);
      if (await element.isVisible()) {
        visibleElements.push(element);
      }
    }
    if (visibleElements.length > 1) {
      throw new Error(`Multiple visible elements found for selector: ${selector}`);
    } else if (visibleElements.length === 0) {
      throw new Error(`No visible elements found for selector: ${selector}`);
    }

    return visibleElements[0];
  }

  async getVisibleElements(selector: string): Promise<Locator[]> {
    // Locate all matching elements
    const elements = this.page.locator(selector);

    // Get the count of elements
    const count = await elements.count();

    // Filter only visible elements
    const visibleElements: Locator[] = [];
    for (let i = 0; i < count; i++) {
      const element = elements.nth(i);
      if (await element.isVisible()) {
        visibleElements.push(element);
      }
    }

    return visibleElements;
  }



  async setDownloadPath(downloadDir: string) {
    // Resolve the absolute path for the download directory
    const downloadPath = path.resolve(downloadDir);

    // Close the existing page and context
    await this.page.close();
    await this.context.close();

    // Create a new browser context with the specified download path
    this.context = await this.browser.newContext({
      acceptDownloads: true,
      // @ts-ignore
      downloadsPath: downloadPath,
    });

    // Create a new page in the new context
    this.page = await this.context.newPage();
  }
}