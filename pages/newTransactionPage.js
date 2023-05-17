exports.NewTransactionPage = class NewTransactionPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.newTransactionButton = page.locator(
      'xpath=//a[@data-test="nav-top-new-transaction"]'
    );
    this.myTransactionsTab = page.locator(
      'xpath=//a[@data-test="nav-personal-tab"]'
    );
    this.navigationHomeTab = page.locator(
      'xpath=//a[@data-test="sidenav-home"]'
    );
    this.demoTransactionUserRecord = page.locator(
      'xpath=//li[@data-test="user-list-item-t45AiwidW"]'
    );
    this.transactionAmountInput = page.locator('xpath=//input[@id="amount"]');
    this.transactionAmountNote = page.locator(
      'xpath=//input[@id="transaction-create-description-input"]'
    );
    this.requestMoneyButton = page.locator(
      'xpath=//button[@data-test="transaction-create-submit-request"]'
    );
    this.sendMoneyButton = page.locator(
      'xpath=//button[@data-test="transaction-create-submit-payment"]'
    );
    this.transactionAmountInvalidMessage = page.locator(
      'xpath=//p[@id="transaction-create-amount-input-helper-text"]'
    );
    this.transactionNoteInvalidMessage = page.locator(
      'xpath=//p[@id="transaction-create-description-input-helper-text"]'
    );
    this.transactionSentToastMessage = page.locator(
      'xpath=//div[contains(text(), "Transaction Submitted!")]'
    );
    this.moneyRequestedMessage = page.locator(
      'xpath=//h2[contains(text(), "Requested")]'
    );
    this.moneyPaidMessage = page.locator(
      'xpath=//h2[contains(text(), "Paid")]'
    );
  }

  async requestMoney(amount, note) {
    await this.newTransactionButton.click();
    await this.demoTransactionUserRecord.click();
    await this.transactionAmountInput.type(amount);
    await this.transactionAmountNote.type(note);
    await this.requestMoneyButton.click();
    await this.moneyRequestedMessage.isVisible();
    await this.transactionSentToastMessage.isVisible();
  }

  async sendMoney(amount, note) {
    await this.newTransactionButton.click();
    await this.demoTransactionUserRecord.click();
    await this.transactionAmountInput.type(amount);
    await this.transactionAmountNote.type(note);
    await this.sendMoneyButton.click();
    await this.moneyRequestedMessage.isVisible();
    await this.transactionSentToastMessage.isVisible();
  }
};