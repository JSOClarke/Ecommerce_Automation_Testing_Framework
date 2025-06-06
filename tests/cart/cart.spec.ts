import { test, expect } from "@playwright/test";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/productPage";
import CartPage from "../pages/cartPage";
import NavBar from "../pages/NavBar";

const baseUrl = 'https://practicesoftwaretesting.com/';

test('@Cart, C01, View cart page after adding item', async ({page}) => {
  await page.goto(baseUrl);

  const homeP = new HomePage(page);
  await homeP.selectFirstItem();

  const productP = new ProductPage(page);
  const cartNumber = 3;
  await productP.addQuanity(cartNumber);
  await productP.addToCart();

  const navBarP = new NavBar(page);
  await expect(navBarP.getCartQuantity()).toHaveText(`${cartNumber + 1}`);
  await navBarP.clickNavCart();
  await expect(page).toHaveURL(/checkout/);
});

test('@Cart, C02, Update cart quantity updates nav cart quantity', async ({page}) => {
  await page.goto(baseUrl);
  const homeP = new HomePage(page);
  await homeP.selectFirstItem();

  const productP = new ProductPage(page);
  const cartNumber = 3;
  await productP.addQuanity(cartNumber);
  await productP.addToCart();

  const navBarP = new NavBar(page);
  await navBarP.clickNavCart();

  const cartP = new CartPage(page);
  await expect(cartP.getCartUpdateInput()).toHaveValue(`${cartNumber + 1}`);

  const updatedCartAmount = 7;
  await cartP.getCartUpdateInput().fill(`${updatedCartAmount}`);
  await page.keyboard.press('Enter');

  const navBarPA = new NavBar(page);
  await expect(navBarPA.getCartQuantity()).toHaveText(`${updatedCartAmount}`);
});
