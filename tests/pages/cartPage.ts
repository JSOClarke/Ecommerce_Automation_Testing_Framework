import { Locator, Page } from "@playwright/test";
export default class CartPage{
    private page: Page;
    private submitButton: Locator;
    private emailInput: Locator;
    private passwordInput: Locator;
    private submitLogin: Locator;
    private signInCheckout: Locator;
    private billingCheckout: Locator;
    private streetInput:Locator;
    private cityInput:Locator;
    private stateInput:Locator;
    private countryInput:Locator;
    private postcodeInput:Locator;
    private paymentMethodDropDown: Locator;
    private confirmFinish: Locator;
    private paymentFinish2: Locator;
    private checkoutTitle: Locator;
    private paymentTitle: Locator;
    private billingTitle: Locator;
    private cartUpdateInput: Locator;
    private cartRemoteButton: Locator;


    constructor(page: Page){
    
        this.page = page;
        this.submitButton = this.page.getByTestId('proceed-1');
        this.emailInput = this.page.getByTestId('email');
        this.passwordInput = this.page.getByTestId('password');   
        this.submitLogin = this.page.getByTestId('login-submit');
        this.billingCheckout = this.page.getByTestId('proceed-3')
        this.signInCheckout = this.page.getByTestId('proceed-2')
        this.streetInput = this.page.locator('[data-test="street"]')
        this.cityInput = this.page.locator('[data-test="city"]')
        this.stateInput = this.page.locator('[data-test="state"]')
        this.countryInput = this.page.locator('[data-test="country"]')
        this.postcodeInput = this.page.locator('[data-test="postal_code"]')
        this.paymentMethodDropDown = this.page.locator('[data-test="payment-method"]')
        this.confirmFinish = this.page.getByTestId('finish');
        this.paymentFinish2 = this.page.locator('[disabled=""]');
        this.checkoutTitle = this.page.locator('h3');
        this.paymentTitle = this.page.getByRole('heading', {name: 'Payment'});
        this.billingTitle = this.page.getByRole('heading', {name: 'Billing Address'});
        this.cartUpdateInput = this.page.getByTestId('product-quantity');
        this.cartRemoteButton = this.page.locator('a .btn-danger');
        
    
    }

getCartUpdateInput():Locator{
    return this.cartUpdateInput;
}

getCartRemoveButton():Locator{
    return this.cartRemoteButton;
}

getBillingSubmit():Locator{
    return this.billingCheckout;
}

getPaymentTitleLocator():Locator{
    return this.paymentTitle;
}

getBillingTitleLocator():Locator{
    return this.billingTitle;
}

    async clickSubmit(){
        await this.submitButton.click();
    }

    async loginInput({email, password}){
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async loginSubmit(){
        await this.submitLogin.click();
        await this.signInCheckout.click();

    }

    async signSubmit(){
        await this.signInCheckout.click();

    }

    async billingInput({ street, city, state, country, postcode }){
        await this.streetInput.fill(street);
        await this.cityInput.fill(city);
        await this.stateInput.fill(state);
        await this.countryInput.fill(country);
        await this.postcodeInput.fill(postcode);
    }

    async billingSubmit(){
        await this.billingCheckout.click();
    }

    async paymentInputCashonDelivery(){
        await this.paymentMethodDropDown.click();
        await this.page.selectOption('#payment-method', {label: 'Cash on Delivery'});

  
    }



    async selectPaymentMethod(method:string){
        await this.page.selectOption('#payment-method', {label: method});

  
    }

    async paymentSubmit(){
        await this.confirmFinish.click();
    }

    getSuccessMessage(){
        return this.page.getByTestId('payment-success-message');
    }

    async isSuccessMessageVisible(): Promise<boolean>{
        return await this.getSuccessMessage().isVisible()

        // return
    }



async isConfirmStateSwitch() {

    return await this.confirmFinish.getAttribute('disabled');
    // const hasDisabledAttr = await this.confirmFinish.getAttribute('disabled');    
    // return hasDisabledAttr == null;
}

async waitForEnabled(locator: Locator, timeout = 5000) {
  const elementHandle = await locator.elementHandle();
  if (!elementHandle) throw new Error('Element not found');

  await this.page.waitForFunction(
    (el) => !el.hasAttribute('disabled'),
    elementHandle,
    { timeout }
  )

}

async waitForPageLoad() {
  await this.page.waitForLoadState('load');
}


}
