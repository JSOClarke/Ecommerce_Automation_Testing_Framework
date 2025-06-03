import { test, Page, expect,Locator } from "@playwright/test";
import HomePage from "../pages/homepage";
import ProductPage from "../pages/productPage";
import CartPage from "../pages/cartPage";
import { validCreds } from "../data/validCreds";
import { validBillingCreds } from "../data/validBillingCreds";
import LoginPage from "../pages/LoginPage";
// import homePage from "../pages/homepage.spec";


const baseUrl = 'https://practicesoftwaretesting.com/'

test('@Smoke , #E2E01 Full Guest Purchase', async ({page})=> {

const homeP = new HomePage(page);

await page.goto(baseUrl);

await homeP.selectFirstItem();

const productP = new ProductPage(page);

await productP.addQuanity(1);
await productP.addToCart();
await page.waitForTimeout(5000)
await productP.clickOnCart();

const cartP = new CartPage(page);

await cartP.clickSubmit();

await cartP.loginInput(validCreds[0]);
await cartP.loginSubmit();
await cartP.billingInput(validBillingCreds[0])
await cartP.billingSubmit();
await cartP.paymentInputCashonDelivery();
await cartP.paymentSubmit();
expect(cartP.isSuccessMessageVisible()).toBeTruthy();
await page.pause();

})

test('@Smoke, #E2E03, Logged In Purchase', async ({page})=>{


await page.goto(baseUrl);

await page.locator('[data-test="nav-sign-in"]').click();

const loginP = new LoginPage(page);

await loginP.inputLogin(validCreds[0].email,validCreds[0].password);

await loginP.clickLoginButton();

await page.waitForTimeout(1000);

const homePAfterLogin = new HomePage(page);
// Maybe add a check for the sign in names possibly

await homePAfterLogin.clickHomeButton();

await homePAfterLogin.selectFirstItem();

const productP = new ProductPage(page);

await productP.addQuanity(1);
await productP.addToCart();
await page.waitForTimeout(5000)
await productP.clickOnCart();

const cartP = new CartPage(page);

await cartP.clickSubmit();

await cartP.signSubmit();

await cartP.billingInput(validBillingCreds[0])
await cartP.billingSubmit();
await cartP.paymentInputCashonDelivery();
await cartP.paymentSubmit();

await page.waitForTimeout(100);

// const buttonHandle = page.getByTestId('finish');

// await cartP.waitForEnabled(buttonHandle);

// await expect(button).toBeVisible({timeout: 1000});
// await expect(button).toBeEnabled({timeout: 1000});
await cartP.paymentSubmit();

await page.pause();

// expect()
// // await expect(page.getByTestId('finish')).toBeEnabled();

// const isEnabled = await cartP.getConfirmStateSwitch();
// if(isEnabled){
//     await cartP.paymentSubmit();
// }

// expect(cartP.getConfirmStateSwitch()).toBeTruthy();
// await page.pause();
// await page.waitForTimeout(1000)




// await expect(page.getByTestId('finish')).toBeDisabled();
// await expect(page.getByTestId('finish')).not.toBeDisabled();

// await cartP.paymentSubmit();

})

