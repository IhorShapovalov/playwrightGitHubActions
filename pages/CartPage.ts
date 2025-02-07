import {Page, Locator} from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly backPackItem: Locator;
    readonly checkoutBtn: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCode: Locator;
    readonly userInfoContinueBtn: Locator;
    readonly finishBtn: Locator;
    readonly thanksForOrder: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backPackItem = page.locator('.inventory_item_name');
        this.checkoutBtn = page.locator('#checkout');
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.zipCode = page.locator('#postal-code');
        this.userInfoContinueBtn = page.locator('#continue');
        this.finishBtn = page.locator('#finish');
        this.thanksForOrder = page.locator('[data-test="complete-header"]');
    }

    readonly EXPECTED_CONFIRMATION_ORDER= 'Thank you for your order!';

    async clickCheckoutBtn(){
        await this.checkoutBtn.click();
    }

    async clickFinishBtn(){
        await this.finishBtn.click();
    }

    async clickUserInfoContinueBtnBtn(){
        await this.userInfoContinueBtn.click();
    }

    async userCheckoutInfo(userName: string, lastName: string, zipCode: number) {
        await this.firstNameInput.fill(userName);
        await this.lastNameInput.fill(lastName);
        await this.zipCode.fill(String(zipCode));
    }

    async getConfirmOrder() {
        const confirmOrderText = await this.thanksForOrder.textContent();
        return confirmOrderText;
    }

}