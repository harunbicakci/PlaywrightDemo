import { Page, Locator } from '@playwright/test';

export class ConfirmationPage{
    readonly confirmationText: Locator;

    constructor(readonly page: Page){
        this.confirmationText = page.locator('.complete-header');
    }

    async getConfirmationMessage(): Promise<string | null> {
        return await this.confirmationText.innerText();
    }

}