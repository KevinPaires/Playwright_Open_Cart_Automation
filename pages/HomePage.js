const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);

    // Locators
    this.logo = page.locator('#logo');
    this.searchInput = page.locator('input[name="search"]');
    this.searchButton = page.locator('#search button');
    this.myAccountDropdown = page.locator('.dropdown >> text=My Account');
    this.registerLink = page.locator('text=Register');
    this.loginLink = page.locator('text=Login');
    this.cartButton = page.locator('#cart');
    this.featuredProducts = page.locator('.product-layout');
    this.laptopsDropdown = page.locator('a.dropdown-toggle:has-text("Laptops & Notebooks")');
    this.showAllLaptops = page.locator('a.see-all:has-text("Show All Laptops & Notebooks")');
  }

  async goto() {
    await super.goto('/');
  }

  async searchProduct(productName) {
    await this.fill(this.searchInput, productName);
    await this.click(this.searchButton);
    await this.waitForPageLoad();
  }

  async clickMyAccount() {
    await this.click(this.myAccountDropdown);
  }

  async goToRegister() {
    await this.clickMyAccount();
    await this.click(this.registerLink);
  }

  async goToLogin() {
    await this.clickMyAccount();
    await this.click(this.loginLink);
  }

  async goToLaptops() {
    // Hover to open dropdown
    await this.laptopsDropdown.hover();
    
    // Wait for dropdown to be visible
    await this.waitForVisible(this.showAllLaptops, 5000);
    
    // Click while keeping mouse on the area
    await this.click(this.showAllLaptops, { force: true });
    
    await this.waitForPageLoad();
  }

  async getFeaturedProductsCount() {
    return await this.count(this.featuredProducts);
  }
}

module.exports = { HomePage };