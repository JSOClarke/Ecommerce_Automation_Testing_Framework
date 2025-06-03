import { Locator, Page } from "@playwright/test";

export default class signInPage{

    private page:Page;
    private emailInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private loginErrorMsg: Locator;
    private emailErrorMsg: Locator;
    private passwordErrorMsg: Locator;3
    private registerButton: Locator;


constructor(page:Page){
this.page = page;
this.emailInput = this.page.getByTestId('email');
this.passwordInput = this.page.getByTestId('password');
this.loginButton = this.page.getByTestId('login-submit');
this.loginErrorMsg = this.page.locator('[data-test="login-error"]');
this.emailErrorMsg = this.page.locator('[data-test="email-error"]');
this.passwordErrorMsg = this.page.locator('[data-test="password-error"]');
this.registerButton = this.page.getByTestId('register-link');
}


getLoginErrorMsgLocator():Locator{
    return this.loginErrorMsg;
}

getPasswordErrorMsgLocator():Locator{

    return this.passwordErrorMsg;
}

getEmailErrorMsgLocator():Locator{
    return this.emailErrorMsg
}

async clickLoginButton(){
    await this.loginButton.click();
}   

async inputLogin(email:string, password:string){

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
}

async isErrorMsgPresent():Promise<boolean> {

    return this.loginErrorMsg.isVisible();
}


async isErrorVisible(): Promise<boolean> {
  return await this.loginErrorMsg.isVisible();
}


async clickRegisterButton(){
    await this.registerButton.click();
}

async waitForPageLoad() {
  await this.page.waitForLoadState('load');
}



}