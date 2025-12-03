const { BasePage } = require('./BasePage');

class ProductPage extends BasePage {
  constructor(page, options = {}) {
    super(page);

    // Allow overriding selectors via options while keeping sensible defaults
    const {
      addToCartSelector = '#button-cart',
      productTitleSelector = 'h1',
      productPriceSelector = '.list-unstyled li h2',
      quantitySelector = '#input-quantity',
      successAlertSelector = '.alert-success',
      productThumbsSelector = '.product-thumb',
      productLinkSelector = '.product-thumb h4 a',
      listingAddButtonText = 'Add to Cart',
    } = options;

    // Product detail page
    this.addToCartButton = page.locator(addToCartSelector);
    this.productTitle = page.locator(productTitleSelector);
    this.productPrice = page.locator(productPriceSelector);
    this.quantityInput = page.locator(quantitySelector);
    this.successAlert = page.locator(successAlertSelector);

    // Product listing (thumbnails)
    this.productThumbs = page.locator(productThumbsSelector);
    this.productLinks = page.locator(productLinkSelector);
    this.listingAddButtonText = listingAddButtonText;
  }

  async goto(productUrl) {
    await super.goto(productUrl);
  }

  // Click product by visible product name (uses page.locator with text-matching)
  async clickProduct(productName) {
    const locator = this.page.locator(`${this.productLinks.selector}:has-text("${productName}")`).first();
    await this.click(locator);
    await this.waitForPageLoad();
  }

  async clickProductByIndex(index) {
    await this.click(this.productLinks.nth(index));
    await this.waitForPageLoad();
  }

  async addToCart() {
    await this.click(this.addToCartButton);
    // Wait deterministically for either a success alert or page load
    try {
      await this.waitForVisible(this.successAlert);
    } catch {
      await this.waitForPageLoad();
    }
  }

  async addToCartWithQuantity(quantity) {
    await this.fill(this.quantityInput, String(quantity));
    await this.click(this.addToCartButton);
    try {
      await this.waitForVisible(this.successAlert);
    } catch {
      await this.waitForPageLoad();
    }
  }

  async getProductTitle() {
    return await this.getText(this.productTitle);
  }

  async getProductPrice() {
    return await this.getText(this.productPrice);
  }

  async isSuccessMessageVisible() {
    return await this.isVisible(this.successAlert);
  }

  async getSuccessMessage() {
    return await this.getText(this.successAlert);
  }

  // Add to cart from product listing (using the listing's add button)
  async addToCartFromListing(index, buttonText = this.listingAddButtonText) {
    const addButton = this.productThumbs.nth(index).locator(`button:has-text("${buttonText}")`);
    await this.click(addButton);
    try {
      await this.waitForVisible(this.successAlert);
    } catch {
      await this.waitForPageLoad();
    }
  }

  async getProductCount() {
    return await this.count(this.productThumbs);
  }
}

module.exports = { ProductPage };