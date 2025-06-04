| Module           | ID     | Test Case Title                   | Steps to Reproduce                                   | Expected Result                               |
|------------------|--------|-----------------------------------|------------------------------------------------------|------------------------------------------------|
| Authentication   | A01    | Invalid login                     | Enter invalid email & password, click Login          | Error message shown                            | X
| Authentication   | A02    | Valid login                       | Enter correct email & password, click Login          | Redirects to dashboard/home                    | X
| Authentication   | A03    | Empty login form                  | Submit login with empty fields                       | Validation errors shown                         | X
| Authentication   | A04    | Signup with new email             | Enter new email & valid details, click Signup        | Account created, redirect or login screen      | X
| Authentication   | A05    | Signup with existing email        | Use previously registered email to signup            | Error: email already exists                    | X
| Authentication   | A06    | Password rules validation         | Try short or mismatched passwords during signup      | Error: invalid password                        | X

| Home Page        | H01    | Load homepage                     | Navigate to homepage URL                             | Page loads successfully without errors         | X
| Home Page        | H02    | Check main navigation             | Click nav links (Home, Products, Cart, etc.)         | Each link routes correctly                     | X
| Home Page        | H03    | Responsive layout                 | Resize window or use mobile viewport                 | Layout adjusts to fit screen size              | TBC
| Home Page        | H04    | Logo navigation                   | Click on the site logo                               | Redirects to homepage                          | X
| Home Page        | H05    | Broken links check (automated)    | Crawl links in header/footer/navigation              | All links return 200 OK                        | X

| Product Listing  | P01    | Load product list on landing page | Navigate to landing or /products                     | Product cards are visible                      | X
| Product Listing  | P02    | Click product card                | Click on product image or name                       | Navigates to product detail page               | X
| Product Listing  | P03    | Product info displays correctly   | Check product name, price, and image                 | Info matches expected values (or API)          |
| Product Listing  | P04    | Sort products                     | Choose sort option (e.g., Price: Low to High)        | Products reorder correctly                     |
| Product Listing  | P05    | Pagination                        | Use Next/Previous page buttons                       | Product list updates                           |

| Product Detail   | PD01   | Open detail page                  | Click a product on listing                           | Page loads with product details                |
| Product Detail   | PD02   | Add to cart                       | Click "Add to Cart" button                           | Cart updates count/feedback                    |
| Product Detail   | PD03   | Quantity selection before add     | Select quantity (e.g., 2) then add to cart           | Correct quantity is added                      |

| Cart             | C01    | View cart                         | Click cart icon in header                            | Cart page loads                                | X
| Cart             | C02    | Update/remove item in cart        | Change quantity or click remove                      | Cart updates correctly                          |
| Cart             | C03    | Cart persistence                  | Add to cart, reload page                             | Cart retains items                              |
| Cart             | C04    | Empty cart state                  | Remove all items                                     | Message: "Your cart is empty" shown            |

| Checkout         | CH01   | Open checkout                     | Proceed to checkout from cart                        | Checkout page loads                            | 
| Checkout         | CH02   | Fill in valid form details        | Enter shipping & billing info                        | Form accepts and moves forward                 | X
| Checkout         | CH03   | Submit checkout                   | Click "Place Order"                                  | Confirmation shown or summary displayed        | X
| Checkout         | CH04   | Form validation on checkout       | Leave required fields empty                          | Errors shown per field                         | X

| End-to-End       | E2E01  | Full guest purchase               | Browse > Add item > Checkout                         | Order completes with confirmation              | X
| End-to-End       | E2E02  | Logged-in user purchase           | Login > Add to cart > Checkout                       | Order completes and is tied to user            | X
| End-to-End       | E2E03  | Cart persists after login         | Add to cart > Login                                  | Cart retains added items                       | X

| Mobile           | M01    | Mobile view loads correctly       | Open site in mobile viewport                         | Layout fits screen, no horizontal scroll       |
| Mobile           | M02    | Mobile navigation menu            | Open/close burger menu, click links                  | Navigation works properly                      |
| Mobile           | M03    | Add to cart via mobile            | Use mobile UI to add product                         | Same behavior as desktop                       |

| API Validation   | API01  | GET /products matches UI          | Call API and compare with UI items                   | Names, prices, and images match                |
| API Validation   | API02  | POST /auth/login                  | Call login API with valid/invalid data               | Correct status and token returned              |
| API Validation   | API03  | POST /cart                        | Add product via API                                  | Cart UI reflects changes                       |

| Negative Cases   | N01    | Add 0 quantity                    | Try to add 0 items to cart                           | Error or button disabled                       |
| Negative Cases   | N02    | Navigate to broken URL            | Enter /nonexistent-page in browser                   | 404 or custom error page shown                 |
| Negative Cases   | N03    | Script injection attempt          | Input `<script>` in form fields                      | Input is escaped/sanitized                     |
