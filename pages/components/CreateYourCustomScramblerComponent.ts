import { BasePage } from '../BasePage';

export class CreateYourCustomScramblerComponent extends BasePage {
    private locators = {
        submitButton: 'button[type="submit"]',
        inputCustomScramblerPrompt: 'textarea[name="prompt"]',
    };

    async inputCustomScramblerPrompt(prompt: string): Promise<void> {
        const element = await this.getVisibleElement(this.locators.inputCustomScramblerPrompt);
        await element.fill(prompt);
    }

    async submitForm(): Promise<void> {
        const element = await this.getVisibleElement(this.locators.submitButton);
        await element.click();
    }


}