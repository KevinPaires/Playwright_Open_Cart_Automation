const { BasePage } = require('./BasePage');

class AccountPage extends BasePage {
  constructor(page, options = {}) {
    super(page);

    // Allow overriding selectors via options while keeping sensible defaults
    const {
      firstNameSelector = '#input-firstname',
      lastNameSelector = '#input-lastname',
      emailSelector = '#input-email',
      telephoneSelector = '#input-telephone',
      passwordSelector = '#input-password',
      confirmPasswordSelector = '#input-confirm',
      agreeCheckboxSelector = 'input[name="agree"]',
      continueButtonName = 'Continue',
      successMessageText = 'successfully created',
      fieldErrorsSelector = '.text-danger',
      accountHeadingSelector = 'h1',
      logoutLinkText = 'Logout',
    } = options;

    // Registration form locators
    this.firstNameInput = page.locator(firstNameSelector);
    this.lastNameInput = page.locator(lastNameSelector);
    this.emailInput = page.locator(emailSelector);
    this.telephoneInput = page.locator(telephoneSelector);
    this.passwordInput = page.locator(passwordSelector);
    this.confirmPasswordInput = page.locator(confirmPasswordSelector);

    // Agreement and submit
    this.agreeCheckbox = page.locator(agreeCheckboxSelector);
    this.continueButton = page.getByRole('button', { name: continueButtonName });

    // Success/error messages
    this.successMessage = page.getByText(successMessageText, { exact: false });
    this.fieldErrors = page.locator(fieldErrorsSelector);

    // Account page elements
    this.accountHeading = page.locator(accountHeadingSelector);
    this.logoutLink = page.locator(`text=${logoutLinkText}`);
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
    await this.click(this.continueButton);
    await this.waitForPageLoad();
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
    return await this.isVisible(this.successMessage);
  }

  async getSuccessMessage() {
    return await this.getText(this.successMessage);
  }

  async isErrorMessageVisible() {
    return await this.fieldErrors.count() > 0;
  }

  async getErrorMessage() {
    // Return first error message found
    const errorText = await this.getText(this.fieldErrors);
    return errorText || '';
  }

  async isWarningMessageVisible() {
    // Check if there are any field errors displayed
    return await this.fieldErrors.count() > 0;
  }

  async getWarningMessage() {
    // Return field error message if present
    const errorText = await this.getText(this.fieldErrors);
    return errorText || '';
  }

  async logout() {
    await this.click(this.logoutLink);
    await this.waitForPageLoad();
  }

  async isLoggedIn() {
    try {
      return await this.isVisible(this.logoutLink);
    } catch {
      return false;
    }
  }

  async getAccountHeading() {
    return await this.getText(this.accountHeading);
  }
}

module.exports = { AccountPage };
