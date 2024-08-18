// @ts-ignore
import { Page, expect, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
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
}