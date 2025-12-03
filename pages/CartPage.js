const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Locators
    this.cartButton = page.locator('#cart');
    this.cartTotal = page.locator('#cart-total');
    this.cartDropdown = page.locator('.dropdown-menu.pull-right');
    this.viewCartLink = page.locator('text=View Cart');
    this.checkoutButton = page.locator('text=Checkout').first();
    
    // Cart page elements (scoped to the main cart table to avoid matching dropdown)
    this.cartTable = page.locator('.table-responsive');
    this.productRows = this.cartTable.locator('tbody tr');
    this.productNames = this.cartTable.locator('tbody tr td:nth-child(2) a');
    this.productPrices = this.cartTable.locator('tbody tr td:nth-child(6)');
    this.quantityInputs = this.cartTable.locator('input[name^="quantity"]');
    this.updateButtons = this.cartTable.locator('button[data-original-title="Update"]');
    this.removeButtons = this.cartTable.locator('button[data-original-title="Remove"]');
    
    // Totals
    this.totalRow = page.locator('.table-bordered tr').last();
  }

  async goto() {
    await super.goto('/index.php?route=checkout/cart');
  }

  async clickCartButton() {
    await this.click(this.cartButton);
    await this.waitForVisible(this.cartDropdown);
  }

  async viewCart() {
    await this.clickCartButton();
    await this.click(this.viewCartLink);
    await this.waitForPageLoad();
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
    return text.trim(); 
  }

  async getCartTotalPrice() {
    // Get only the price portion
    const text = await this.cartTotal.textContent();
    const match = text.match(/\$[\d,]+\.\d{2}/);
    return match ? match[0] : '$0.00';
  }

  async getProductNames() {
    // Wait for at least one product name to be visible
    await this.waitForVisible(this.productNames.first(), 10000);
    return await this.productNames.allTextContents();
  }

  async getTotal() {
    const text = await this.totalRow.textContent();
    return text.trim();
  }

  async updateQuantity(index, quantity) {
    await this.quantityInputs.nth(index).fill(String(quantity));
    await this.click(this.updateButtons.nth(index));
    await this.waitForPageLoad();
  }

  async removeItem(index) {
    await this.click(this.removeButtons.nth(index));
    await this.waitForDetached(this.removeButtons.nth(index));
  }

  async getProductCount() {
    return await this.productRows.count();
  }

  async proceedToCheckout() {
    await this.click(this.checkoutButton);
  }

  async isCartEmpty() {
    try {
      // Check for empty message
      const emptyMessage = this.page.locator('text=Your shopping cart is empty!');
      const hasMessage = await this.isVisible(emptyMessage, 3000);
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