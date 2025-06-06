import { test, expect } from "@playwright/test";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/productPage";

const baseUrl = 'https://practicesoftwaretesting.com/';

test('@Product-Listing, P01, Load product list with visible products', async ({page}) => {
  await page.goto(baseUrl);
  const homeP = new HomePage(page);
  const products = homeP.getProductCardSelector();

  const productsCount = await products.count();
  for (let x = 0; x < productsCount; x++) {
    await expect(products.nth(x)).toBeVisible();
  }

  const productImage = homeP.getProductsCardImageSelector();
  const productImageCount = await productImage.count();
  for (let i = 0; i < productImageCount; i++) {
    await expect(productImage.nth(i)).toHaveAttribute('src', /.+/);
    await expect(productImage.nth(i), `Image ${i} not visible`).toBeVisible();
  }
});

test('@Product-Listing, P02,  Clicking product card redirects to detail', async ({page}) => {
  await page.goto(baseUrl);
  const homeP = new HomePage(page);
  await homeP.selectFirstItem();

  const productP = new ProductPage(page);
  await expect(productP.getProductTitle()).toBeVisible();
  await expect(productP.getProductDetails()).toBeVisible();
});
