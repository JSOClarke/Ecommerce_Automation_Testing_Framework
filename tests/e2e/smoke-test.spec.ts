import { test, Page, expect,Locator,Response,request } from "@playwright/test";
import HomePage from "../pages/homepage";
import ProductPage from "../pages/productPage";
import CartPage from "../pages/cartPage";
import { validCreds } from "../data/validCreds";
import { validBillingCreds } from "../data/validBillingCreds";
import { inValidCreds } from "../data/invalidCreds";
import signInPage from "../pages/signInPage";
import { count, log } from "console";
import { validRegisterCreds } from "../data/validRegisterCreds";
import RegisterPage from "../pages/RegisterPage";
import { invalidEmailRegisterCreds } from "../data/invalidRegisterEmailCreds";
import { invalidRegisterPasswordCreds } from "../data/invalidRegisterPasswordCreds";
import ContactPage from "../pages/ContactPage";
import NavBar from "../pages/NavBar";
import { Request } from "@playwright/test";
import { APIRequestContext } from "@playwright/test";
import { invalidBillingCreds } from "../data/invalidBillingCreds";
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

const loginP = new signInPage(page);

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
await cartP.paymentSubmit();

await page.pause();
})

test('@AUTH, A01 Valid login - Enter wrong email and password	- Error message displayed', async ({page}) =>{

await page.goto(baseUrl);

const homeP = new HomePage(page);

await homeP.clickSignInButton();

const loginP = new signInPage(page);

await loginP.inputLogin(inValidCreds[1].email,inValidCreds[1].password);

await loginP.clickLoginButton();

await expect(loginP.getLoginErrorMsgLocator()).toBeVisible();
console.log(`LOGIN ERROR MSG: ${await loginP.getEmailErrorMsgLocator().textContent()}`);

})


test('@AUTH, A02 Valid login - Enter wrong password	- Error message displayed', async ({page}) =>{

await page.goto(baseUrl);

const homeP = new HomePage(page);

await homeP.clickSignInButton();

const loginP = new signInPage(page);

await loginP.inputLogin(inValidCreds[0].email,inValidCreds[0].password);

await loginP.clickLoginButton();

await expect(loginP.getLoginErrorMsgLocator()).toBeVisible();
console.log(`LOGIN ERROR MSG: ${await loginP.getEmailErrorMsgLocator().textContent()}`);

})

test('@AUTH, A03 Signup with new email | Fill out valid details & submit | Account created, redirect/login', async ({page}) =>{

await page.goto(baseUrl);

const homeP = new HomePage(page);

await homeP.clickSignInButton();

const loginP = new signInPage(page);

await loginP.inputLogin('','');

await loginP.clickLoginButton();

await expect(loginP.getEmailErrorMsgLocator()).toBeVisible();
await expect(loginP.getPasswordErrorMsgLocator()).toBeVisible();
console.log(`EMAIL ERROR MSG: ${await loginP.getEmailErrorMsgLocator().textContent()}`)
console.log(`PASSWORD ERROR MSG: ${await loginP.getPasswordErrorMsgLocator().textContent()}`)


})

test('@AUTH | A04 | Signup with new email | Fill out valid details & submit | Account created, redirect/login', async ({page})=>{

await page.goto(baseUrl);

const homeP = new HomePage(page);

await homeP.clickSignInButton();

const loginP = new signInPage(page);

await loginP.clickRegisterButton();

const registerP = new RegisterPage(page);
// await page.getByTestId('first-name').fill("jordan");
await registerP.inputRegistration(validRegisterCreds[4]);
await registerP.submitRegistration();

await expect(page).toHaveURL(/login/i );

await page.pause();
})

test('@Authentication | A05 | Signup with existing email | Use same email again | Error: email already exists |', async ({page})=>{

await page.goto(baseUrl);

const homeP = new HomePage(page);

await homeP.clickSignInButton();

const loginP = new signInPage(page);

await loginP.clickRegisterButton();

const registerP = new RegisterPage(page);
// await page.getByTestId('first-name').fill("jordan");
await registerP.inputRegistration(invalidEmailRegisterCreds[0]);
await registerP.submitRegistration();
await expect(registerP.getRegistrationErrorMsg()).toBeVisible();
console.log(`REG ERROR MSG: ${await registerP.getRegistrationErrorMsg().textContent()}`)
await page.pause();
})

test('@Authentication | A06 | Password validation | Use short or mismatched password | Appropriate error shown', async ({page})=>{

await page.goto(baseUrl);

const homeP = new HomePage(page);

await homeP.clickSignInButton();

const loginP = new signInPage(page);

await loginP.clickRegisterButton();

const registerP = new RegisterPage(page);
// await page.getByTestId('first-name').fill("jordan");

for (let invalidCred of invalidRegisterPasswordCreds){
await registerP.inputRegistration(invalidCred);
await registerP.submitRegistration();
await expect(registerP.getPasswordErrorMsg()).toBeVisible();
console.log(`REG PASSWORD: ${invalidCred.password} ===> REG ERROR MSG: ${await registerP.getPasswordErrorMsg().textContent()}`)
}
await page.pause();
})

test('@Home-Page | H01 | Load homepage | Navigate to URL | Page loads without errors', async({page}) =>{
const response = await page.goto(baseUrl);

expect(response?.status()).toBe(200);

})

