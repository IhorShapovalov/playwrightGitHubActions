import { test } from "../fixtures/appFixture";
import { expect } from "@playwright/test";

test.describe('Cart Page Tests @smoke', () => {
    test.beforeEach(async ({ basePage, loginPage, homePage, loginData }) => {
        await basePage.openApp();
        await loginPage.login(loginData.standard_user.login, loginData.standard_user.password);
        await homePage.addBackBackToCart();
        await homePage.goToCart();
    });

    test('Verify checkout button', async ({cartPage}) => {
        const { checkoutBtn } = cartPage;
        await expect(checkoutBtn).toBeVisible();
        await expect(checkoutBtn).toBeEnabled();
    })

});