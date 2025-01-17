import { test, expect } from '@playwright/test';
import { users } from '../../../utils/users';

test.describe('E2E Login Tests', () => {
    test('should load the login page', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const title = await page.title();
        expect(title).toBe('Swag Labs');
        const loginButton = await page.isVisible('[data-test="login-button"]');

    });

    test('should login with valid credentials', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('[data-test="username"]', users.standardUser.username);
        await page.fill('[data-test="password"]', users.standardUser.password);
        await page.click('[data-test="login-button"]');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
    
    test('should not login with invalid credentials', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('[data-test="username"]', users.invalidUser.username);
        await page.fill('[data-test="password"]', users.invalidUser.password);
        await page.click('[data-test="login-button"]');
        await expect(page.locator('[data-test="error"]')).toBeVisible();
    });

    test('should not login a locked out user', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('[data-test="username"]', users.lockedOutUser.username);
        await page.fill('[data-test="password"]', users.lockedOutUser.password);
        await page.click('[data-test="login-button"]');
        await expect(page.locator('[data-test="error"]')).toBeVisible();
    });

    test('product page should load in less than 1 second', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('[data-test="username"]', users.performanceGlitchUser.username);
        await page.fill('[data-test="password"]', users.performanceGlitchUser.password);
        await page.click('[data-test="login-button"]');
        const response = await page.waitForResponse('**/inventory.html');
        expect(response.timing.receiveHeadersEnd - response.timing.sendEnd).toBeLessThanOrEqual(1000);
        
    });
});