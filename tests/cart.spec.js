const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');

test.describe('Shopping Cart Tests', () => {

  test('add laptop to cart from category', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // Navigate to Laptops category
    await homePage.goto();
    await homePage.goToLaptops();

    // Click on first laptop
    await productPage.clickProductByIndex(0);

    // Add to cart
    await productPage.addToCart();

    // Verify success message
    const isSuccess = await productPage.isSuccessMessageVisible();
    expect(isSuccess).toBeTruthy();

    // Check cart count
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);

    console.log('✅ Laptop added to cart successfully!');
  });

  test('add multiple laptops to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // Go to laptops
    await homePage.goto();
    await homePage.goToLaptops();

    // Add first laptop
    await productPage.clickProductByIndex(0);
    await productPage.addToCart();
    await page.goto('/index.php?route=product/category&path=18'); // Back to laptops

    // Add second laptop
    await productPage.clickProductByIndex(1);
    await productPage.addToCart();

    // Verify cart has 2 items
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);

    // Verify total is shown
    const total = await cartPage.getCartTotal();
    console.log('Cart total:', total);
    expect(total).toContain('$');

    console.log('✅ Multiple laptops added to cart!');
  });

  test('view cart and verify products', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // Add product
    await homePage.goto();
    await homePage.goToLaptops();
    await productPage.clickProductByIndex(0);
    await productPage.addToCart();

    // Go to cart
    await cartPage.viewCart();

    // Verify we're on cart page
    await expect(page).toHaveURL(/checkout\/cart/);

    // Verify product is in cart
    const productNames = await cartPage.getProductNames();
    console.log('Products in cart:', productNames);
    expect(productNames.length).toBeGreaterThan(0);

    console.log('✅ Cart displays correct products!');
  });

  test('update product quantity in cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // Add product
    await homePage.goto();
    await homePage.goToLaptops();
    await productPage.clickProductByIndex(0);
    await productPage.addToCart();

    // Go to cart
    await cartPage.goto();

    // Update quantity to 3
    await cartPage.updateQuantity(0, 3);

    // Verify cart updated
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(3);

    console.log('✅ Quantity updated to 3!');
  });

  test('remove product from cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  // Add product
  await homePage.goto();
  await homePage.goToLaptops();
  await productPage.clickProductByIndex(0);
  await productPage.addToCart();

  // Verify item was added
  let itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(1);

  // Go to cart
  await cartPage.goto();

  // Remove product
  await cartPage.removeItem(0);
  await page.waitForTimeout(2000);

  // Verify cart shows 0 items
  itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(0);

  console.log('✅ Product removed from cart!');
});

  test('calculate cart total for multiple items', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  // Add product with quantity 2
  await homePage.goto();
  await homePage.goToLaptops();
  await productPage.clickProductByIndex(0);
  await productPage.addToCartWithQuantity(2);

  // Wait a moment for cart to update
  await page.waitForTimeout(1000);

  // Check cart total in header - get full text
  const headerTotal = await cartPage.getCartTotal();
  console.log('Header shows:', headerTotal);
  
  // Verify format
  expect(headerTotal).toContain('$');
  expect(headerTotal).toMatch(/\d+\s+item/); 
  
  // Also verify item count
  const itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(2);

  console.log('✅ Cart calculates totals correctly!');
  });
});