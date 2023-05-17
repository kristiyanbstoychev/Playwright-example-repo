import { expect } from "@playwright/test";
import { test } from "./globalVars";
const { RegisterPage } = require("../pages/registerPage");
const { LoginPage } = require("../pages/loginPage");
const { MyProfilePage } = require("../pages/myProfilePage");
const { NewTransactionPage } = require("../pages/newTransactionPage");

test.beforeEach(async ({ page, username, password }) => {
    const loginPage = new LoginPage(page)

    await page.goto("/");
    loginPage.login(username, password)
    // loginPage.login("testUser1684308263766", "aaaa");
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test('request money', async ({ page, firstName, isMobile }) => {
    const newTransactionPage = new NewTransactionPage(page)
    const myProfilePage = new MyProfilePage(page)
    
    await newTransactionPage.requestMoney('100', 'test')

    await expect(await page.locator('xpath=//h2[contains(text(), "Requested")]').count()).toEqual(1);

    if(isMobile) {
        await myProfilePage.navigationMenuToggle.click()
    }

    await newTransactionPage.navigationHomeTab.click();
    await newTransactionPage.myTransactionsTab.click();    

    await expect(await page.locator('xpath=//span[contains(text(), "' + firstName + '")]').count()).toBeGreaterThan(0);
})

test('send money', async ({ page, firstName, isMobile }) => {
    const newTransactionPage = new NewTransactionPage(page);
    const myProfilePage = new MyProfilePage(page);

    await newTransactionPage.sendMoney("100", "test");

    await expect(await page.locator('xpath=//h2[contains(text(), "Paid")]').count()).toEqual(1);

    if (isMobile) {
      await myProfilePage.navigationMenuToggle.click();
    }

    await newTransactionPage.navigationHomeTab.click();
    await newTransactionPage.myTransactionsTab.click();   

    await expect(
      await page
        .locator('xpath=//span[contains(text(), "' + firstName + '")]')
        .count()
    ).toBeGreaterThan(0);
})
