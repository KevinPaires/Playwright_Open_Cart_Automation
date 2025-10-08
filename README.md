# 🛒 OpenCart Test Automation Framework

A comprehensive e-commerce test automation suite built with **Playwright** and **JavaScript**, implementing the **Page Object Model (POM)** design pattern for maintainable and scalable test code.



## ✨ Features

- ✅ **Page Object Model (POM)** architecture for maintainable test code
- ✅ **15+ automated test cases** covering critical e-commerce workflows
- ✅ **Cross-browser testing** (Chrome, Firefox, Safari)
- ✅ **Comprehensive test coverage** for search, cart, and checkout functionality
- ✅ **Reusable page objects** with clear method abstractions
- ✅ **Detailed test reports** with screenshots on failure
- ✅ **Parallel test execution** for faster feedback

---

## 🛠️ Technologies

| Technology | Purpose |
|------------|---------|
| ![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white) | Modern browser automation framework |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Programming language |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) | Runtime environment |

---

## 📁 Project Structure

```
opencart-automation/
│
├── pages/                      # Page Object Model classes
│   ├── HomePage.js            # Homepage interactions
│   ├── SearchPage.js          # Search functionality
│   ├── ProductPage.js         # Product detail page
│   └── CartPage.js            # Shopping cart operations
│
├── tests/                      # Test specifications
│   ├── homepage.spec.js       # Homepage tests
│   ├── search.spec.js         # Search tests (5 tests)
│   └── cart.spec.js           # Cart tests (6 tests)
│
├── test-results/               # Test execution results (auto-generated)
├── playwright-report/          # HTML test reports (auto-generated)
│
├── playwright.config.js        # Playwright configuration
├── package.json                # Project dependencies
├── package-lock.json           # Locked dependency versions
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/opencart-automation.git
   cd opencart-automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

---

## 🏃 Running Tests

### Run all tests (headless mode)
```bash
npx playwright test
```

### Run tests with browser visible
```bash
npx playwright test --headed
```

### Run specific test file
```bash
npx playwright test tests/cart.spec.js
npx playwright test tests/search.spec.js
npx playwright test tests/homepage.spec.js
```

### Run specific test by name
```bash
npx playwright test -g "add laptop to cart"
npx playwright test -g "search for iPhone"
```

### Run on specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run in debug mode
```bash
npx playwright test --debug
```

### Run in UI mode (interactive)
```bash
npx playwright test --ui
```

### View test report
```bash
npx playwright show-report
```

---

## ✅ Test Coverage

### Homepage Tests (2 tests)
- ✅ Verify homepage loads successfully
- ✅ Verify featured products are displayed

### Search Tests (5 tests)
- ✅ Search for iPhone returns results
- ✅ Search for MacBook returns results
- ✅ Search for non-existent product shows no results message
- ✅ Empty search handling
- ✅ Search from search results page

### Shopping Cart Tests (6 tests)
- ✅ Add laptop to cart from category
- ✅ Add multiple laptops to cart
- ✅ View cart and verify products
- ✅ Update product quantity in cart
- ✅ Remove product from cart
- ✅ Calculate cart total for multiple items

**Total: 13 automated test cases**

---

## 📄 Page Objects

### HomePage.js
Handles homepage interactions including navigation and search functionality.

**Key Methods:**
- `goto()` - Navigate to homepage
- `searchProduct(productName)` - Search for a product
- `goToLaptops()` - Navigate to laptops category
- `getFeaturedProductsCount()` - Get count of featured products

### SearchPage.js
Manages search results page interactions and validations.

**Key Methods:**
- `getResultsCount()` - Count search results
- `getProductTitles()` - Get all product titles from results
- `clickProduct(productName)` - Click on specific product
- `searchAgain(searchTerm)` - Perform new search from results page

### ProductPage.js
Handles product detail page actions.

**Key Methods:**
- `addToCart()` - Add product to cart with default quantity
- `addToCartWithQuantity(quantity)` - Add product with specific quantity
- `clickProductByIndex(index)` - Click product from listing
- `isSuccessMessageVisible()` - Verify add to cart success

### CartPage.js
Manages shopping cart operations and validations.

**Key Methods:**
- `viewCart()` - Navigate to cart page
- `getCartItemCount()` - Get number of items in cart
- `updateQuantity(index, quantity)` - Update product quantity
- `removeItem(index)` - Remove product from cart
- `getCartTotal()` - Get cart total with item count

---

## ⚙️ Configuration

### Playwright Config (`playwright.config.js`)

```javascript
// Key configurations:
- baseURL: 'https://opencart.abstracta.us/'
- timeout: 30 seconds per action
- retries: 1 retry on failure
- parallel execution: Enabled
- browsers: Chromium, Firefox, WebKit
- screenshots: On failure only
- video: Retained on failure
```

### Customization

Edit `playwright.config.js` to modify:
- Base URL
- Timeouts
- Number of parallel workers
- Browser configurations
- Screenshot/video settings

---

## 📊 Test Reports

After running tests, view detailed HTML reports:

```bash
npx playwright show-report
```

Reports include:
- ✅ Test execution summary
- ✅ Pass/fail status for each test
- ✅ Screenshots on failure
- ✅ Execution time
- ✅ Error messages and stack traces

---

## 🎯 Test Website

**Demo Site:** [OpenCart Abstracta Demo](https://opencart.abstracta.us/)

This is a public demo e-commerce website used for testing purposes.

---

## 🔧 Troubleshooting

### Tests failing with timeout errors?
```bash
# Increase timeout in playwright.config.js
use: {
  actionTimeout: 60000,
  navigationTimeout: 60000,
}
```

### Browser not launching?
```bash
# Reinstall browsers
npx playwright install --force
```

### Tests passing locally but failing in CI?
```bash
# Run in headless mode (default)
npx playwright test
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-tests`)
3. Commit your changes (`git commit -m 'Add registration tests'`)
4. Push to the branch (`git push origin feature/new-tests`)
5. Open a Pull Request

---

## 📝 Best Practices Implemented

- ✅ **Page Object Model** - Separation of test logic and page interactions
- ✅ **DRY Principle** - Reusable methods and components
- ✅ **Descriptive naming** - Clear test and method names
- ✅ **Independent tests** - Each test can run in isolation
- ✅ **Explicit waits** - Proper synchronization with page elements
- ✅ **Assertions** - Comprehensive validation of expected behavior
- ✅ **Error handling** - Graceful handling of edge cases

---

## 🐛 Known Issues

- None currently tracked


---

## 👤 Author

**Kevin Paires**

- GitHub: [@kevinpaires](https://github.com/kevinpaires)
- LinkedIn: [Kevin Paires](https://linkedin.com/in/kevinpaires)

---


## ⭐ Show your support

Give a ⭐️ if this project helped you learn test automation!

---

**Last Updated:** January 2025