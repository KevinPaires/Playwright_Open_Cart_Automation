# OpenCart Test Automation

E-commerce test automation using **Playwright** and **JavaScript** with the **Page Object Model** pattern.

## Quick Start

### Prerequisites
- Node.js v16+
- Git

### Setup
```bash
git clone https://github.com/KevinPaires/opencart-automation.git
cd opencart-automation
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific file
npx playwright test tests/cart.spec.js

# Run specific browser
npx playwright test --project=chromium

# Run with UI
npx playwright test --ui

# View report
npx playwright show-report
```

## Project Structure

```
pages/                    # Page objects
  ├── BasePage.js        # Base class with common methods
  ├── HomePage.js
  ├── ProductPage.js
  ├── CartPage.js
  ├── AccountPage.js
  ├── SearchPage.js
  └── CheckOutPage.js

tests/                    # Test files
  ├── fixtures.js        # Page object fixtures (extended test)
  ├── cart.spec.js       # 6 tests
  ├── account.spec.js    # 37 tests
  ├── search.spec.js
  └── homepage.spec.js

tests/utils/
  └── testDataGenerator.js  # Test data generators
```

## Test Coverage

- **Account Tests** (37): Registration boundary tests, login, account management
- **Cart Tests** (6): Add to cart, update quantity, remove, calculate total
- **Search Tests**: Product search functionality
- **Homepage Tests**: Navigation and content verification

## Fixtures

The `tests/fixtures.js` provides lazy-instantiated page object fixtures that are automatically injected into tests:

```javascript
const { test, expect } = require('./fixtures');

test('example', async ({ accountPage, cartPage, productPage }) => {
  // Page objects are automatically created and available
  await accountPage.goto();
  await productPage.addToCart();
  // ...
});
```

Available fixtures:
- `homePage` - Homepage interactions
- `searchPage` - Search functionality
- `productPage` - Product operations
- `cartPage` - Shopping cart operations
- `accountPage` - Account and registration
- `checkOutPage` - Checkout flow

## Test Website

[OpenCart Abstracta Demo](https://opencart.abstracta.us/) - Public demo site

## Key Features

- Page Object Model for maintainable code
- Comprehensive boundary testing (1-32 characters)
- Cross-browser testing (Chromium, Firefox, WebKit)
- Parallel test execution
- HTML test reports with screenshots
- Configurable selectors and timeouts

## Troubleshooting

**Tests timeout?** Check network connection or increase timeouts in `playwright.config.js`

**Browser won't launch?** Run `npx playwright install --force`

**Tests fail in CI?** Run in headless mode: `npx playwright test`
