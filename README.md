# Test Cases

| Module | ID | Test Case Title | Steps to Reproduce | Expected Result |
|---|---|---|---|---|
| Authentication | A01 | Invalid login | Enter invalid email & password, click Login | Redirects to dashboard/home | X
| Authentication | A02 | Valid login | Enter wrong password | Error message displayed | X
| Authentication | A03 | Empty login form | Submit with empty fields | Validation errors shown | X
| Authentication | A04 | Signup with new email | Fill out valid details & submit | Account created, redirect/login | X
| Authentication | A05 | Signup with existing email | Use same email again | Error: email already exists |X
| Authentication | A06 | Password validation | Use short or mismatched password | Appropriate error shown |X
| Home Page | H01 | Load homepage | Navigate to URL | Page loads without errors |X
| Home Page | H02 | Check main navigation | Click all nav links | Each link routes correctly | X
| Home Page | H03 | Responsive layout | Resize window/device view | Layout adjusts correctly | TBC
| Home Page | H04 | Broken links | Crawl clickable links | All links return 200 OK |
| Home Page | H05 | Logo click | Click on site logo | Returns to homepage |
| Product Listing | P01 | Load product list | Navigate to /products | Products are visible |
| Product Listing | P02 | Click product card | Click on product image or title | Redirects to product detail |
| Product Listing | P03 | Product info | Verify name, price, image | Data matches expected values |
| Product Listing | P04 | Sort products | Select from sort dropdown | Products are reordered |
| Product Listing | P05 | Pagination | Navigate to next/prev page | Product list updates |
| Product Detail | PD01 | Open detail page | Click a product | Page loads with correct info |
| Product Detail | PD02 | Add to cart | Click "Add to Cart" | Cart count updates |
| Product Detail | PD03 | Quantity selection | Change quantity before adding | Correct quantity added |
| Cart | C01 | View cart | Click cart icon | Cart page loads |
| Cart | C02 | Update quantity | Change quantity field | Total price updates |
| Cart | C03 | Remove item | Click remove/delete | Item disappears from cart |
| Cart | C04 | Cart persistence | Reload or revisit cart | Cart items remain |
| Cart | C05 | Empty cart behavior | Remove all items | Message: 'Cart is empty' shown |
| Checkout | CH01 | Open checkout | Go to checkout from cart | Checkout page loads |
| Checkout | CH02 | Fill in form | Enter shipping & billing info | Form accepts valid data |
| Checkout | CH03 | Submit checkout | Click 'Place order' (simulated) | Confirmation or summary shown |
| Checkout | CH04 | Form validation | Leave fields blank or invalid | Shows errors appropriately |
| End-to-End | E2E01 | Full guest purchase | Browse > Add to cart > Checkout | Order completes successfully | X
| End-to-End | E2E02 | Logged-in purchase | Login > Browse > Checkout | Order completes successfully | X
| End-to-End | E2E03 | Cart persistence after login | Add items > Login | Cart retains added items | X
| Mobile | M01 | Mobile view loads | Open site in mobile viewport | UI fits screen, no horizontal scroll |
| Mobile | M02 | Mobile nav menu | Open and close burger menu | All links work properly |
| Mobile | M03 | Add to cart mobile | Add items via mobile view | Works the same as desktop |
| Negative Cases | N01 | Add 0 quantity | Try adding 0 items | Shows error or disables button |
| Negative Cases | N02 | Navigate to broken URL | Visit /nonexistent-page | Displays 404 or custom error page |
| Negative Cases | N03 | Script injection attempt | Enter `<script>` in input | Input is sanitized |

** Additional Cases - @Home-Page | H0X | Language Switcher | Click each language option | Verify text updates to correct language
