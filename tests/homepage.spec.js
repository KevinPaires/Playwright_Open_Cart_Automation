const { test, expect } = require('./fixtures');

test.describe('Homepage Tests', () => {
  
  test('homepage loads successfully', async ({ homePage }) => {
    
    await homePage.goto();
    
    // Verify 
    await expect(homePage.page).toHaveTitle(/Your Store/);
    await expect(homePage.logo).toBeVisible();
    await expect(homePage.searchInput).toBeVisible();
    await expect(homePage.myAccountDropdown).toBeVisible();
    
    console.log('✅ Homepage loaded successfully!');
  });

  test('featured products are displayed', async ({ homePage }) => {
    
    await homePage.goto();
    
    const productCount = await homePage.getFeaturedProductsCount();
    expect(productCount).toBeGreaterThan(0);
    
    console.log(`✅ Found ${productCount} featured products!`);
  });
});