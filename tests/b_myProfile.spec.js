import { test } from './baseTest';
import { expect } from '@playwright/test';
const { RegisterPage } = require('../pages/registerPage');
const { LoginPage } = require('../pages/loginPage');
const { MyProfilePage } = require('../pages/myProfilePage');

test.beforeEach(async ({ page, username, password }) => {
    const loginPage = new LoginPage(page)

    await page.goto('/')
    
    await loginPage.login(username, password)
});

test.afterEach(async ({ page }) => {
    await page.close()
});

test('update user info', async ({ page, firstName, lastName, email, phoneNumber, isMobile }) => {
    const myProfilePage = new MyProfilePage(page)

    await myProfilePage.updateUserInfo(firstName + 'u', lastName + 'u', email, phoneNumber, isMobile)
})

test ('update user form validations' , async ({ page, isMobile }) => {
    const myProfilePage = new MyProfilePage(page)

    await myProfilePage.updateUserInfoFormValidations(isMobile)
})

test('add bank account', async ({ page, bankName, bankRoutingNumber, bankAccountNumber, isMobile }) => {
    const myProfilePage = new MyProfilePage(page)

    await myProfilePage.addNewBankAccount(bankName, bankRoutingNumber, bankAccountNumber, isMobile)
    await expect(page.locator('xpath=//p[contains(text(), "' + bankName + '")]').nth(0)).toBeVisible()
})

test('delete bank account', async ({ page, bankName, isMobile }) => {
    const myProfilePage = new MyProfilePage(page)

    await myProfilePage.deleteBankAccount(isMobile, 1)
    await expect(page.locator('xpath=//p[contains(text(), "' + bankName + '")]').nth(0)).toBeVisible() 
})



