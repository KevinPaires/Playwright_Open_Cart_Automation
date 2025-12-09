const { test, expect } = require('./fixtures');


test.describe('Search Functionality Tests', () => {
  
  test('search for iPhone returns results', async ({ homePage, searchPage }) => {
    
    const productName = 'iPhone';
    await homePage.goto();
    await homePage.searchProduct(productName);
    await homePage.waitForPageLoad();
    
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

  test('search for MacBook returns results', async ({ homePage, searchPage }) => {
    
    const productName = 'MacBook';
    await homePage.goto();
    await homePage.searchProduct(productName);
    await homePage.waitForPageLoad();
    
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

  test('search for non-existent product shows message', async ({ homePage, searchPage }) => {
    
    const productName = 'xyznonexistentproduct123';
    await homePage.goto();
    await homePage.searchProduct(productName);
    
    await homePage.waitForPageLoad();
    const resultsCount = await searchPage.getResultsCount();
    expect(resultsCount).toBe(0);
    
    console.log('No results found as expected!');
  });

  test('empty search shows message or all products', async ({ homePage, page }) => {
    
    await homePage.goto();
    await homePage.searchButton.click();
    
    await expect(page).toHaveURL(/search/);
    
    console.log('Empty search handled!');
  });

  test('can search from search results page', async ({ homePage, searchPage }) => {
    
    const productName1 = 'iPhone';
    const productName2 = 'MacBook';
    // First search
    await homePage.goto();
    await homePage.searchProduct(productName1);
    await homePage.waitForPageLoad();
    
    const firstCount = await searchPage.getResultsCount();
    expect(firstCount).toBeGreaterThan(0);
    
    // Search again from results page
    await searchPage.searchAgain(productName2);
    
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