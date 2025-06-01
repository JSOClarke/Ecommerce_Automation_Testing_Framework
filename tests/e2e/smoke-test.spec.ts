import { test, Page, expect } from "@playwright/test";
import homePage from "../pages/homepage";
import productPage from "../pages/productPage";
import cartPage from "../pages/cartPage";
import { validCreds } from "../data/validCreds";
import { validBillingCreds } from "../data/validBillingCreds";
import { verify } from "crypto";
// import homePage from "../pages/homepage.spec";


const baseUrl = 'https://practicesoftwaretesting.com/'

test('@Smoke , #E2E01 Full Guest Purchase', async ({page})=> {

const homeP = new homePage(page);

await page.goto(baseUrl);

await homeP.selectFirstItems();

const productP = new productPage(page);

await productP.addQuanity(1);
await productP.addToCart();
await page.waitForTimeout(5000)
await productP.clickOnCart();

const cartP = new cartPage(page);

await cartP.clickSubmit();

await cartP.loginInput(validCreds[0]);
await cartP.loginSubmit();
await cartP.billingInput(validBillingCreds[0])
await cartP.billingSubmit();
await cartP.paymentInputCashonDelivery();
await cartP.paymentSubmit();
await expect(cartP.isSuccessMessageVisible()).toBe(true);
await page.pause();

})

test('@Smoke, #E2E03, Logged In Purchase', async ({page})=>{


})