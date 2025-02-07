import { test } from "../fixtures/appFixture";
import { expect } from "@playwright/test";

test.describe('Home Page Tests @smoke', () => {
    test.beforeEach(async ({ basePage, loginPage, loginData }) => {
        await basePage.openApp();
        await loginPage.login(loginData.standard_user.login, loginData.standard_user.password);
    });

    test('Verify add to cart Button Visibility', async ({homePage}) => {
        const { backPackAddToCart, backPackRemoveBtn} = homePage;
        await expect(backPackAddToCart).toBeVisible();
        await expect(backPackAddToCart).toBeEnabled();
        await homePage.addBackBackToCart();
        await expect(backPackRemoveBtn).toBeVisible();
        await expect(backPackRemoveBtn).toBeVisible();
    })

    test('Verify Product Sort High to Low', async ({homePage}) => {
        await homePage.sortProductContainer(homePage.NAME_HIGH_TO_LOW);
        const textPrices = await homePage.getAllTextInventoryItemPrice();
        const isSortCorrect = await homePage.isSortProductPriceAToZCorrect(textPrices);
        expect(isSortCorrect).toEqual(true);
    })
});