test('@Home-Page | H02 | Check main navigation | Click all nav links | Each link routes correctly', async({page})=>{

    await page.goto(baseUrl);

// == Home Page

    const homeP = new HomePage(page);
    await homeP.clickHomeButton();
    await homeP.waitForPageLoad();
    await expect(page).toHaveURL(/practicesoftwaretesting.com/)
    
// == Contact Page

    await homeP.clickContactButton();
    const contactP = new ContactPage(page);
    await contactP.waitForPageLoad();
    await expect(page).toHaveURL(/contact/);

// == Sign-In Page

    await homeP.clickSignInButton();
    const signInP = new signInPage(page);
    await signInP.waitForPageLoad();
    await expect(page).toHaveURL(/login/);

// == Lang Page Skipped for H0X

// == Category Page

    const navBarP = new NavBar(page);
    await navBarP.clickNavBarHandTools();
    await expect(page).toHaveURL(/hand-tools/)

    await navBarP.clickNavBarPowerTools();
    await expect(page).toHaveURL(/power-tools/)


    await navBarP.clickNavBarOther();
    await expect(page).toHaveURL(/other/)

    await navBarP.clickNavBarSpecialTools();
    await expect(page).toHaveURL(/special-tools/)
    
    await navBarP.clickNavBarRentals();
    await expect(page).toHaveURL(/rentals/)


    await page.pause()

})

test('| Home Page | H05 | Logo click | Click on site logo | Returns to homepage', async ({page})=>{

    await page.goto(baseUrl);

    const navbarP = new NavBar(page);

    await navbarP.clickLogo(); 
    await expect(page).toHaveURL(/practicesoftwaretesting.com/);
})

test('@Home Page | H04 | Broken links | Crawl clickable links | All links return 200 OK |', async({page})=>{

    await page.goto(baseUrl);

    const links = await page.getByRole('link').all();

    for(const link of links){
    const href = await link.getAttribute('href')

    // check to see if its a relative or abosulte link


    if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')){
        continue;
    }
        console.log(`ADDR: ${href}`);

    const url = href?.startsWith('http') ? href : `${baseUrl}${href}`

    const response = await page.request.get(url);
    expect( response?.status()).toBe(200);
    
    console.log(`STATUS CODE: ${response?.status()} => ADDR: ${href}`);


    }
})

test('@Product Listing | P01 | Load product list | Navigate to /products | Products are visible |', async ({page}) =>{

    await page.goto(baseUrl);

    //  assert that we have items on the landing page

    const homeP = new HomePage(page);
    
    const products = homeP.getProductCardSelector();

    const productsCount = await products.count();
        for (let x = 0; x<productsCount; x++){
            await expect(products.nth(x)).toBeVisible();
        }    



    const productImage = homeP.getProductsCardImageSelector()
    // const productImage = page.locator('[data-test^="product-"] img');
    
    const productImageCount = await productImage.count();
    // Source and the image visibility
    for (let count = 0; count<productImageCount; count++){
        
        // console.log(`PRODUCT IMAGE SOURCE: ${await productImage.nth(count).getAttribute('src')}`)
        await expect(productImage.nth(count), ).toHaveAttribute('src', /.+/);
        await expect(productImage.nth(count), `ELEMENT :${productImage.nth(count).getAttribute('src')}, is no visible`).toBeVisible();
    }
})

test('| Product Listing | P02 | Click product card | Click on product image or title | Redirects to product detail', async ({page})=>{

    await page.goto(baseUrl);

    const homeP = new HomePage(page);

    await homeP.selectFirstItem();

    const productP = new ProductPage(page);

    const productTitleLocator = productP.getProductTitle()
    const productDetailLocator = productP.getProductDetails()
    await expect(productTitleLocator).toBeVisible();
    await expect(productDetailLocator).toBeVisible();
})

test('| Cart | C01 | View cart | Click cart icon | Cart page loads', async({page})=>{

    await page.goto(baseUrl);

    const homeP = new HomePage(page);

    await homeP.selectFirstItem();
    const productP = new ProductPage(page);

    const cartNumber = 3;

    await productP.addQuanity(cartNumber);
    await productP.addToCart();

    const navBarP = new NavBar(page);

    await expect(navBarP.getCartQuantity()).toHaveText(`${cartNumber+1}`)
    await navBarP.clickNavCart();
    await expect(page).toHaveURL(/checkout/)

})

test('Cart C02', async({page})=>{
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



    await expect(cartP.getCartUpdateInput()).toHaveValue(`${cartNumber+1}`);

    const updatedCartAmount = 7;
    await cartP.getCartUpdateInput().fill(`${updatedCartAmount}`);
    await page.keyboard.press('Enter');

    const navBarPA = new NavBar(page);
    await expect(navBarPA.getCartQuantity()).toHaveText(`${updatedCartAmount}`)

})

test('| Checkout | CH01 | Open checkout | Go to checkout from cart | Checkout page loads', async({page})=>{

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
    await expect(page).toHaveURL(/checkout/)

})

test('CH02 - fill in valid form details', async({page})=>{


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

})

test('CH03', async ({page})=>{

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
expect(cartP.getSuccessMessage()).toBeVisible();
await page.pause();
})

test('CHO04', async({page})=>{

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
await cartP.billingInput(invalidBillingCreds[0])
await expect(cartP.getBillingSubmit()).toBeDisabled();

})

