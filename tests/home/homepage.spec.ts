import { test, expect } from "@playwright/test";
import HomePage from "../pages/HomePage";
import ContactPage from "../pages/ContactPage";
import signInPage from "../pages/SignInPage";
import NavBar from "../pages/NavBar";

const baseUrl = 'https://practicesoftwaretesting.com/';

test('@Home-Page, H01, Load homepage without error', async ({page}) => {
  const response = await page.goto(baseUrl);
  expect(response?.status()).toBe(200);
});

test('@Home-Page, H02, Main navigation links routes correctly', async ({page}) => {
  await page.goto(baseUrl);

  const homeP = new HomePage(page);
  await homeP.clickHomeButton();
  await homeP.waitForPageLoad();
  await expect(page).toHaveURL(/practicesoftwaretesting.com/);

  await homeP.clickContactButton();
  const contactP = new ContactPage(page);
  await contactP.waitForPageLoad();
  await expect(page).toHaveURL(/contact/);

  await homeP.clickSignInButton();
  const signInP = new signInPage(page);
  await signInP.waitForPageLoad();
  await expect(page).toHaveURL(/login/);

  const navBarP = new NavBar(page);
  await navBarP.clickNavBarHandTools();
  await expect(page).toHaveURL(/hand-tools/);

  await navBarP.clickNavBarPowerTools();
  await expect(page).toHaveURL(/power-tools/);

  await navBarP.clickNavBarOther();
  await expect(page).toHaveURL(/other/);

  await navBarP.clickNavBarSpecialTools();
  await expect(page).toHaveURL(/special-tools/);

  await navBarP.clickNavBarRentals();
  await expect(page).toHaveURL(/rentals/);

  await page.pause();
});

test('@Home Page, H05, Logo click returns home page', async ({page}) => {
  await page.goto(baseUrl);
  const navbarP = new NavBar(page);
  await navbarP.clickLogo();
  await expect(page).toHaveURL(/practicesoftwaretesting.com/);
});

test('@Home Page, H04, Crawl for Broken links, all links return 200 OK', async ({page}) => {
  await page.goto(baseUrl);
  const links = await page.getByRole('link').all();

  for (const link of links){
    const href = await link.getAttribute('href');
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')){
      continue;
    }

    const url = href.startsWith('http') ? href : `${baseUrl}${href}`;
    const response = await page.request.get(url);
    expect(response?.status()).toBe(200);
    console.log(`STATUS CODE: ${response?.status()} => ADDR: ${href}`);
  }
});
