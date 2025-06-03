import { Locator, Page } from "@playwright/test";

export default class RegisterPage{
    private page:Page;
    private firstNameInput:Locator;
    private lastNameInput:Locator;
    private streetInput:Locator;
    private postCodeInput:Locator;
    private cityInput:Locator;
    private stateInput:Locator;
    private countryInput:Locator;
    private phoneInput: Locator;
    private emailInput:Locator;
    private passwordInput:Locator;
    private registerSubmitButton: Locator
    private dobInput: Locator;
    private registrationErrorMsg: Locator;
    private passwordErrMsg: Locator;


    constructor(page:Page){

        this.page = page;
        this.firstNameInput = this.page.getByTestId('first-name');
        this.lastNameInput= this.page.getByTestId('last-name');
        this.streetInput = this.page.getByTestId('street');
        this.postCodeInput = this.page.getByTestId('postal_code');
        this.cityInput = this.page.getByTestId('city');
        this.stateInput = this.page.getByTestId('state');
        this.countryInput = this.page.getByTestId('country');
        this.phoneInput = this.page.getByTestId('phone');
        this.emailInput = this.page.getByTestId('email');
        this.passwordInput = this.page.getByTestId('password');
        this.registerSubmitButton = this.page.getByTestId('register-submit');
        this.dobInput = this.page.getByTestId('dob');
        this.registrationErrorMsg = this.page.getByTestId('register-error');
        this.passwordErrMsg = this.page.getByTestId('password-error')

    }


    async inputRegistration({firstName, lastName, street, postCode,city,state,country,phone,email,password,dob}){

        // == Normal Input
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName)
        await this.streetInput.fill(street)
        await this.postCodeInput.fill(postCode);
        await this.cityInput.fill(city);
        await this.stateInput.fill(state);
        await this.phoneInput.fill(phone);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);

        // == Drop Down Selection
        await this.countryInput.click();
        await this.countryInput.selectOption({label: country});

        // == Calendar Selection
        await this.dobInput.click();
        await this.dobInput.fill(dob);
            
    }

    getRegistrationErrorMsg():Locator{
        return this.registrationErrorMsg;
    }

    getPasswordErrorMsg():Locator{
        return this.passwordErrMsg;
    }


    async submitRegistration(){
        await this.registerSubmitButton.click()
    }

    async waitForPageLoad() {
  await this.page.waitForLoadState('load');
    }

    
}