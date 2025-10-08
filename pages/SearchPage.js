class SearchPage {
  constructor(page) {
    this.page = page;
    
    // Locators - more specific and reliable
    this.searchResults = page.locator('.product-layout.product-grid');
    this.productTitles = page.locator('.product-thumb h4 a');
    this.noResultsMessage = page.locator('#content p', { hasText: 'no product' });
    this.pageHeading = page.locator('#content h1');
    
    // Use the top search bar (first occurrence)
    this.searchInput = page.locator('input[name="search"]').first();
    this.searchButton = page.locator('#search button').first();
  }

  async getResultsCount() {
    // Wait a bit for results to load
    await this.page.waitForTimeout(1000);
    return await this.searchResults.count();
  }

  async getProductTitles() {
    await this.page.waitForTimeout(500);
    return await this.productTitles.allTextContents();
  }

  async clickProduct(productName) {
    await this.page.locator(`text=${productName}`).first().click();
  }

  async isNoResultsDisplayed() {
    try {
      return await this.noResultsMessage.isVisible({ timeout: 3000 });
    } catch {
      return false;
    }
  }

  async getNoResultsMessage() {
    return await this.page.locator('#content').textContent();
  }

  async searchAgain(searchTerm) {
    // Clear and fill the first search input
    await this.searchInput.clear();
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { SearchPage };