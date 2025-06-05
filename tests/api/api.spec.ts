import { Page, test, expect,request } from "@playwright/test";
import HomePage from "../pages/homepage";
import ProducePage from "../pages/productPage";

const apiBaseUrl ='https://api.practicesoftwaretesting.com'; 
const baseUrl = 'https://practicesoftwaretesting.com/'


test('@API01 - GET /products matches UI: Call API and compare with UI items → Names, prices, and images', async({page})=>{

    const apiContext = await request.newContext();

    const response = await apiContext.get(`${apiBaseUrl}/products`);
    const responseJSON = await response.json();

    // Assert that products match the UI that we
    // As the get request returns all we just need to do a search of one UI element that we find.
  
  
//     const Names = responseJSON.data[0].name;
//   const Price =  responseJSON.data[0].price;
//   console.log(`ITEM NAME: ${Names}`)

//   console.log(`ITEM NAME: ${Price}`)

//     console.log(`ITEM NAME: ${Names}`)

    // for (let index of Names){
    //     console.log(`ITEM NAME: ${index.name}`)
    //      console.log(`ITEM NAME: ${index.name}`)
    // }
    // console.log(`GET REQUEST ${JSON.stringify(responseJSON,null, 2)}`);

    await page.goto(baseUrl);

    const homeP = new HomePage(page);  

    const itemNumber = 0;

    

    // const hansel = homeP.getProductsNameSelector(itemNumber);

    // console.log(await hansel.textContent());

    // const gretel = homeP.getProductsPriceSelector(itemNumber);

    // const clean_price = await gretel.textContent();
    // const raidio = clean_price?.slice(1);
    // console.log(raidio);

    const tries = 2

    for(let x = 0; x<tries; x++){

        // const itemNumber = 0;

        const nameUI = await homeP.getProductsNameSelector(x).textContent();

        console.log(nameUI);
        const priceUI = await homeP.getProductsPriceSelector(x).textContent();
        const cleanPriceUI = priceUI?.slice(1);

        const nameAPI = await responseJSON.data[0].name;
        const priceAPI = await responseJSON.data[0].price.toString();
        console.log(nameAPI);

        expect(nameUI?.trim()).toBe(await nameAPI);
        expect(cleanPriceUI?.trim()).toBe(await priceAPI);
    }
    
})

function parsePrice(priceText: string | null): number {
  if (!priceText) throw new Error('Price text is null or undefined');
  const cleaned = priceText.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned);
}

test('Compare product names and prices between API and UI', async ({ page, request}) => {

    const apiResponse = await request.get('https://api.practicesoftwaretesting.com/products');
  expect(apiResponse.ok(), 'API request failed').toBeTruthy();


  const apiData = await apiResponse.json();
  const apiProducts = apiData.data;
  if (!Array.isArray(apiProducts)) throw new Error('API response data is not an array');

  await page.goto('https://www.practicesoftwaretesting.com/');

  const homeP = new HomePage(page);
  const nameLocators =  homeP.getProductsNameLocator();
  const priceLocators = homeP.getProductsPriceLocator();

  const visibleCount = await nameLocators.count();
  expect(visibleCount, 'NO UI Elements Gathered').toBeGreaterThanOrEqual(1);
  const itemsToCheck = Math.min(apiProducts.length, visibleCount);

  console.log(`Checking ${itemsToCheck} products (API vs UI)`);

  for (let i = 0; i < itemsToCheck; i++) {
    const apiProduct = apiProducts[i];
    const apiName: string = apiProduct.name;
    const apiPrice: number = apiProduct.price;

    const uiNameRaw = await nameLocators.nth(i).textContent();
    const uiPriceRaw = await priceLocators.nth(i).textContent();

    const uiName = uiNameRaw?.trim() ?? '';
    const uiPrice = parsePrice(uiPriceRaw);

    expect(uiName, `Name mismatch at index ${i}`).toBe(apiName);
    expect(uiPrice, `Price mismatch at index ${i} (UI: ${uiPrice}, API: ${apiPrice})`).toBeCloseTo(apiPrice, 2);

    console.log(`✔️ [${i}] "${uiName}" matches API with price £${uiPrice}`);
  }
});
