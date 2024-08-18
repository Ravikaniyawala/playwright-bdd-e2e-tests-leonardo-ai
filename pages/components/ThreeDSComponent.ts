import { BasePage } from '../BasePage';
import { Card } from '../../utils/testdata/Card';

export class ThreeDSComponent extends BasePage {
    private locators = {
        threeDSCodeInput: 'locator',
        threeDSSubmitButton: 'locator'
    };

    async enter3DSCode(card: Card): Promise<void> {
        await this.fillFrame('iFrameLocator', this.locators.threeDSCodeInput, card.getSecurityCode());
        await this.clickFrame('iFrameLocator]', this.locators.threeDSSubmitButton);
    }
}