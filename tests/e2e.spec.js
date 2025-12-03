const { test, expect } = require('./fixtures');
const { TestDataGenerator } = require('../tests/utils/testDataGenerator');

test.describe('checkout process', () => {
  
  test('Place order as a guest', async ({ homePage, productPage, checkOutPage }) => {
    const firstName = TestDataGenerator.inputTestData(6);
    const lastName = TestDataGenerator.inputTestData(8);
    const email = TestDataGenerator.generateEmail(6, 4);
    const telephone = TestDataGenerator.inputTestData(10);
    const address = TestDataGenerator.inputTestData(12);
    const city = TestDataGenerator.inputTestData(6);
    const postcode = TestDataGenerator.inputTestData(5);
    const country = 'United States';
    const zone = 'California';

    await homePage.goto();
    await homePage.goToLaptops();
    await productPage.clickProductByIndex(0);
    await productPage.addToCart();

    await checkOutPage.goto();
    await checkOutPage.clickGuestCheckoutRadio();
    await checkOutPage.clickAccountContinue();
    await checkOutPage.waitForPageLoad();
    
    await checkOutPage.fillFirstName(firstName);
    await checkOutPage.fillLastName(lastName);
    await checkOutPage.fillEmail(email);
    await checkOutPage.fillTelephone(telephone);
    await checkOutPage.fillAddress1(address);
    await checkOutPage.fillCity(city);
    await checkOutPage.fillPostCode(postcode);
    await checkOutPage.selectCountry(country);
    await checkOutPage.selectZone(zone);

    await checkOutPage.clickButtonGuestMethod();
    await checkOutPage.clickButtonDeliveryMethod();
    
    await checkOutPage.agreeToTerms();
    await checkOutPage.clickButtonPaymentMethod();
    await checkOutPage.waitForPageLoad();

    await checkOutPage.clickConfirmOrder();
    await checkOutPage.waitForPageLoad();

    const isOrderSuccessful = await checkOutPage.isOrderSuccess();
    expect(isOrderSuccessful).toBeTruthy();
    console.log('✅ Checkout completed successfully!');
  });

  test('Place order with comments', async ({ homePage, productPage, checkOutPage }) => {
    const firstName = TestDataGenerator.inputTestData(6);
    const lastName = TestDataGenerator.inputTestData(8);
    const email = TestDataGenerator.generateEmail(6, 4);
    const telephone = TestDataGenerator.inputTestData(10);
    const address = TestDataGenerator.inputTestData(12);
    const city = TestDataGenerator.inputTestData(6);
    const postcode = TestDataGenerator.inputTestData(5);
    const country = 'United States';
    const zone = 'California';
    const comment = TestDataGenerator.inputTestData(20);

    await homePage.goto();
    await homePage.goToLaptops();
    await productPage.clickProductByIndex(0);
    await productPage.addToCart();

    await checkOutPage.goto();
    await checkOutPage.clickGuestCheckoutRadio();
    await checkOutPage.clickAccountContinue();
    await checkOutPage.waitForPageLoad();
    
    await checkOutPage.fillFirstName(firstName);
    await checkOutPage.fillLastName(lastName);
    await checkOutPage.fillEmail(email);
    await checkOutPage.fillTelephone(telephone);
    await checkOutPage.fillAddress1(address);
    await checkOutPage.fillCity(city);
    await checkOutPage.fillPostCode(postcode);
    await checkOutPage.selectCountry(country);
    await checkOutPage.selectZone(zone);

    await checkOutPage.clickButtonGuestMethod();
    await checkOutPage.fillComment(comment);
    await checkOutPage.clickButtonDeliveryMethod();
    
    await checkOutPage.agreeToTerms();
    await checkOutPage.clickButtonPaymentMethod();
    await checkOutPage.waitForPageLoad();

    await checkOutPage.clickConfirmOrder();
    await checkOutPage.waitForPageLoad();

    const isOrderSuccessful = await checkOutPage.isOrderSuccess();
    expect(isOrderSuccessful).toBeTruthy();
    console.log('✅ Comments added and checkout completed successfully!');
  });


  test('Place order as registered user', async ({ page, homePage, productPage, accountPage, checkOutPage }) => {
    const registerFirstName = TestDataGenerator.inputTestData(6);
    const registerLastName = TestDataGenerator.inputTestData(8);
    const registerEmail = TestDataGenerator.generateEmail(10, 3);
    const registerTelephone = TestDataGenerator.inputTestData(10);
    const registerPassword = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(registerFirstName, registerLastName, registerEmail, registerTelephone, registerPassword);
    await accountPage.waitForPageLoad();
    console.log('✅ Account registered successfully!');

    const firstName = TestDataGenerator.inputTestData(6);
    const lastName = TestDataGenerator.inputTestData(8);
    const address = TestDataGenerator.inputTestData(12);
    const city = TestDataGenerator.inputTestData(6);
    const postcode = TestDataGenerator.inputTestData(5);
    const country = 'United States';
    const zone = 'California';

    await homePage.goto();
    await homePage.goToLaptops();
    await productPage.clickProductByIndex(0);
    await productPage.addToCart();

    await checkOutPage.goto();
    await checkOutPage.waitForPageLoad();
    
    await checkOutPage.fillFirstName(firstName);
    await checkOutPage.fillLastName(lastName);
    await checkOutPage.fillAddress1(address);
    await checkOutPage.fillCity(city);
    await checkOutPage.fillPostCode(postcode);
    await checkOutPage.selectCountry(country);
    await checkOutPage.selectZone(zone);
    await checkOutPage.clickButtonPaymentAddress();
    await checkOutPage.waitForPageLoad();

    await checkOutPage.clickButtonShippingAddress();
    await checkOutPage.clickButtonDeliveryMethod();
    
    await checkOutPage.agreeToTerms();
    await checkOutPage.clickButtonPaymentMethod();
    await checkOutPage.waitForPageLoad();

    await checkOutPage.clickConfirmOrder();
    await checkOutPage.waitForPageLoad();

    const isOrderSuccessful = await checkOutPage.isOrderSuccess();
    expect(isOrderSuccessful).toBeTruthy();
    console.log('✅ Checkout completed successfully!');
  });

  test('Verify order is in user history', async ({ page, homePage, productPage, accountPage, checkOutPage }) => {
    const registerFirstName = TestDataGenerator.inputTestData(6);
    const registerLastName = TestDataGenerator.inputTestData(8);
    const registerEmail = TestDataGenerator.generateEmail(10, 3);
    const registerTelephone = TestDataGenerator.inputTestData(10);
    const registerPassword = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(registerFirstName, registerLastName, registerEmail, registerTelephone, registerPassword);
    await accountPage.waitForPageLoad();
    console.log('✅ Account registered successfully!');

    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(8);
    const address = TestDataGenerator.inputTestData(12);
    const city = TestDataGenerator.inputTestData(6);
    const postcode = TestDataGenerator.inputTestData(5);
    const country = 'United States';
    const zone = 'California';

    await homePage.goto();
    await homePage.goToLaptops();
    await productPage.clickProductByIndex(0);
    await productPage.addToCart();

    await checkOutPage.goto();
    await checkOutPage.waitForPageLoad();
    
    await checkOutPage.fillFirstName(firstName);
    await checkOutPage.fillLastName(lastName);
    await checkOutPage.fillAddress1(address);
    await checkOutPage.fillCity(city);
    await checkOutPage.fillPostCode(postcode);
    await checkOutPage.selectCountry(country);
    await checkOutPage.selectZone(zone);
    await checkOutPage.clickButtonPaymentAddress();
    await checkOutPage.waitForPageLoad();

    await checkOutPage.clickButtonShippingAddress();
    await checkOutPage.clickButtonDeliveryMethod();
    
    await checkOutPage.agreeToTerms();
    await checkOutPage.clickButtonPaymentMethod();
    await checkOutPage.waitForPageLoad();

    await checkOutPage.clickConfirmOrder();
    await checkOutPage.waitForPageLoad();

    const isOrderSuccessful = await checkOutPage.isOrderSuccess();
    expect(isOrderSuccessful).toBeTruthy();
    console.log('✅ Checkout completed successfully!');

    await checkOutPage.goToOrderHistory();
    await checkOutPage.waitForOrderTable();
    const orderCount = await checkOutPage.getOrderCount();
    expect(orderCount).toBeGreaterThan(0);
    console.log('✅ Order is present in order history!');

  });

});