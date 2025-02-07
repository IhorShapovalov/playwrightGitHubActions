import { test } from "../fixtures/appFixture";
import { expect } from "@playwright/test";

test.describe('Login Page Tests @smoke', () => {

    test.beforeEach(async ({ basePage }) => {
        await basePage.openApp();
    });

    test("Username text box should be visible, enabled, and focusable", async ({ loginPage }) => {
        const { usernameTextBox } = loginPage;
        await expect(usernameTextBox).toBeVisible();
        await expect(usernameTextBox).toBeEnabled();
        await usernameTextBox.click();
        await expect(usernameTextBox).toBeFocused();
    });

    test("Password text box should be visible, enabled, and focusable", async ({ loginPage }) => {
        const { passwordTextBox } = loginPage;
        await expect(passwordTextBox).toBeVisible();
        await expect(passwordTextBox).toBeEnabled();
        await passwordTextBox.click();
        await expect(passwordTextBox).toBeFocused();
    });

    test("Login button should be visible and enabled", async ({ loginPage }) => {
        const { loginBtn } = loginPage;
        await expect(loginBtn).toBeVisible();
        await expect(loginBtn).toBeEnabled();
    });

    test.describe('Login Error Scenarios', () => {
        test("Should display error when username and password are empty", async ({ loginPage, loginData }) => {
            await loginPage.login(loginData.empty_user.login, loginData.empty_user.password);
            await expect(loginPage.errorMsg).toBeVisible();
            await expect(loginPage.errorMsg).toHaveText(loginPage.USERNAME_REQUIRED_ERROR);
        });

        test("Should display error when password is empty", async ({ loginPage, loginData }) => {
            await loginPage.login(loginData.standard_user.login, loginData.empty_user.password);
            await expect(loginPage.errorMsg).toBeVisible();
            await expect(loginPage.errorMsg).toHaveText(loginPage.PASSWORD_REQUIRED_ERROR);
        });

        test("Should display error when username is incorrect", async ({ loginPage, loginData }) => {
            await loginPage.login(loginData.wrong_user_name_and_password.login, loginData.standard_user.password);
            await expect(loginPage.errorMsg).toBeVisible();
            await expect(loginPage.errorMsg).toHaveText(loginPage.USERNAME_PASSWORD_MISMATCH_ERROR);
        });

        test("Should display error when password is incorrect", async ({ loginPage, loginData }) => {
            await loginPage.login(loginData.standard_user.login, loginData.wrong_user_name_and_password.password);
            await expect(loginPage.errorMsg).toBeVisible();
            await expect(loginPage.errorMsg).toHaveText(loginPage.USERNAME_PASSWORD_MISMATCH_ERROR);
        });

        test("Should display error when user is locked out", async ({ loginPage, loginData }) => {
            await loginPage.login(loginData.locked_out_user.login, loginData.locked_out_user.password);
            await expect(loginPage.errorMsg).toBeVisible();
            await expect(loginPage.errorMsg).toHaveText(loginPage.LOCKED_USER_ERROR);
        });
    });

    test.describe('Login Success Scenarios', () => {
        test("Should login successfully with valid credentials", async ({ loginPage, homePage, loginData }) => {
            await loginPage.login(loginData.standard_user.login, loginData.standard_user.password);
            await expect(homePage.title).toHaveText(homePage.HOME_PAGE_TITLE);
        });

        test("Should login successfully with performance glitch user", async ({ loginPage, homePage, loginData }) => {
            test.slow();
            const startTime = Date.now();
            await loginPage.login(loginData.performance_glitch_user.login, loginData.performance_glitch_user.password);
            const endTime = Date.now();
            const loginDuration = endTime - startTime;
            expect(loginDuration).toBeLessThan(10000);
            await expect(homePage.title).toHaveText(homePage.HOME_PAGE_TITLE);
        });
    });
});