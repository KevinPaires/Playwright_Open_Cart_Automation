const { BasePage } = require('./BasePage');

class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    
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
    // Wait for page/network to settle, then return the number of results.
    await this.waitForPageLoad(3000);
    return await this.count(this.searchResults);
  }

  async getProductTitles() {
    await this.waitForVisible(this.productTitles.first(), 3000);
    return await this.productTitles.allTextContents();
  }

  async clickProduct(productName) {
    const locator = this.page.locator(`text=${productName}`).first();
    await this.click(locator);
  }

  async isNoResultsDisplayed() {
    try {
      return await this.isVisible(this.noResultsMessage, 3000);
    } catch {
      return false;
    }
  }


  async searchAgain(searchTerm) {
    // Clear and fill the first search input
    await this.fill(this.searchInput, searchTerm);
    await this.click(this.searchButton);
    await this.waitForPageLoad();
  }
}

module.exports = { SearchPage };