import { Locator, Page } from "@playwright/test";

export default class ProducePage {
    private page: Page;
    
    //PRODUCTS TOP SIDE
    
    private plusQButton: Locator;
    private minusQButton: Locator;
    private addFavButton: Locator;
    private addToCartButton: Locator;
    private productTitle: Locator;
    private productDetails: Locator;


    //PRODUCT DETAILS BOTTOM SIDE

    private firstRelatedProduct: Locator;

    //MISC 
    
    private cartNavButton: Locator;

    constructor(page:Page){
        this.page = page;
        this.plusQButton = this.page.getByTestId('increase-quantity');
        this.minusQButton = this.page.getByTestId('decrease-quantity');
        this.addToCartButton = this.page.getByTestId('add-to-cart');
        this.addFavButton = this.page.getByTestId('add-to-favorites')

        this.firstRelatedProduct = this.page.locator('.card').nth(0);
    
        this.cartNavButton = this.page.getByTestId('nav-cart');
        this.productTitle = this.page.getByTestId('product-name');
        this.productDetails = this.page.getByTestId('product-description')
    }

    getProductDetails():Locator{
        return this.productDetails;
    }
    getProductTitle():Locator{
        return this.productTitle;
    }
    async addQuanity(amount:number){
        for(let x = 0; x<amount; x++){
        await this.plusQButton.click();
        }
    }

    async addToCart (){
        await this.addToCartButton.click();
    }

    async addToFavourites(){
        await this.addFavButton.click();
    }

    async clickOnCart(){
        await this.cartNavButton.click();
    }

async waitForPageLoad() {
  await this.page.waitForLoadState('load');
}



}