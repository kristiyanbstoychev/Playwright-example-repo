exports.Notifications = class Notifications {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.notificationNavigationTab = page.locator('xpath=//a[@data-test="sidenav-notifications"]');
    this.transactionLikeButton = page.locator('xpath=//button[@type="button"]');
    this.transactionCommentInput = page.locator('xpath=//input[@placeholder="Write a comment..."]');       
    this.dismissNotificationButton = page.locator('xpath=//span[contains(text(), "Dismiss")]');       
  }

}