import { Page, Locator } from '@playwright/test';

export class CheckoutPage{

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCope: Locator;
    readonly pageTitle: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly cancelButton: Locator;

    constructor(readonly page: Page) {
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.zipCope = page.locator('#postal-code');
        this.pageTitle = page.locator('.title');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.cancelButton = page.locator('#cancel');   
    }

    async fillCheckoutForm(firstName: string, lastName: string, zipCode: string){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCope.fill(zipCode);
        await this.continueButton.click();
    }

    async completePurchase(){
        await this.finishButton.click();
    }
}