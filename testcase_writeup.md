## Home Page

- [x] H01 - Load homepage: Navigate to homepage URL → Page loads successfully without errors
- [x] H02 - Check main navigation: Click nav links (Home, Products, Cart, etc.) → Each link routes correctly
- [x] H03 - Responsive layout: Resize window or use mobile viewport → Layout adjusts to fit screen size
- [x] H04 - Logo navigation: Click on the site logo → Redirects to homepage
- [x] H05 - Broken links check (automated): Crawl links in header/footer/navigation → All links return 200 OK

## Product Listing

- [x] P01 - Load product list on landing page: Navigate to landing or /products → Product cards are visible
- [x] P02 - Click product card: Click on product image or name → Navigates to product detail page
- [x] P03 - Product info displays correctly: Check product name, price, and image → Info matches expected values (or API)
- [X] P04 - Sort products: Choose sort option (e.g., Price: Low to High) → Products reorder correctly
- [X] P05 - Pagination: Use Next/Previous page buttons → Product list updates

## Product Detail

- [X] PD01 - Open detail page: Click a product on listing → Page loads with product details
- [X] PD02 - Add to cart: Click "Add to Cart" button → Cart updates count/feedback
- [X] PD03 - Quantity selection before add: Select quantity (e.g., 2) then add to cart → Correct quantity is added

## Cart

- [x] C01 - View cart: Click cart icon in header → Cart page loads
- [X] C02 - Update/remove item in cart: Change quantity or click remove → Cart updates correctly
- [X] C03 - Cart persistence: Add to cart, reload page → Cart retains items
- [X] C04 - Empty cart state: Remove all items → Message: "Your cart is empty" shown

## Checkout

- [X] CH01 - Open checkout: Proceed to checkout from cart → Checkout page loads
- [x] CH02 - Fill in valid form details: Enter shipping & billing info → Form accepts and moves forward
- [x] CH03 - Submit checkout: Click "Place Order" → Confirmation shown or summary displayed
- [x] CH04 - Form validation on checkout: Leave required fields empty → Errors shown per field

## End-to-End

- [x] E2E01 - Full guest purchase: Browse > Add item > Checkout → Order completes with confirmation
- [x] E2E02 - Logged-in user purchase: Login > Add to cart > Checkout → Order completes and is tied to user
- [x] E2E03 - Cart persists after login: Add to cart > Login → Cart retains added items

TO BE ADDED ---

## Mobile

- [ ] M01 - Mobile view loads correctly: Open site in mobile viewport → Layout fits screen, no horizontal scroll
- [ ] M02 - Mobile navigation menu: Open/close burger menu, click links → Navigation works properly
- [ ] M03 - Add to cart via mobile: Use mobile UI to add product → Same behavior as desktop

## API Validation

- [ ] API01 - GET /products matches UI: Call API and compare with UI items → Names, prices, and images match
- [ ] API02 - POST /auth/login: Call login API with valid/invalid data → Correct status and token returned
- [ ] API03 - POST /cart: Add product via API → Cart UI reflects changes

## Negative Cases

- [ ] N01 - Add 0 quantity: Try to add 0 items to cart → Error or button disabled
- [ ] N02 - Navigate to broken URL: Enter /nonexistent-page in browser → 404 or custom error page shown
- [ ] N03 - Script injection attempt: Input `<script>` in form fields → Input is escaped/sanitized
