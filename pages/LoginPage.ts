import { Page, Locator } from '@playwright/test';

export class LoginPage {

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(readonly page: Page){
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton =  page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goto(){
        await this.page.goto('https://www.saucedemo.com');
    }

    async login(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage(): Promise<string | null> {
        return await this.errorMessage.textContent();
    }
}