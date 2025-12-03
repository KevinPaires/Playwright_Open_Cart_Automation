const { test, expect } = require('./fixtures');
const { TestDataGenerator } = require('../tests/utils/testDataGenerator');


test.describe('Register Account Tests With Boundary Values, Positive and Negative Cases', () => {

  test('register new account with valid details', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(8);
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(10);
    const password = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);

    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();


    let registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();

    if (!registered) {
      // Fallback: attempt to verify registration via login (site may auto-login)
      await accountPage.gotoLogin();
      const url = page.url();
      if (/account\/account/.test(url)) {
        registered = true;
      } else {
        // Try to login with created credentials
        await accountPage.fillEmail(email);
        await accountPage.fillPassword(password);
        await accountPage.clickContinue();
        await accountPage.waitForPageLoad();
        registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();
      }
    }

    expect(registered).toBeTruthy();
    console.log('✅ User registered successfully!');
  });

  test('register with missing required fields shows error', async ({ accountPage }) => {
    await accountPage.goto();
    await accountPage.clickContinue();

    await accountPage.page.waitForLoadState('networkidle');

    const errorMessage = await accountPage.isErrorMessageVisible();
    
    expect(errorMessage).toBeTruthy()
    console.log('✅ Invalid input detected!');
  });

  test('fill all registration form fields', async ({ accountPage, page }) => {
    
    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);

    const fName = TestDataGenerator.inputTestData(6);
    const lName = TestDataGenerator.inputTestData(6);
    const email = TestDataGenerator.generateEmail(8, 3);
    const phone = TestDataGenerator.inputTestData(10);
    const pwd = TestDataGenerator.inputTestData(12);

    
    await accountPage.fillFirstName(fName);
    await accountPage.fillLastName(lName);
    await accountPage.fillEmail(email);
    await accountPage.fillTelephone(phone);
    await accountPage.fillPassword(pwd);
    await accountPage.fillConfirmPassword(pwd);

    await expect(accountPage.firstNameInput).toHaveValue(fName);
    await expect(accountPage.lastNameInput).toHaveValue(lName);
    await expect(accountPage.emailInput).toHaveValue(email);
    await expect(accountPage.telephoneInput).toHaveValue(phone);
    console.log('✅ Filled all registration form fields!');
  });

  test('agreement checkbox can be toggled', async ({ accountPage }) => {
    // BasePage.goto() via AccountPage
    await accountPage.goto();
    
    // BasePage.isVisible() safely checks element visibility (with timeout, returns boolean)
    const visible = await accountPage.isVisible(accountPage.agreeCheckbox);
    expect(visible).toBeTruthy();
    
    const isChecked = await accountPage.agreeCheckbox.isChecked();
    if (!isChecked) {
      // agreeToTerms() uses BasePage.click() for safe interaction
      // (includes waitForVisible + reliable click)
      await accountPage.agreeToTerms();
      const afterToggle = await accountPage.agreeCheckbox.isChecked();
      expect(afterToggle).toBeTruthy();
      console.log('✅ Agreement checkbox toggled on!');
    }
  });

  test('login with valid credentials succeeds', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(6);
    const lastName = TestDataGenerator.inputTestData(6);
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(10);
    const password = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();

    let registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();

    if (!registered) {
      // Fallback: navigate to login using BasePage.goto via AccountPage
      await accountPage.gotoLogin();
      const url = page.url();
      if (/account\/account/.test(url)) {
        registered = true;
      } else {
        // Login using AccountPage methods (which leverage BasePage.fill and BasePage.click)
        await accountPage.fillEmail(email);
        await accountPage.fillPassword(password);
        await accountPage.clickContinue();
        await accountPage.waitForPageLoad();
        registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();
      }
    }

    expect(registered).toBeTruthy();
    console.log('✅ User logged in successfully!');
  });

  test('logout from account', async ({ accountPage }) => {
    // BasePage.goto() via AccountPage
    await accountPage.gotoAccount();
    const isLoggedIn = await accountPage.isLoggedIn();
    if (isLoggedIn) {
      // AccountPage.logout() uses:
      // - BasePage.click() for the logout link
      // - BasePage.waitForPageLoad() to wait for navigation
      await accountPage.logout();
      const stillLoggedIn = await accountPage.isLoggedIn();
      expect(stillLoggedIn).toBeFalsy();
      console.log('✅ User logged out successfully!');
    }
  });
  // Test boundary case for first name field 

  test('boundary of first name with 1 character', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(1);   // boundary: 1 char
    const lastName = TestDataGenerator.inputTestData(8);
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(10);
    const password = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    
    let registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();

    if (!registered) {
      // Fallback: attempt to verify registration via login (site may auto-login)
      await accountPage.gotoLogin();
      const url = page.url();
      if (/account\/account/.test(url)) {
        registered = true;
      } else {
        // Try to login with created credentials
        await accountPage.fillEmail(email);
        await accountPage.fillPassword(password);
        await accountPage.clickContinue();
        await accountPage.waitForPageLoad();
        registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();
      }
    }

    expect(registered).toBeTruthy();
    console.log('✅ User registered successfully!');
  });

  test('boundary of first name with 2 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(2);   // boundary: 2 chars
    const lastName = TestDataGenerator.inputTestData(8);
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(10);
    const password = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    
    let registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();

    if (!registered) {
      // Fallback: attempt to verify registration via login (site may auto-login)
      await accountPage.gotoLogin();
      const url = page.url();
      if (/account\/account/.test(url)) {
        registered = true;
      } else {
        // Try to login with created credentials
        await accountPage.fillEmail(email);
        await accountPage.fillPassword(password);
        await accountPage.clickContinue();
        await accountPage.waitForPageLoad();
        registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();
      }
    }

    expect(registered).toBeTruthy();
    console.log('✅ User registered successfully!');
  })

  test('boundary of first name with 31 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(31);   // boundary: 1 char
    const lastName = TestDataGenerator.inputTestData(8);
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(10);
    const password = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    
    let registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();

    if (!registered) {
      // Fallback: attempt to verify registration via login (site may auto-login)
      await accountPage.gotoLogin();
      const url = page.url();
      if (/account\/account/.test(url)) {
        registered = true;
      } else {
        // Try to login with created credentials
        await accountPage.fillEmail(email);
        await accountPage.fillPassword(password);
        await accountPage.clickContinue();
        await accountPage.waitForPageLoad();
        registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();
      }
    }
    
    expect(registered).toBeTruthy();
    console.log('✅ User registered successfully!');
  })

  test('boundary of first name with 32 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(32);   // boundary: 32 chars
    const lastName = TestDataGenerator.inputTestData(8);
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(10);
    const password = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    
    let registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();

    if (!registered) {
      // Fallback: attempt to verify registration via login (site may auto-login)
      await accountPage.gotoLogin();
      const url = page.url();
      if (/account\/account/.test(url)) {
        registered = true;
      } else {
        // Try to login with created credentials
        await accountPage.fillEmail(email);
        await accountPage.fillPassword(password);
        await accountPage.clickContinue();
        await accountPage.waitForPageLoad();
        registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();
      }
    }
    
    expect(registered).toBeTruthy();
    console.log('✅ User registered successfully!');
  })

  test('boundary of first name 33 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(33);   // boundary: 33 chars
    const lastName = TestDataGenerator.inputTestData(8);
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(10);
    const password = TestDataGenerator.inputTestData(12);

    
    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    await accountPage.clickContinue();
    await accountPage.waitForPageLoad();

    const errorMessage = await accountPage.isErrorMessageVisible();
    
    expect(errorMessage).toBeTruthy()
    console.log('✅ Invalid input detected!');
  });

  test('boundary of first name empty input', async ({ accountPage, page }) => {
    const firstName = '';   // empty input
    const lastName = TestDataGenerator.inputTestData(8);
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(10);
    const password = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    await accountPage.clickContinue();
    await accountPage.waitForPageLoad();

    const errorMessage = await accountPage.isErrorMessageVisible();
    
    expect(errorMessage).toBeTruthy()
    console.log('✅ Invalid input detected!');
  });

  // boundary case for last name field

  test('boundary of last name with 1 character', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);   
    const lastName = TestDataGenerator.inputTestData(1);   // boundary: 1 char
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(10);
    const password = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    
    let registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();

    if (!registered) {
      // Fallback: attempt to verify registration via login (site may auto-login)
      await accountPage.gotoLogin();
      const url = page.url();
      if (/account\/account/.test(url)) {
        registered = true;
      } else {
        // Try to login with created credentials
        await accountPage.fillEmail(email);
        await accountPage.fillPassword(password);
        await accountPage.clickContinue();
        await accountPage.waitForPageLoad();
        registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();
      }
    }

    expect(registered).toBeTruthy();
    console.log('✅ User registered successfully!');
  });

  test('boundary of last name with 2 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(2);   // boundary: 2 chars
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(10);
    const password = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    
    let registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();

    if (!registered) {
      // Fallback: attempt to verify registration via login (site may auto-login)
      await accountPage.gotoLogin();
      const url = page.url();
      if (/account\/account/.test(url)) {
        registered = true;
      } else {
        // Try to login with created credentials
        await accountPage.fillEmail(email);
        await accountPage.fillPassword(password);
        await accountPage.clickContinue();
        await accountPage.waitForPageLoad();
        registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();
      }
    }

    expect(registered).toBeTruthy();
    console.log('✅ User registered successfully!');
  })

  test('boundary of last name with 31 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(31);   // boundary: 31 chars
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(10);
    const password = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    
    let registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();

    if (!registered) {
      // Fallback: attempt to verify registration via login (site may auto-login)
      await accountPage.gotoLogin();
      const url = page.url();
      if (/account\/account/.test(url)) {
        registered = true;
      } else {
        // Try to login with created credentials
        await accountPage.fillEmail(email);
        await accountPage.fillPassword(password);
        await accountPage.clickContinue();
        await accountPage.waitForPageLoad();
        registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();
      }
    }
    
    expect(registered).toBeTruthy();
    console.log('✅ User registered successfully!');
  })

  test('boundary of last name with 32 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(32);   // boundary: 32 chars
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(10);
    const password = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    
    let registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();

    if (!registered) {
      // Fallback: attempt to verify registration via login (site may auto-login)
      await accountPage.gotoLogin();
      const url = page.url();
      if (/account\/account/.test(url)) {
        registered = true;
      } else {
        // Try to login with created credentials
        await accountPage.fillEmail(email);
        await accountPage.fillPassword(password);
        await accountPage.clickContinue();
        await accountPage.waitForPageLoad();
        registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();
      }
    }
    
    expect(registered).toBeTruthy();
    console.log('✅ User registered successfully!');
  })

  test('boundary of last name 33 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(33);   // boundary: 33 chars
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(10);
    const password = TestDataGenerator.inputTestData(12);

    
    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    await accountPage.clickContinue();
    await accountPage.waitForPageLoad();

    const errorMessage = await accountPage.isErrorMessageVisible();
    
    expect(errorMessage).toBeTruthy()
    console.log('✅ Invalid input detected!');
  });

  test('boundary of last name empty input', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = '';   // empty input
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(10);
    const password = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    await accountPage.clickContinue();
    await accountPage.waitForPageLoad();

    const hasError = await accountPage.isErrorMessageVisible();
    const hasWarning = await accountPage.isWarningMessageVisible();
    const fieldErrors = await accountPage.page.locator('.text-danger').count();
    const foundValidation = hasError || hasWarning || fieldErrors > 0;

    expect(foundValidation).toBeTruthy()
    console.log('✅ Invalid input detected!');
  });

  test('stress test of last name 100 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(100);   // stress test: 100 chars
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(10);
    const password = TestDataGenerator.inputTestData(12);

    
    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    await accountPage.clickContinue();
    await accountPage.waitForPageLoad();

    const errorMessage = await accountPage.isErrorMessageVisible();
    
    expect(errorMessage).toBeTruthy()
    console.log('✅ Invalid input detected!');
  });

  test('stress test of first name 100 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(100);   // stress test: 100 chars
    const lastName = TestDataGenerator.inputTestData(8);
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(10);
    const password = TestDataGenerator.inputTestData(12);

    
    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    await accountPage.clickContinue();
    await accountPage.waitForPageLoad();

    const errorMessage = await accountPage.isErrorMessageVisible();
    
    expect(errorMessage).toBeTruthy()
    console.log('✅ Invalid input detected!');
  });

  // Test boundary case for telephone field
  test('boundary of telephone with 3 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);   
    const lastName = TestDataGenerator.inputTestData(8);   
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(3);   // boundary: 3 chars
    const password = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    
    let registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();

    if (!registered) {
      // Fallback: attempt to verify registration via login (site may auto-login)
      await accountPage.gotoLogin();
      const url = page.url();
      if (/account\/account/.test(url)) {
        registered = true;
      } else {
        // Try to login with created credentials
        await accountPage.fillEmail(email);
        await accountPage.fillPassword(password);
        await accountPage.clickContinue();
        await accountPage.waitForPageLoad();
        registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();
      }
    }

    expect(registered).toBeTruthy();
    console.log('✅ User registered successfully!');
  });

  test('boundary of telephone with 4 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(8);   
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(4);
    const password = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    
    let registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();

    if (!registered) {
      // Fallback: attempt to verify registration via login (site may auto-login)
      await accountPage.gotoLogin();
      const url = page.url();
      if (/account\/account/.test(url)) {
        registered = true;
      } else {
        // Try to login with created credentials
        await accountPage.fillEmail(email);
        await accountPage.fillPassword(password);
        await accountPage.clickContinue();
        await accountPage.waitForPageLoad();
        registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();
      }
    }

    expect(registered).toBeTruthy();
    console.log('✅ User registered successfully!');
  })

  test('boundary of telephone with 31 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(8);   
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(31);
    const password = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    
    let registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();

    if (!registered) {
      // Fallback: attempt to verify registration via login (site may auto-login)
      await accountPage.gotoLogin();
      const url = page.url();
      if (/account\/account/.test(url)) {
        registered = true;
      } else {
        // Try to login with created credentials
        await accountPage.fillEmail(email);
        await accountPage.fillPassword(password);
        await accountPage.clickContinue();
        await accountPage.waitForPageLoad();
        registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();
      }
    }
    
    expect(registered).toBeTruthy();
    console.log('✅ User registered successfully!');
  })

  test('boundary of telephone with 32 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(8);   
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(32);
    const password = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    
    let registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();

    if (!registered) {
      // Fallback: attempt to verify registration via login (site may auto-login)
      await accountPage.gotoLogin();
      const url = page.url();
      if (/account\/account/.test(url)) {
        registered = true;
      } else {
        // Try to login with created credentials
        await accountPage.fillEmail(email);
        await accountPage.fillPassword(password);
        await accountPage.clickContinue();
        await accountPage.waitForPageLoad();
        registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();
      }
    }
    
    expect(registered).toBeTruthy();
    console.log('✅ User registered successfully!');
  })

  test('boundary of telephone with 33 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(8);   
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(33);
    const password = TestDataGenerator.inputTestData(12);

    
    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    await accountPage.clickContinue();
    await accountPage.waitForPageLoad();

    const errorMessage = await accountPage.isErrorMessageVisible();
    
    expect(errorMessage).toBeTruthy()
    console.log('✅ Invalid input detected!');
  });

  test('boundary of telephone empty input', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(8);   
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = '';   // empty input
    const password = TestDataGenerator.inputTestData(12);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    await accountPage.clickContinue();
    await accountPage.waitForPageLoad();

    const errorMessage = await accountPage.isErrorMessageVisible();
    
    expect(errorMessage).toBeTruthy()
    console.log('✅ Invalid input detected!');
  });

  test('stress test of telephone 100 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(8);   // stress test: 100 chars
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(100);
    const password = TestDataGenerator.inputTestData(12);

    
    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    await accountPage.clickContinue();
    await accountPage.waitForPageLoad();

    const errorMessage = await accountPage.isErrorMessageVisible();
    
    expect(errorMessage).toBeTruthy()
    
    console.log('✅ Invalid input detected!');
  });

  test('boundary of telephone 2 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(8);   
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(2); // 2 chars
    const password = TestDataGenerator.inputTestData(12);

    
    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    await accountPage.clickContinue();
    await accountPage.waitForPageLoad();

    const hasError = await accountPage.isErrorMessageVisible();
    const hasWarning = await accountPage.isWarningMessageVisible();
    const fieldErrors = await accountPage.page.locator('.text-danger').count();
    const foundValidation = hasError || hasWarning || fieldErrors > 0;

    expect(foundValidation).toBeTruthy()
    console.log('✅ Invalid input detected!');
  });

  // Test stress case for password field
  test('boundary of password with 4 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);   
    const lastName = TestDataGenerator.inputTestData(8);   
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(3);   
    const password = TestDataGenerator.inputTestData(4);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    
    let registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();

    if (!registered) {
      // Fallback: attempt to verify registration via login (site may auto-login)
      await accountPage.gotoLogin();
      const url = page.url();
      if (/account\/account/.test(url)) {
        registered = true;
      } else {
        // Try to login with created credentials
        await accountPage.fillEmail(email);
        await accountPage.fillPassword(password);
        await accountPage.clickContinue();
        await accountPage.waitForPageLoad();
        registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();
      }
    }

    expect(registered).toBeTruthy();
    console.log('✅ User registered successfully!');
  });

  test('boundary of password with 5 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(8);   
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(4);
    const password = TestDataGenerator.inputTestData(5);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    
    let registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();

    if (!registered) {
      // Fallback: attempt to verify registration via login (site may auto-login)
      await accountPage.gotoLogin();
      const url = page.url();
      if (/account\/account/.test(url)) {
        registered = true;
      } else {
        // Try to login with created credentials
        await accountPage.fillEmail(email);
        await accountPage.fillPassword(password);
        await accountPage.clickContinue();
        await accountPage.waitForPageLoad();
        registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();
      }
    }

    expect(registered).toBeTruthy();
    console.log('✅ User registered successfully!');
  })

  test('boundary of password with 19 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(8);   
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(31);
    const password = TestDataGenerator.inputTestData(19);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    
    let registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();

    if (!registered) {
      // Fallback: attempt to verify registration via login (site may auto-login)
      await accountPage.gotoLogin();
      const url = page.url();
      if (/account\/account/.test(url)) {
        registered = true;
      } else {
        // Try to login with created credentials
        await accountPage.fillEmail(email);
        await accountPage.fillPassword(password);
        await accountPage.clickContinue();
        await accountPage.waitForPageLoad();
        registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();
      }
    }
    
    expect(registered).toBeTruthy();
    console.log('✅ User registered successfully!');
  })

  test('boundary of password with 20 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(8);   
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(32);
    const password = TestDataGenerator.inputTestData(20);

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    
    let registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();

    if (!registered) {
      // Fallback: attempt to verify registration via login (site may auto-login)
      await accountPage.gotoLogin();
      const url = page.url();
      if (/account\/account/.test(url)) {
        registered = true;
      } else {
        // Try to login with created credentials
        await accountPage.fillEmail(email);
        await accountPage.fillPassword(password);
        await accountPage.clickContinue();
        await accountPage.waitForPageLoad();
        registered = await accountPage.isSuccessMessageVisible() || await accountPage.isLoggedIn();
      }
    }
    
    expect(registered).toBeTruthy();
    console.log('✅ User registered successfully!');
  })

  test('boundary of password with 21 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(8);   
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(33);
    const password = TestDataGenerator.inputTestData(21);

    
    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    await accountPage.clickContinue();
    await accountPage.waitForPageLoad();

    const errorMessage = await accountPage.isErrorMessageVisible();
    
    expect(errorMessage).toBeTruthy()
    console.log('✅ Invalid input detected!');
  });

  test('boundary of password empty input', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(8);   
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(10);
    const password = ''; // empty input

    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    await accountPage.clickContinue();
    await accountPage.waitForPageLoad();

    const errorMessage = await accountPage.isErrorMessageVisible();
    
    expect(errorMessage).toBeTruthy()
    console.log('✅ Invalid input detected!');
  });

  test('stress test of password 100 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(8);   // stress test: 100 chars
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(10);
    const password = TestDataGenerator.inputTestData(100);

    
    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    await accountPage.clickContinue();
    await accountPage.waitForPageLoad();

    const errorMessage = await accountPage.isErrorMessageVisible();
    
    expect(errorMessage).toBeTruthy()
    console.log('✅ Invalid input detected!');
  });

  test('boundary of password 3 characters', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(8);   
    const email = TestDataGenerator.generateEmail(10, 3);
    const telephone = TestDataGenerator.inputTestData(5); 
    const password = TestDataGenerator.inputTestData(3); // 3 chars

    
    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    await accountPage.clickContinue();
    await accountPage.waitForPageLoad();

    const errorMessage = await accountPage.isErrorMessageVisible();
    

    expect(errorMessage).toBeTruthy()
    console.log('✅ Invalid input detected!');
  });
  // test email input field

  test('test empty email field', async ({ accountPage, page }) => {
    const firstName = TestDataGenerator.inputTestData(8);
    const lastName = TestDataGenerator.inputTestData(8);   
    const email = '';
    const telephone = TestDataGenerator.inputTestData(5); 
    const password = TestDataGenerator.inputTestData(8); 

    
    await accountPage.goto();
    await expect(page).toHaveURL(/account\/register/);
    await accountPage.registerAccount(firstName, lastName, email, telephone, password);
    await accountPage.waitForPageLoad();
    await accountPage.clickContinue();
    await accountPage.waitForPageLoad();

 
   const errorMessage = await accountPage.isErrorMessageVisible();
    

    expect(errorMessage).toBeTruthy()
    console.log('✅ Invalid input detected!');
  });
})