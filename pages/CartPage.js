class CartPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.cartButton = page.locator('#cart');
    this.cartTotal = page.locator('#cart-total');
    this.cartDropdown = page.locator('.dropdown-menu.pull-right');
    this.viewCartLink = page.locator('text=View Cart');
    this.checkoutButton = page.locator('text=Checkout').first();
    
    // Cart page elements
    this.cartTable = page.locator('.table-responsive');
    this.productRows = page.locator('tbody tr');
    this.productNames = page.locator('tbody tr td:nth-child(2) a');
    this.productPrices = page.locator('tbody tr td:nth-child(6)');
    this.quantityInputs = page.locator('input[name^="quantity"]');
    this.updateButtons = page.locator('button[data-original-title="Update"]');
    this.removeButtons = page.locator('button[data-original-title="Remove"]');
    
    // Totals
    this.totalRow = page.locator('.table-bordered tr').last();
  }

  async goto() {
    await this.page.goto('/index.php?route=checkout/cart');
  }

  async clickCartButton() {
    await this.cartButton.click();
    await this.page.waitForTimeout(500);
  }

  async viewCart() {
    await this.clickCartButton();
    await this.viewCartLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getCartItemCount() {
    const text = await this.cartTotal.textContent();
    // Extract number from "2 item(s) - $1,804.00"
    const match = text.match(/(\d+)\s+item/);
    return match ? parseInt(match[1]) : 0;
  }

  async getCartTotal() {
    // Get the FULL text including item count
    const text = await this.cartTotal.textContent();
    return text.trim(); // Returns "2 item(s) - $244.00"
  }

  async getCartTotalPrice() {
    // Get only the price portion
    const text = await this.cartTotal.textContent();
    const match = text.match(/\$[\d,]+\.\d{2}/);
    return match ? match[0] : '$0.00';
  }

  async getProductNames() {
    await this.page.waitForTimeout(500);
    return await this.productNames.allTextContents();
  }

  async getTotal() {
    const text = await this.totalRow.textContent();
    return text.trim();
  }

  async updateQuantity(index, quantity) {
    await this.quantityInputs.nth(index).clear();
    await this.quantityInputs.nth(index).fill(String(quantity));
    await this.updateButtons.nth(index).click();
    await this.page.waitForTimeout(2000); // Wait for update
  }

  async removeItem(index) {
    await this.removeButtons.nth(index).click();
    await this.page.waitForTimeout(1500);
  }

  async getProductCount() {
    return await this.productRows.count();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async isCartEmpty() {
  try {
    // Check for empty message
    const emptyMessage = this.page.locator('text=Your shopping cart is empty!');
    const hasMessage = await emptyMessage.isVisible({ timeout: 3000 });
    if (hasMessage) return true;
    
    // Alternative: check if product count is 0
    const count = await this.getProductCount();
    return count === 0;
  } catch {
    // If error, check product count
    try {
      const count = await this.getProductCount();
      return count === 0;
    } catch {
      return false;
    }
  }
}
}

module.exports = { CartPage };