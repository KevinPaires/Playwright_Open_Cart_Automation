# OpenCart Test Automation

Automated tests for OpenCart e-commerce platform using Playwright and JavaScript. Built with reusable page objects, smart waits (no hard waits), and currently includes 162 tests with more planned.

## 🚀 Quick Setup

```bash
# Clone and install
git clone https://github.com/KevinPaires/opencart-automation.git
cd opencart-automation
npm install
npx playwright install
```

## ▶️ Run Tests

```bash
npx playwright test              # Run all tests
npx playwright test --ui         # Run with UI mode
npx playwright test cart.spec.js # Run specific test
npx playwright show-report       # View last report
```

## 📁 Project Structure

```
pages/          → Page objects (HomePage, CartPage, etc.)
tests/          → Test files (*.spec.js)
tests/utils/    → Test data generators
```

## ✅ What's Tested

- **Account** - Registration, login, boundary values 
- **Cart** - Add/remove items, quantity updates
- **Search** - Product search and filters
- **Checkout** - Guest and registered user flows
- **Homepage** - Navigation and content

## 🔧 Fixtures

Tests use pre-configured page objects:

```javascript
const { test, expect } = require('./fixtures');

test('add to cart', async ({ productPage, cartPage }) => {
  await productPage.addToCart();
  await cartPage.verifyItemAdded();
});
```

## 🌐 Test Site

[OpenCart Demo](https://opencart.abstracta.us/)

## ⚡ Key Features

- **Page Object Model** - Reusable, maintainable code structure
- **Smart Waits** - No hard waits, uses Playwright's auto-waiting
- **Boundary Testing** - Comprehensive input validation (1-32 characters)
- **Cross-Browser** - Runs on Chromium, Firefox, and WebKit
- **Parallel Execution** - Fast test runs with parallel workers
- **Rich Reports** - HTML reports with screenshots on failure
- **162 Tests** - Growing test suite covering critical user flows

## 💡 Tips

- Use `--headed` to see browser: `npx playwright test --headed`
- Debug mode: `npx playwright test --debug`
- Specific browser: `npx playwright test --project=chromium`

## 🐛 Common Issues

**Timeout errors?** Increase timeout in `playwright.config.js`

**Browsers not installed?** Run `npx playwright install`

**Need help?** Check the [Playwright docs](https://playwright.dev/)