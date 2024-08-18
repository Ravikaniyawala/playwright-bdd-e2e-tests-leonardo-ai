import { BasePage } from '../BasePage';
import { Card } from '../../utils/testdata/Card';

export class CardDetailsComponent extends BasePage {
    private locators = {
        selectCreditCardPayment: 'locator',
        inputCardNumber: 'input[name="cardNumber"]',
        inputCardHolderName: 'input[name="cardholderName"]',
        inputExpiryDate: 'input[name="expiryDate"]',
        inputCvv: 'input[name="cvv"]',
        tnc: 'input[name="consent"]',
        confirmPaymentMethod: 'locator',
        payNow: 'locator'
    };

    async enterCardDetails(card: Card): Promise<void> {
        await this.click(this.locators.selectCreditCardPayment);
        await this.fill(this.locators.inputCardNumber, card.getCardNumber());
        await this.fill(this.locators.inputCardHolderName, card.getNameOnCard());
        await this.fill(this.locators.inputExpiryDate, card.getExpiryMonth() + card.getExpiryYear().slice(-2));
        await this.fill(this.locators.inputCvv, card.getSecurityCode());
    }

    async acceptTnc(): Promise<void> {
        await this.check(this.locators.tnc);
    }

    async clickConfirmPayment(): Promise<void> {
        await this.click(this.locators.confirmPaymentMethod);
    }

    async clickOnPayNow(): Promise<void> {
        await this.click(this.locators.payNow);
    }
}