import {Locator, Page} from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly HomePageHeading: Locator;
    readonly backPackAddToCart: Locator;
    readonly backPackRemoveBtn: Locator;
    readonly cartIcon: Locator;
    readonly title: Locator;
    readonly productSortContainer: Locator;
    readonly inventoryItemPrice: Locator;

    constructor(page: Page){
        this.page = page;
        this.HomePageHeading = page.locator('.app_logo');
        this.backPackAddToCart = page.locator('#add-to-cart-sauce-labs-backpack');
        this.backPackRemoveBtn = page.locator('#remove-sauce-labs-backpack');
        this.cartIcon = page.locator('#shopping_cart_container');
        this.title = page.locator('.title');
        this.productSortContainer = page.locator('.product_sort_container');
        this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]');
    }

    readonly NAME_A_TO_Z = "az";
    readonly NAME_Z_TO_A = "za";
    readonly NAME_LOW_TO_HIGH = "lohi";
    readonly NAME_HIGH_TO_LOW = "hilo";
    readonly HOME_PAGE_TITLE = "Products";

    async addBackBackToCart(){
        await this.backPackAddToCart.click();
    }

    async goToCart(){
        await this.cartIcon.click()
    }

    async clickProductSortContainer(){
        await this.productSortContainer.click();
    }

    async sortProductContainer(sortParam:string){
        await this.productSortContainer.selectOption(sortParam);
    }

    async getAllTextInventoryItemPrice() {
        const pricesText = await this.inventoryItemPrice.allTextContents();
        return pricesText.map(price => parseFloat(price.replace('$', '')));
    }

    async isSortProductPriceAToZCorrect(prices: any[]) {
        const resolvedPrices = await Promise.all(prices);
        const firstItemPrice = resolvedPrices[0];
        const secondItemPrice = resolvedPrices[1];
        return firstItemPrice >= secondItemPrice;
    }
}