import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProcuctPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';

const validUsername = 'standard_user';
const validPassword = 'secret_sauce';
const invalidUsername = 'locked-user';
const invalidPassword = 'wrong_password';

const firstName = 'John';
const lastName = 'Doe';
const zipCode = '12345';

const productsToOrder = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

// Test 1 - Happy Path Login
test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    await loginPage.goto();
    await loginPage.login(validUsername, validPassword);
    await expect(productPage.cartIcon).toBeVisible;
});

// Test 2 - Negative Login: invalid username
test('Login with invalid username, should display error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(invalidUsername, validPassword);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Epic sadface: Username and password do not match any user in this service');
});

// Test 3 - Negative Login: empty password
test('Login with empty password, should display error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUsername, '');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Password is required');
});

// Test 4 - Happy Path Order Flow
test('Complete order flow with 2 products', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new ConfirmationPage(page);

    await loginPage.goto();
    await loginPage.login(validUsername, validPassword);

    await productPage.sortByPriceLoHi();

    for (const product of productsToOrder){
        await productPage.addProductToCart(product);
    }
    await productPage.goToCart();

    const items = await cartPage.getCartItemNames();
    for (const product of productsToOrder){
        expect(items).toContain(product);
    }

    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutForm(firstName, lastName, zipCode);
    await checkoutPage.completePurchase();

    const confirmation = await confirmationPage.getConfirmationMessage();
    expect(confirmation).toContain('Thank you for your order!');
});