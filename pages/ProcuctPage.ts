import { Page, Locator } from '@playwright/test';

export class ProductPage {

    readonly cartIcon: Locator;
    readonly appLogo: Locator;
    readonly menuButton: Locator;
    readonly productSortContainer: Locator;

    constructor(readonly page: Page){
        this.cartIcon = page.locator('.shopping_cart_link');
        this.appLogo = page.locator('.app_logo');
        this.menuButton = page.locator('.bm-burger-button');
        this.productSortContainer = page.locator('.product_sort_container');
    }

    getAddToCartButton(productName: string): Locator {
        return this.page.locator('.inventory_item').filter({
        has: this.page.locator(`.inventory_item_name:has-text("${productName}")`)
        }).locator('button');
    }

    async addProductToCart(productName: string){
        await this.getAddToCartButton(productName).click();
    }

    async goToCart(){
        await this.cartIcon.click();
    }

    async sortByPriceLoHi(){
        await this.productSortContainer.selectOption('lohi');
    }



}