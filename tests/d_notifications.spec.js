import { expect } from "@playwright/test";
import { test } from "./globalVars";
const { RegisterPage } = require("../pages/registerPage");
const { LoginPage } = require("../pages/loginPage");
const { MyProfilePage } = require("../pages/myProfilePage");
const { NewTransactionPage } = require("../pages/newTransactionPage");
const { Notifications } = require("../pages/notifications");

test.beforeEach(async ({ page, username,firstName, password, isMobile }) => {
    const loginPage = new LoginPage(page)
    const myProfilePage = new MyProfilePage(page)
    const newTransactionPage = new NewTransactionPage(page)

    await page.goto("/");
    await loginPage.login(username, password)
    // loginPage.login("testUser1684308263766", "aaaa");
    if (isMobile) {
        await myProfilePage.navigationMenuToggle.click()
    }
    await newTransactionPage.myTransactionsTab.click()
    await page.locator('xpath=//span[contains(text(), "' + firstName + '")]').nth(0).click();
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test('like transaction', async ({ page, firstName, isMobile }) => {
    const myProfilePage = new MyProfilePage(page)
    const notifications = new Notifications(page)
    
    await notifications.transactionLikeButton.nth(1).click()

    if (isMobile) {
        await myProfilePage.navigationMenuToggle.click()
    }

    await notifications.notificationNavigationTab.click()

    await expect(await page.locator('xpath=//span[contains(text(), "'+ firstName +'")]').count()).toEqual(1);
    await notifications.dismissNotificationButton.click()
})

test('comment transaction', async ({ page, firstName, isMobile }) => {
    const newTransactionPage = new NewTransactionPage(page);
    const myProfilePage = new MyProfilePage(page);
    const notifications = new Notifications(page);

     await notifications.transactionCommentInput.type('test');
     await page.keyboard.press("Enter");

     if (isMobile) {
       await myProfilePage.navigationMenuToggle.click();
     }

     await notifications.notificationNavigationTab.click();

     await expect(
       await page
         .locator('xpath=//span[contains(text(), "' + firstName + '")]')
         .count()
     ).toEqual(1);
     await notifications.dismissNotificationButton.click();
})
