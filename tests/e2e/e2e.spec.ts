import { test, Page, expect, } from "@playwright/test";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/productPage";
import CartPage from "../pages/cartPage";
import { validCreds } from "../data/validCreds";
import { validBillingCreds } from "../data/validBillingCreds";
import signInPage from "../pages/SignInPage";

const ADD_TO_CART_WAIT = 5000;
const baseUrl = 'https://practicesoftwaretesting.com/'


test('@Smoke , #E2E01 Full Guest Purchase', async ({page})=> {

const homeP = new HomePage(page);

await page.goto(baseUrl);

await homeP.selectFirstItem();

const productP = new ProductPage(page);

await productP.addQuanity(1);
await productP.addToCart();
await page.waitForTimeout(ADD_TO_CART_WAIT)
await productP.clickOnCart();

const cartP = new CartPage(page);

await cartP.clickSubmit();

await cartP.loginInput(validCreds[1]);
await cartP.loginSubmit();
await cartP.billingInput(validBillingCreds[0])
await cartP.billingSubmit();
await cartP.paymentInputCashonDelivery();
await cartP.paymentSubmit();
expect(cartP.isSuccessMessageVisible()).toBeTruthy();

})

test('@Smoke, #E2E03, Logged In Purchase', async ({page})=>{

const USER = 1;
await page.goto(baseUrl);

await page.locator('[data-test="nav-sign-in"]').click();

const loginP = new signInPage(page);

await loginP.inputLogin(validCreds[USER].email,validCreds[USER].password);

await loginP.clickLoginButton();

await page.waitForTimeout(1000);

const homePAfterLogin = new HomePage(page);
// Maybe add a check for the sign in names possibly

await homePAfterLogin.clickHomeButton();

await homePAfterLogin.selectFirstItem();

const productP = new ProductPage(page);

await productP.addQuanity(1);
await productP.addToCart();
await page.waitForTimeout(ADD_TO_CART_WAIT)
await productP.clickOnCart();

const cartP = new CartPage(page);

await cartP.clickSubmit();

await cartP.signSubmit();

await cartP.billingInput(validBillingCreds[USER])
await cartP.billingSubmit();
await cartP.paymentInputCashonDelivery();
await cartP.paymentSubmit();

await page.waitForTimeout(100);
await cartP.paymentSubmit();
})