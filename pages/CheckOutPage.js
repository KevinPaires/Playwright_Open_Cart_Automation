const { BasePage } = require('./BasePage');

class CheckOutPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Locators
    this.checkoutTitle = page.locator('span:has-text("Checkout")');
    
    // Input fields
    this.firstNameInput = page.locator('#input-payment-firstname');
    this.lastNameInput = page.locator('#input-payment-lastname');
    this.companyInput = page.locator('#input-payment-company');
    this.address1Input = page.locator('#input-payment-address-1');
    this.cityInput = page.locator('#input-payment-city');
    this.postCodeInput = page.locator('#input-payment-postcode');
    this.emailInput = page.getByRole('textbox', { name: '* E-Mail' });
    this.telephoneInput = page.getByRole('textbox', { name: '* Telephone' });
    
    // Dropdowns
    this.countryDropdown = page.locator('#input-payment-country');
    this.zoneDropdown = page.locator('#input-payment-zone');
    
    // Buttons
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.commentTextarea = page.locator('textarea[name="comment"]');
    this.agreeCheckbox = page.locator('input[name="agree"]');
    this.confirmOrderButton = page.getByRole('button', { name: 'Confirm Order' });
    
    // Order confirmation
    this.orderSuccessTitle = page.getByRole('heading', { name: 'Your order has been placed!' });
    this.checkOutButton = page.getByRole('link', { name: ' Checkout' });
    this.guestCheckoutRadio = page.getByRole('radio', { name: 'Guest Checkout' });
    
    // Specific button IDs for each step
    this.buttonAccount = page.locator('#button-account');
    this.buttonPaymentMethod = page.locator('#button-payment-method');
    this.buttonGuestMethod = page.locator('#button-guest');
    this.buttonDeliveryMethod = page.locator('#button-shipping-method');
    this.buttonPaymentAddress = page.locator('#button-payment-address');
    this.buttonShippingAddress = page.locator('#button-shipping-address');

    this.historyLink = page.getByRole('link', { name: 'history', exact: true });
    this.orderRowsCount = page.locator('table.table tbody tr');
    this.orderTable = page.locator('table.table');



  }

  async goto() {
    await super.goto('/index.php?route=checkout/checkout');
  }

  async clickCheckoutButton() {
    await this.click(this.checkOutButton);
  }

  async isCheckoutPage() {
    return await this.isVisible(this.checkoutTitle);
  }

  async clickGuestCheckoutRadio() {
    await this.click(this.guestCheckoutRadio);
  }
  // buttons
  async clickButtonPaymentMethod() {
  await this.buttonPaymentMethod.waitFor({ state: 'visible' });
  await this.buttonPaymentMethod.click();
}


  async clickButtonGuestMethod() {
    await this.click(this.buttonGuestMethod);
  }

  async clickAccountContinue() {
    await this.click(this.buttonAccount);
  }

  async clickButtonDeliveryMethod() {
    await this.click(this.buttonDeliveryMethod);
  }

  async clickButtonPaymentAddress() {
    await this.click(this.buttonPaymentAddress);
  }

  async clickButtonShippingAddress() {
    await this.click(this.buttonShippingAddress);
  }

  async clickConfirmOrder() {
    await this.click(this.confirmOrderButton);
  }
  // fill methods

  async fillFirstName(firstName) {
    await this.fill(this.firstNameInput, firstName);
  }

  async fillLastName(lastName) {
    await this.fill(this.lastNameInput, lastName);
  }

  async fillCompany(company) {
    await this.fill(this.companyInput, company);
  }

  async fillAddress1(address1) {
    await this.fill(this.address1Input, address1);
  }

  async fillEmail(email) {
    await this.fill(this.emailInput, email);
  }

  async fillTelephone(telephone) {
    await this.fill(this.telephoneInput, telephone);
  }

  async fillCity(city) {
    await this.fill(this.cityInput, city);
  }

  async fillPostCode(postCode) {
    await this.fill(this.postCodeInput, postCode);
  }

  async selectCountry(countryName) {
    await this.selectOptionByText(this.countryDropdown, countryName);
  }

  async selectZone(zoneName) {
    await this.selectOptionByText(this.zoneDropdown, zoneName);
  }


  async fillComment(comment) {
    await this.fill(this.commentTextarea, comment);
  }

  async fillAddressDetails(firstName, lastName, company, address1, city, postCode, countryName, zoneName) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillCompany(company);
    await this.fillAddress1(address1);
    await this.fillCity(city);
    await this.fillPostCode(postCode);
    await this.selectCountry(countryName);
    await this.selectZone(zoneName);
  }

  async agreeToTerms() {
    await this.click(this.agreeCheckbox);
  }

  async isOrderSuccess() {
    await this.page.waitForURL(/checkout\/success/);
    await this.orderSuccessTitle.waitFor();
    return true;
  }

  async goToOrderHistory() {
    await this.historyLink.click();
  }

  async waitForOrderTable() {
    await this.orderTable.waitFor({ state: 'visible' });
  }

  async getOrderCount() {
    return await this.orderRowsCount.count();
  }
}

module.exports = { CheckOutPage };