import { test } from './baseTest';
import { expect } from '@playwright/test';
const { RegisterPage } = require('../pages/registerPage');
const { LoginPage } = require('../pages/loginPage');
const { MyProfilePage } = require('../pages/myProfilePage');

test.beforeEach(async ({ page }) => {
    await page.goto('/signup')
});

test.afterEach(async ({ page }) => {
    await page.close()
});

test('new registration', async ({ page, username, password, firstName, lastName, bankName, bankRoutingNumber, bankAccountNumber, isMobile }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const profilePage = new MyProfilePage(page);

    console.log(isMobile)
    
    await registerPage.fillRegistrationForm(firstName, lastName, username, password)

    await loginPage.login(username,password)

    await profilePage.fillBankInformation(bankName, bankRoutingNumber, bankAccountNumber, true)
})

test ('registration form validations' , async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.registrationFormValidations()
})
