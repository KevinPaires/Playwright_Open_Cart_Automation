class ProductPage {
  constructor(page) {
    this.page = page;
    
    // Product detail page
    this.addToCartButton = page.locator('#button-cart');
    this.productTitle = page.locator('h1');
    this.productPrice = page.locator('.list-unstyled li h2');
    this.quantityInput = page.locator('#input-quantity');
    this.successAlert = page.locator('.alert-success');
    
    // Product listing (thumbnails)
    this.productThumbs = page.locator('.product-thumb');
    this.productLinks = page.locator('.product-thumb h4 a');
    
  }

  async goto(productUrl) {
    await this.page.goto(productUrl);
  }

  async clickProduct(productName) {
    await this.page.locator(`.product-thumb h4 a:has-text("${productName}")`).first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickProductByIndex(index) {
    await this.productLinks.nth(index).click();
    await this.page.waitForLoadState('networkidle');
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.page.waitForTimeout(1500); 
  }

  async addToCartWithQuantity(quantity) {
    await this.quantityInput.clear();
    await this.quantityInput.fill(String(quantity));
    await this.addToCartButton.click();
    await this.page.waitForTimeout(1500);
  }

  async getProductTitle() {
    return await this.productTitle.textContent();
  }

  async getProductPrice() {
    return await this.productPrice.textContent();
  }

  async isSuccessMessageVisible() {
    return await this.successAlert.isVisible({ timeout: 5000 });
  }

  async getSuccessMessage() {
    return await this.successAlert.textContent();
  }

  // Add to cart from product listing (using the onclick button)
  async addToCartFromListing(index) {
    // Find the specific add to cart button by index
    const addButton = this.productThumbs.nth(index).locator('button:has-text("Add to Cart")');
    await addButton.click();
    await this.page.waitForTimeout(1500);
  }

  async getProductCount() {
    return await this.productThumbs.count();
  }
}

module.exports = { ProductPage };