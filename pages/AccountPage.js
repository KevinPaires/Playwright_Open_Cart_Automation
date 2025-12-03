const { BasePage } = require('./BasePage');

class AccountPage extends BasePage {
  constructor(page) {
    super(page);

    // Registration form locators
    this.firstNameInput = page.locator('#input-firstname');
    this.lastNameInput = page.locator('#input-lastname');
    this.emailInput = page.locator('#input-email');
    this.telephoneInput = page.locator('#input-telephone');
    this.passwordInput = page.locator('#input-password');
    this.confirmPasswordInput = page.locator('#input-confirm');

    // Agreement and submit
    this.agreeCheckbox = page.locator('input[name="agree"]');
    this.continueButton = page.getByRole('button', { name: 'Continue' })

    // Success/error messages
    this.successMessage = page.getByText('successfully created', { exact: false });
    this.fieldErrors = page.locator('.text-danger');


    // Account page elements
    this.accountHeading = page.locator('h1');
    this.logoutLink = page.locator('text=Logout');
  }

  async goto() {
    await super.goto('/index.php?route=account/register');
  }

  async gotoLogin() {
    await super.goto('/index.php?route=account/login');
  }

  async gotoAccount() {
    await super.goto('/index.php?route=account/account');
  }

  async fillFirstName(firstName) {
    await this.fill(this.firstNameInput, firstName);
  }

  async fillLastName(lastName) {
    await this.fill(this.lastNameInput, lastName);
  }

  async fillEmail(email) {
    await this.fill(this.emailInput, email);
  }

  async fillTelephone(telephone) {
    await this.fill(this.telephoneInput, telephone);
  }

  async fillPassword(password) {
    await this.fill(this.passwordInput, password);
  }

  async fillConfirmPassword(confirmPassword) {
    await this.fill(this.confirmPasswordInput, confirmPassword);
  }

  async agreeToTerms() {
    await this.click(this.agreeCheckbox);
  }

  async clickContinue() {
    try {
      await this.click(this.continueButton);
    } catch {
      // Fallback: try pressing Enter on the last visible input
      const inputs = this.page.locator('input[type="text"], input[type="email"], input[type="password"]');
      await inputs.last().press('Enter');
    }
    // Wait for page to navigate or show success/error
    await this.page.waitForTimeout(1000);
    try {
      await this.waitForVisible(this.successMessage, 3000);
    } catch {
      // If no success message, wait for page load
      try {
        await this.waitForPageLoad();
      } catch {
        // Page may have already loaded
      }
    }
  }

  async registerAccount(firstName, lastName, email, telephone, password) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.fillTelephone(telephone);
    await this.fillPassword(password);
    await this.fillConfirmPassword(password);
    await this.agreeToTerms();
    await this.clickContinue();
  }

  async isSuccessMessageVisible() {
    return await this.isVisible(this.successMessage, 5000);
  }

  async getSuccessMessage() {
    return await this.getText(this.successMessage);
  }

  async isErrorMessageVisible() {
    return await this.fieldErrors.count() > 0;
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  async isWarningMessageVisible() {
    return await this.isVisible(this.warningMessage, 3000);
  }

  async getWarningMessage() {
    return await this.getText(this.warningMessage);
  }

  async logout() {
    await this.click(this.logoutLink);
    await this.waitForPageLoad();
  }

  async isLoggedIn() {
    try {
      return await this.isVisible(this.logoutLink, 2000);
    } catch {
      return false;
    }
  }

  async getAccountHeading() {
    return await this.getText(this.accountHeading);
  }
}

module.exports = { AccountPage };
