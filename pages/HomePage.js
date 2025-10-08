class HomePage {
  constructor(page) {
    this.page = page;
    
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
    await this.page.goto('/');
  }

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async clickMyAccount() {
    await this.myAccountDropdown.click();
  }

  async goToRegister() {
    await this.clickMyAccount();
    await this.registerLink.click();
  }

  async goToLogin() {
    await this.clickMyAccount();
    await this.loginLink.click();
  }

  async goToLaptops() {
    // Hover to open dropdown
    await this.laptopsDropdown.hover();
    
    // Wait for dropdown to be visible
    await this.showAllLaptops.waitFor({ state: 'visible', timeout: 5000 });
    
    // Click while keeping mouse on the area
    await this.showAllLaptops.click({ force: true });
    
    await this.page.waitForLoadState('networkidle');
  }

  async getFeaturedProductsCount() {
    return await this.featuredProducts.count();
  }
}

module.exports = { HomePage };