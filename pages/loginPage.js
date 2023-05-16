const { expect } = require('@playwright/test');
const { ProfilePage } = require('./myProfilePage');

exports.LoginPage = class LoginPage {
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
        this.userNameInputField = page.locator('xpath=//input[@id="username"]');
        this.passwordInputField = page.locator('xpath=//input[@id="password"]')
        this.signUpButton = page.locator('xpath=//button[@data-test="signin-submit"]')
        this.userNameIsRequiredMessage = page.getByText('Username is required')
        this.wrongCredentialsErrordMessage = page.locator('[data-test="signin-error"]')
        this.transactionButton = page.locator('xpath=//button[@data-test="nav-top-new-transaction"]')
  }

    async login(username, password){
        await this.userNameInputField.type(username);
        await this.passwordInputField.type(password);
        await this.signUpButton.click();
    }

    async loginValidations() {
        
        
    }
}   
