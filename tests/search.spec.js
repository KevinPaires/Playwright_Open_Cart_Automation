const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { SearchPage } = require('../pages/SearchPage');

test.describe('Search Functionality Tests', () => {
  
  test('search for iPhone returns results', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    
    await homePage.goto();
    await homePage.searchProduct('iPhone');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    const resultsCount = await searchPage.getResultsCount();
    expect(resultsCount).toBeGreaterThan(0);
    
    const productTitles = await searchPage.getProductTitles();
    console.log('Found products:', productTitles);
    
    const hasIPhone = productTitles.some(title => 
      title.toLowerCase().includes('iphone')
    );
    expect(hasIPhone).toBeTruthy();
    
    console.log(`Found ${resultsCount} iPhone products!`);
  });

  test('search for MacBook returns results', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    
    await homePage.goto();
    await homePage.searchProduct('MacBook');
    
    await page.waitForLoadState('networkidle');
    
    const resultsCount = await searchPage.getResultsCount();
    expect(resultsCount).toBeGreaterThan(0);
    
    const productTitles = await searchPage.getProductTitles();
    console.log('Found products:', productTitles);
    
    const hasMacBook = productTitles.some(title => 
      title.toLowerCase().includes('macbook')
    );
    expect(hasMacBook).toBeTruthy();
    
    console.log(`Found ${resultsCount} MacBook products!`);
  });

  test('search for non-existent product shows message', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    
    await homePage.goto();
    await homePage.searchProduct('xyznonexistentproduct123');
    
    await page.waitForLoadState('networkidle');
    
    // Check if message appears or results are empty
    const resultsCount = await searchPage.getResultsCount();
    expect(resultsCount).toBe(0);
    
    console.log('No results found as expected!');
  });

  test('empty search shows message or all products', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.goto();
    await homePage.searchButton.click();
    
    await expect(page).toHaveURL(/search/);
    
    console.log('Empty search handled!');
  });

  test('can search from search results page', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    
    // First search
    await homePage.goto();
    await homePage.searchProduct('iPhone');
    await page.waitForLoadState('networkidle');
    
    const firstCount = await searchPage.getResultsCount();
    expect(firstCount).toBeGreaterThan(0);
    
    // Search again from results page
    await searchPage.searchAgain('MacBook');
    
    const secondCount = await searchPage.getResultsCount();
    expect(secondCount).toBeGreaterThan(0);
    
    const productTitles = await searchPage.getProductTitles();
    const hasMacBook = productTitles.some(title => 
      title.toLowerCase().includes('macbook')
    );
    expect(hasMacBook).toBeTruthy();
    
    console.log('Search from results page works!');
  });
});