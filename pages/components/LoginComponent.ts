import { BasePage } from '../BasePage';

export class LoginComponent extends BasePage {
    private locators = {
        usernameInput: '#user',
        passwordInput: '#pass',
        loginButton: 'text=Sign In',
        errorMessage: '.error-msg'
    };

    async login(username: string, password: string) {
        await this.fill(this.locators.usernameInput, username);
        await this.fill(this.locators.passwordInput, password);
        await this.click(this.locators.loginButton);
    }

    async verifyErrorMessage(errorMessage: string) {
        await this.assertTextContains(this.locators.errorMessage, errorMessage);
    }
}