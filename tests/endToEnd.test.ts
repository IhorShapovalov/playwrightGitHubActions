import { test, expect } from "../fixtures/appFixture";

test.describe('End-to-End Purchase Flow @regression', () => {

    // Detailed test case to validate the full purchase flow, from login to confirmation
    test("Verify successful purchase", async ({ basePage, loginPage, homePage, cartPage, loginData, checkoutData }) => {
        await basePage.openApp();
        await loginPage.login(loginData.standard_user.login, loginData.standard_user.password);
        await homePage.addBackBackToCart();
        await homePage.goToCart();
        await cartPage.clickCheckoutBtn();
        await cartPage.userCheckoutInfo(checkoutData.userFirstName, checkoutData.userLastName, checkoutData.userZipCode);
        await cartPage.clickUserInfoContinueBtnBtn();
        await cartPage.clickFinishBtn();
        const actualConfirmationText = await cartPage.getConfirmOrder();
        expect(actualConfirmationText).toEqual(cartPage.EXPECTED_CONFIRMATION_ORDER);
    });
});
