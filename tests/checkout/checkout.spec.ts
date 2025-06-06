import { test, expect } from "@playwright/test";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/productPage";
import CartPage from "../pages/cartPage";
import { validCreds } from "../data/validCreds";
import { validBillingCreds } from "../data/validBillingCreds";
import { invalidBillingCreds } from "../data/invalidBillingCreds";
import NavBar from "../pages/NavBar";

const baseUrl = 'https://practicesoftwaretesting.com/';

test('@Checkout, CH01, Checkout from cart', async ({page}) => {
  await page.goto(baseUrl);
  const homeP = new HomePage(page);
  await homeP.selectFirstItem();

  const productP = new ProductPage(page);
  const cartNumber = 3;
  await productP.addQuanity(cartNumber);
  await productP.addToCart();

  const navBar = new NavBar(page);
  await navBar.clickNavCart();

  const cartP = new CartPage(page);
  await cartP.clickSubmit();

  await expect(page).toHaveURL(/checkout/);
});

test('@Checkout, CH02, fill in valid billing form details', async ({page}) => {
  await page.goto(baseUrl);

  const homeP = new HomePage(page);
  const itemNumber = 3;

  await homeP.getProductElement(itemNumber).click();

  const productP = new ProductPage(page);
  const cartNumber = 3;
  await productP.addQuanity(cartNumber);
  await productP.addToCart();
  await page.waitForTimeout(5000);

  const navBar = new NavBar(page);
  await navBar.clickNavCart();

  const cartP = new CartPage(page);
  await cartP.clickSubmit();

  await cartP.loginInput(validCreds[2]);
  await cartP.loginSubmit();

  await expect(cartP.getBillingTitleLocator()).toBeVisible();

  await cartP.billingInput(validBillingCreds[1]);
  await cartP.billingSubmit();

  await expect(cartP.getPaymentTitleLocator()).toBeVisible();
});

test('@Checkout, CH03, Full guest purchase', async ({page}) => {
  const homeP = new HomePage(page);
  await page.goto(baseUrl);
  await homeP.selectFirstItem();

  const productP = new ProductPage(page);
  await productP.addQuanity(1);
  await productP.addToCart();
  await page.waitForTimeout(5000);
  await productP.clickOnCart();

  const cartP = new CartPage(page);
  await cartP.clickSubmit();

  await cartP.loginInput(validCreds[0]);
  await cartP.loginSubmit();
  await cartP.billingInput(validBillingCreds[0]);
  await cartP.billingSubmit();
  await cartP.paymentInputCashonDelivery();
  await cartP.paymentSubmit();

  expect(cartP.getSuccessMessage()).toBeVisible();
  await page.pause();
});

test('@Checkout, CH04, Checkout with invalid billing details disables submit', async ({page}) => {
  const homeP = new HomePage(page);
  await page.goto(baseUrl);
  await homeP.selectFirstItem();

  const productP = new ProductPage(page);
  await productP.addQuanity(1);
  await productP.addToCart();
  await page.waitForTimeout(5000);
  await productP.clickOnCart();

  const cartP = new CartPage(page);
  await cartP.clickSubmit();

  await cartP.loginInput(validCreds[0]);
  await cartP.loginSubmit();

  await cartP.billingInput(invalidBillingCreds[0]);
  await expect(cartP.getBillingSubmit()).toBeDisabled();
});
