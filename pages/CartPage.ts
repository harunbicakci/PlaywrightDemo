import { Page, Locator } from '@playwright/test';

export class CartPage{

    readonly cartItemNames: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(readonly page: Page){
        this.cartItemNames = page.locator('.cart_item .inventory_item_name');
        this.checkoutButton = page.locator('#checkout');
        this.continueShoppingButton = page.locator('#continue-shopping');
    }

    async getCartItemNames(): Promise<string[]> {
        return await this.cartItemNames.allTextContents();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}