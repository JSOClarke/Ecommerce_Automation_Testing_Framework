import {expect, Locator, Page} from '@playwright/test'

export default class HomePage{


private page: Page
private homeButton: Locator;
private catButton: Locator;
private contactButton: Locator;
private signInButton: Locator;
private langButton: Locator;

private sortDropDown: Locator;
private priceRangeScroll: Locator;
private searchInput: Locator;
private searchInputCancel: Locator;
private searchInputSubmit: Locator;

private productsCardSelector: Locator; 
private productsCardImageSelector: Locator;

private firstItem: Locator;

constructor(page:Page){
    this.page = page;

    //HEADER ELEMENTS
    this.homeButton = this.page.locator('[data-test="nav-home"]');
    this.catButton = this.page.locator('[data-test="nav-categories"]');
    this.contactButton = this.page.locator('[data-test="nav-contact"]');
    this.signInButton = this.page.locator('[data-test="nav-sign-in"]');
    this.langButton = this.page.locator('[data-test="language-select"]');

    //CAT ELEMENTS

    this.sortDropDown = this.page.locator('[data-test="sort"]');
    this.priceRangeScroll = this.page.getByRole('slider', { name: 'ngx-slider-max' });
    this.searchInput = this.page.locator('[data-test="search-query"]');
    this.searchInputCancel = this.page.locator('[data-test="search-reset"]');
    this.searchInputSubmit = this.page.locator('[data-test="search-submit"]');

    //Item selection

    // this.firstItem = this.page.locator('.card').nth(0);

    // Universal PRODCUCT CARD
    this.productsCardSelector = this.page.locator('[data-test^="product-"]');
    this.productsCardImageSelector = this.page.locator('[data-test^="product-"] img');

    //

}

getProductElement(index:number):Locator{
    return this.productsCardSelector.nth(index);
}

getProductsCardImageSelector():Locator{
    return this.productsCardImageSelector;
}

getProductCardSelector():Locator{
    return this.productsCardSelector;
}

async selectFirstItem(){
    await this.productsCardSelector.nth(1).click();
}

async clickHomeButton(){
    await this.homeButton.click();
}

async clickCatButton(){
    await this.catButton.click();
}

async clickContactButton(){
    await this.contactButton.click();
}


async clickSignInButton(){
    await this.signInButton.click();
}


async clickLangButton(){
    await this.langButton.click();
}


async waitForPageLoad() {
  await this.page.waitForLoadState('load');
}

}