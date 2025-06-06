import { test, expect } from "@playwright/test";
import HomePage from "../pages/HomePage"
import signInPage from "../pages/SignInPage";
import RegisterPage from "../pages/RegisterPage";
import { validCreds } from "../data/validCreds";
import { inValidCreds } from "../data/invalidCreds";
import { validRegisterCreds } from "../data/validRegisterCreds";
import { invalidEmailRegisterCreds } from "../data/invalidEmailRegisterCreds";
import { invalidRegisterPasswordCreds } from "../data/invalidRegisterPasswordCreds";

const baseUrl = 'https://practicesoftwaretesting.com/';

test('@AUTH, A01 Valid login - wrong email and password shows error', async ({page}) =>{
  await page.goto(baseUrl);
  const homeP = new HomePage(page);
  await homeP.clickSignInButton();

  const loginP = new signInPage(page);
  await loginP.inputLogin(inValidCreds[1].email, inValidCreds[1].password);
  await loginP.clickLoginButton();

  await expect(loginP.getLoginErrorMsgLocator()).toBeVisible();
  console.log(`LOGIN ERROR MSG: ${await loginP.getLoginErrorMsgLocator().textContent()}`);
});

test('@AUTH, A02 Valid login - wrong password shows error', async ({page}) =>{
  await page.goto(baseUrl);
  const homeP = new HomePage(page);
  await homeP.clickSignInButton();

  const loginP = new signInPage(page);
  await loginP.inputLogin(inValidCreds[0].email, inValidCreds[0].password);
  await loginP.clickLoginButton();

  await expect(loginP.getLoginErrorMsgLocator()).toBeVisible();
  console.log(`LOGIN ERROR MSG: ${await loginP.getLoginErrorMsgLocator().textContent()}`);
});

test('@AUTH, A03 Signup with empty details shows errors', async ({page}) =>{
  await page.goto(baseUrl);
  const homeP = new HomePage(page);
  await homeP.clickSignInButton();

  const loginP = new signInPage(page);
  await loginP.inputLogin('', '');
  await loginP.clickLoginButton();

  await expect(loginP.getEmailErrorMsgLocator()).toBeVisible();
  await expect(loginP.getPasswordErrorMsgLocator()).toBeVisible();

  console.log(`EMAIL ERROR MSG: ${await loginP.getEmailErrorMsgLocator().textContent()}`);
  console.log(`PASSWORD ERROR MSG: ${await loginP.getPasswordErrorMsgLocator().textContent()}`);
});

test('@AUTH, A04 Signup with valid details', async ({page}) =>{
  await page.goto(baseUrl);
  const homeP = new HomePage(page);
  await homeP.clickSignInButton();

  const loginP = new signInPage(page);
  await loginP.clickRegisterButton();

  const registerP = new RegisterPage(page);
  await registerP.inputRegistration(validRegisterCreds[4]);
  await registerP.submitRegistration();

  await expect(page).toHaveURL(/login/i);
  await page.pause();
});

test('@AUTH, A05 Signup with existing email shows error', async ({page}) =>{
  await page.goto(baseUrl);
  const homeP = new HomePage(page);
  await homeP.clickSignInButton();

  const loginP = new signInPage(page);
  await loginP.clickRegisterButton();

  const registerP = new RegisterPage(page);
  await registerP.inputRegistration(invalidEmailRegisterCreds[0]);
  await registerP.submitRegistration();

  await expect(registerP.getRegistrationErrorMsg()).toBeVisible();
  console.log(`REG ERROR MSG: ${await registerP.getRegistrationErrorMsg().textContent()}`);
  await page.pause();
});

test('@AUTH, A06 Password validation errors', async ({page}) =>{
  await page.goto(baseUrl);
  const homeP = new HomePage(page);
  await homeP.clickSignInButton();

  const loginP = new signInPage(page);
  await loginP.clickRegisterButton();

  const registerP = new RegisterPage(page);

  for (const invalidCred of invalidRegisterPasswordCreds){
    await registerP.inputRegistration(invalidCred);
    await registerP.submitRegistration();
    await expect(registerP.getPasswordErrorMsg()).toBeVisible();
    console.log(`REG PASSWORD: ${invalidCred.password} => REG ERROR MSG: ${await registerP.getPasswordErrorMsg().textContent()}`);
  }
  await page.pause();
});
