class BasePage {
  constructor(page) {
    this.page = page;
    // sensible default timeout for locator waits (ms)
    this.defaultTimeout = 3000;
  }

  // Navigate to a URL or path
  async goto(url) {
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  async waitForPageLoad(timeout = this.defaultTimeout) {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  async getPageTitle() {
    return await this.page.title();
  }

  // Wait until a locator is visible
  async waitForVisible(locator, timeout = this.defaultTimeout) {
    // Use first() to avoid strict-mode errors when locator matches multiple elements
    await locator.first().waitFor({ state: 'visible', timeout });
  }

  // Wait until a locator is hidden (not visible)
  async waitForHidden(locator, timeout = this.defaultTimeout) {
    await locator.first().waitFor({ state: 'hidden', timeout });
  }

  // Wait until a locator is removed from DOM
  async waitForDetached(locator, timeout = this.defaultTimeout) {
    await locator.first().waitFor({ state: 'detached', timeout });
  }

  // Safe click that waits for the element to be visible
  async click(locator, options = {}) {
    await this.waitForVisible(locator, options.timeout || this.defaultTimeout);
    await locator.click(options);
  }

  // Click and wait for navigation (useful for links that navigate)
  async clickAndWaitForNavigation(locator, options = {}) {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: options.timeout || this.defaultTimeout }),
      this.click(locator, options),
    ]);
  }

  // Fill input after ensuring visibility
  async fill(locator, text, options = {}) {
    await this.waitForVisible(locator, options.timeout || this.defaultTimeout);
    await locator.fill(text, options);
  }

  // Get trimmed text content from a locator
  async getText(locator, options = {}) {
    await this.waitForVisible(locator, options.timeout || this.defaultTimeout);
    const text = await locator.textContent();
    return text ? text.trim() : '';
  }

  async isVisible(locator, timeout = 500) {
    try {
      return await locator.isVisible({ timeout });
    } catch {
      return false;
    }
  }

  async count(locator) {
    return await locator.count();
  }

  // Select a dropdown option by visible text
  async selectOptionByText(locator, optionText, options = {}) {
    await this.waitForVisible(locator, options.timeout || this.defaultTimeout);
    await locator.selectOption({ label: optionText }, options);
  }
}

module.exports = { BasePage };