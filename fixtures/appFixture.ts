import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";
import { BasePage } from "../pages/BasePage";
import loginData from "../test_data/loginData.json";
import checkoutData from "../test_data/checkoutData.json";
import { LoginData } from "../types/loginData";
import { CheckoutData } from "../types/checkoutData";

// Define the fixtures for Page Objects
type PageObjectFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    cartPage: CartPage;
    basePage: BasePage;
};

// Define the fixtures for test data
type DataFixtures = {
    loginData: LoginData;
    checkoutData: CheckoutData;
};

// Centralized timeout configuration
const TIMEOUTS = {
    slow: 10000,
    extremelySlow: 20000,
};

// Extend Playwright's base test with custom fixtures for both page objects and test data
export const test = baseTest.extend<PageObjectFixtures & DataFixtures>({
    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);
        await use(basePage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
    loginData: async ({}, use) => {
        await use(loginData);
    },
    checkoutData: async ({}, use) => {
        await use(checkoutData);
    },
});

// Export expect with custom timeouts for consistent test execution
export const expect = test.expect;
export const slowExpect = expect.configure({ timeout: TIMEOUTS.slow });
export const extremelySlowExpect = expect.configure({ timeout: TIMEOUTS.extremelySlow });
