import { BasePage } from '../BasePage';


export class EnterYourDetailsComponent extends BasePage {
    private locators = {
        firstNameInput: 'input[name="firstName"]',
        lastNameInput: 'input[name="lastName"]',
        emailInput: 'input[name="email"]',
        selectCountryDropDown: 'select[name="country"]',
        termsAndConditionCheckBox: 'button#terms-check',
        privacyPolicyCheckBox: 'button#privacy-policy-check',
        submitButton: 'button[type="submit"]',
    };

    async enterFirstName(firstName: string): Promise<void> {
        const element = await this.getVisibleElement(this.locators.firstNameInput);
        await element.fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        const element = await this.getVisibleElement(this.locators.lastNameInput);
        await element.fill(lastName);
    }

    async enterEmail(email: string): Promise<void> {
        const element = await this.getVisibleElement(this.locators.emailInput);
        await element.fill(email);
    }

    async selectCountry(country: string): Promise<void> {
        // Wait for the dropdown to be visible
        const dropdown = await this.getVisibleElement(this.locators.selectCountryDropDown);
        await dropdown.waitFor({ state: 'visible' });

        // Select the option by label
        await dropdown.selectOption({ label: country });
    }

    async acceptTermsAndConditions(): Promise<void> {
        const element = await this.getVisibleElement(this.locators.termsAndConditionCheckBox);
        await element.check();
    }

    async acceptPreferences(): Promise<void> {
        const element = await this.getVisibleElement(this.locators.privacyPolicyCheckBox);
        await element.check();
    }

    async submitForm(): Promise<void> {
        const element = await this.getVisibleElement(this.locators.submitButton);
        await element.click();
    }

}