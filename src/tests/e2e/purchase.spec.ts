import { test, expect } from '@playwright/test';
import { users } from '../../../utils/sauce.users';

test.describe('E2E Purchase Paths', () => {
    test('should add items to cart and complete checkout', async ({ page }) => {
        // login flow
        await page.goto('https://www.saucedemo.com/');
        await page.fill('[data-test="username"]', users.standardUser.username);
        await page.fill('[data-test="password"]', users.standardUser.password);
        await page.click('[data-test="login-button"]');

        // add items to cart from inventory page
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        expect(await page.locator('[data-test="shopping-cart-badge"]').innerText()).toBe('1');

        // add item to cart from product detils page
        await page.click('text=Sauce Labs Bike Light');
        await page.click('[data-test="add-to-cart"]');
        expect(await page.locator('[data-test="shopping-cart-badge"]').innerText()).toBe('2');

        // navigate to cart and checkout
        await page.click('[data-test="shopping-cart-link"]');
       
        // get all inventory item names in the cart
        const itemNames = await page.locator('[data-test="inventory-item-name"]').allInnerTexts();

        // assert that both items are present in the cart
        expect(itemNames).toEqual(expect.arrayContaining(['Sauce Labs Backpack', 'Sauce Labs Bike Light']));

        // complete checkout
        await page.click('[data-test="checkout"]');
        await page.fill('[data-test="firstName"]', 'John');
        await page.fill('[data-test="lastName"]', 'Doe');
        await page.fill('[data-test="postalCode"]', '12345');
        await page.click('[data-test="continue"]');

        // repeaat inventory check
        const itemCheck = await page.locator('[data-test="inventory-item-name"]').allInnerTexts();
        expect(itemCheck).toEqual(expect.arrayContaining(['Sauce Labs Backpack', 'Sauce Labs Bike Light']));

        // verify sum of inventory item prices is equal to the item total
        const itemPrices = await page.locator('[data-test="inventory-item-price"]').allInnerTexts();
        const itemTotal = await page.locator('[data-test="subtotal-label"]').innerText();
        const sum = itemPrices.reduce((acc, price) => acc + parseFloat(price.replace('$', '')), 0);
        expect(sum).toBe(parseFloat(itemTotal.replace('Item total: $', '')));
        // to-do: calculate tax (tax-label) and verify total (total-label)

        // finish purchase
        await page.click('[data-test="finish"]');
        expect(await page.locator('[data-test="complete-header"]').innerText()).toBe('Thank you for your order!');
    });    
});