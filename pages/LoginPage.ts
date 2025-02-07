import {Page, Locator} from "@playwright/test";

export class LoginPage {

    readonly page: Page;
    readonly usernameTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly loginBtn: Locator;
    readonly errorMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameTextBox = page.locator('#user-name');
        this.passwordTextBox = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
        this.errorMsg = page.locator('h3[data-test="error"]');
    }

    // Error messages
    readonly USERNAME_REQUIRED_ERROR = 'Epic sadface: Username is required';
    readonly PASSWORD_REQUIRED_ERROR = 'Epic sadface: Password is required';
    readonly USERNAME_PASSWORD_MISMATCH_ERROR = 'Epic sadface: Username and password do not match any user in this service';
    readonly LOCKED_USER_ERROR = 'Epic sadface: Sorry, this user has been locked out.';

    async login(username: string, password: string) {
        await this.usernameTextBox.fill(username);
        await this.passwordTextBox.fill(password);
        await this.loginBtn.click();
    }

}