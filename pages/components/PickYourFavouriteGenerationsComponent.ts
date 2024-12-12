import { BasePage } from '../BasePage';


export class PickYourFavouriteGenerationsComponent extends BasePage {
    private locators = {
        generatedImages: 'img[alt="generated image"]',
        nextButton: '//div[contains(text(),"Next")]'
    };

    async pickYourFavouriteGenerations(): Promise<void> {
        const elements = await this.getVisibleElements(this.locators.generatedImages);

        if (elements.length === 0) {
            throw new Error(`No visible elements found for selector: ${this.locators.generatedImages}`);
        }

        const randomIndex = Math.floor(Math.random() * elements.length);
        await elements[randomIndex].click();
    }

    async getGeneratedImagesCount(): Promise<number> {
        const elements = await this.getVisibleElements(this.locators.generatedImages);
        return elements.length;
    }

    async clickOnNext(): Promise<void> {
        const element = await this.getVisibleElement(this.locators.nextButton);
        await element.click();
    }




}