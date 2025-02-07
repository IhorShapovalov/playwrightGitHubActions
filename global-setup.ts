//global setup can be added to the playwright-config.ts to run before tests.
// import {chromium, expect} from "@playwright/test";
//
// async function global_setup() {
//     const browser = await chromium.launch();
//     const context = await browser.newContext();
//     const page = await context.newPage();
//
//     await page.goto("https://www.saucedemo.com/");
//     await page.fill('input[name="username"]', 'Admin');
//     await page.fill('input[name="password"]', 'admin123');
//     await page.click('button[type="submit"]');
//
//
//     await page.context().storageState({path: './playwright/.auth/auth.json'})
// }
//
// export default global_setup;