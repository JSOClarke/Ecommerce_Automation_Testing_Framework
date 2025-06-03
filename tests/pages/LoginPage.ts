import { Locator, Page } from "@playwright/test";

export default class LoginPage{

    private page:Page;
    private emailInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;


constructor(page:Page){
this.page = page;
this.emailInput = this.page.getByTestId('email');
this.passwordInput = this.page.getByTestId('password');
this.loginButton = this.page.getByTestId('login-submit')
}

async clickLoginButton(){
    await this.loginButton.click();
}   

async inputLogin(email:string, password:string){

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
}


}