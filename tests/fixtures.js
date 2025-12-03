const base = require('@playwright/test');
const { test: baseTest, expect } = base;
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { AccountPage } = require('../pages/AccountPage');
const { CheckOutPage } = require('../pages/CheckOutPage');

// Extend Playwright's `test` with page object fixtures so specs can import `{ test, expect }` from this file.
const test = baseTest.extend({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  accountPage: async ({ page }, use) => {
    const accountPage = new AccountPage(page);
    await use(accountPage);
  },
  checkOutPage: async ({ page }, use) => {
    const checkOutPage = new CheckOutPage(page);
    await use(checkOutPage);
  }
});

module.exports = { test, expect };
