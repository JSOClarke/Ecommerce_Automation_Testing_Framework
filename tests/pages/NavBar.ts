import { Page, Locator } from "@playwright/test";
export default class NavBar{
    private page: Page;
    private homeButton: Locator;
    private catButton: Locator;
    private contactButton: Locator;
    private signInButton: Locator;
    private langButton: Locator;
    private navBarHandTools: Locator;
    private navBarPowerTools: Locator;
    private navBarOther: Locator;
    private navBarSpecialTools: Locator;
    private navBarRentals: Locator;
    private navbarLangDE: Locator;
    private navbarLangEN: Locator;
    private navbarLangES: Locator;
    private navbarLangFR: Locator;
    private navbarLangNL: Locator;
    private navbarLangTR: Locator;
    private navbarLogo: Locator;
    private cartNavButton: Locator;
    private cartQuantity: Locator;

    

    constructor(page:Page){
        this.page = page;
        this.homeButton = this.page.locator('[data-test="nav-home"]');
        this.catButton = this.page.locator('[data-test="nav-categories"]');
        this.contactButton = this.page.locator('[data-test="nav-contact"]');
        this.signInButton = this.page.locator('[data-test="nav-sign-in"]');
        this.langButton = this.page.locator('[data-test="language-select"]');
        this.navBarHandTools = this.page.getByTestId('nav-hand-tools')  
        this.navBarPowerTools = this.page.getByTestId('nav-power-tools')
        this.navBarOther = this.page.getByTestId('nav-other')
        this.navBarSpecialTools = this.page.getByTestId('nav-special-tools')
        this.navBarRentals = this.page.getByTestId('nav-rentals')
        this.navbarLangDE = this.page.getByTestId('lang-de')
        this.navbarLangEN = this.page.getByTestId('lang-en');
        this.navbarLangES = this.page.getByTestId('lang-es');
        this.navbarLangFR = this.page.getByTestId('lang-fr');
        this.navbarLangNL = this.page.getByTestId('lang-nl');
        this.navbarLangTR = this.page.getByTestId('lang-tr');
        this.navbarLogo = this.page.locator('.navbar-brand');
        this.cartNavButton = this.page.getByTestId('nav-cart');
        this.cartQuantity = this.page.getByTestId('cart-quantity');



    }

    getCartQuantity():Locator{
        return this.cartQuantity;
    }

    async clickNavCart(){
        await this.cartNavButton.click();
    }

    async clickLogo(){
        await this.navbarLogo.click();
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

    async clickNavBarHandTools() {
            await this.catButton.click();
    await this.navBarHandTools.click();
    }

    async clickNavBarPowerTools() {
            await this.catButton.click();
    await this.navBarPowerTools.click();
    }

    async clickNavBarOther() {
            await this.catButton.click();
    await this.navBarOther.click();
    }

    async clickNavBarSpecialTools() {
            await this.catButton.click();
    await this.navBarSpecialTools.click();
    }

    async clickNavBarRentals() {
            await this.catButton.click();
    await this.navBarRentals.click();
    }

    async clickNavbarLangDE() {
    await this.navbarLangDE.click();
    }

    async clickNavbarLangEN() {
    await this.navbarLangEN.click();
    }

    async clickNavbarLangES() {
    await this.navbarLangES.click();
    }

    async clickNavbarLangFR() {
    await this.navbarLangFR.click();
    }

    async clickNavbarLangNL() {
    await this.navbarLangNL.click();
    }

    async clickNavbarLangTR() {
    await this.navbarLangTR.click();
    }


}