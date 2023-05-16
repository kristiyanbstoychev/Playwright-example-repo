const { expect } = require('@playwright/test');

exports.RegisterPage = class RegisterPage {

    testFirstName = "testFirstName";
    testLastName = "testLastName";
    testUserName = "testUserName";
    testPassword = "aaaaa";

    /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.createAccountLink = page.locator('[data-test="signup"]');
    this.firstNameInputField = page.getByLabel('First Name *')
    this.lastNameInputField = page.locator('xpath=//input[@id="lastName"]')
    this.userNameInputField = page.locator('xpath=//input[@id="username"]')
    this.passwordInputField = page.locator('xpath=//input[@id="password"]')
    this.confirmPasswordInputField = page.locator('xpath=//input[@id="confirmPassword"]')
    this.createAccountButton = page.locator('xpath=//button[@data-test="signup-submit"]')
    
    //validations
    this.firstNameIsRequiredErrorMessage = page.getByText('First Name is required')
    this.lastNameIsRequiredErrorMessage = page.getByText('Last Name is required')
    this.userNameIsRequiredErrorMessage = page.getByText('Username is required')
    this.passwordIsRequiredErrorMessage = page.getByText('Enter your password')
    this.confirmPasswordIsRequiredErrorMessage = page.getByText('Confirm your password')
    this.passwordsDontMatchErrorMessage = page.getByText('Password does not match')

    this.userOnboardingModal = page.locator('xpath=//input[@id="user-onboarding-next"]')
  }

  async fillRegistrationForm(testFirstName, testLastName, testUserName, testPassword){
      await this.firstNameInputField.type(testFirstName)
      await this.lastNameInputField.type(testLastName)
      await this.userNameInputField.type(testUserName)
      await this.passwordInputField.type(testPassword)
      await this.confirmPasswordInputField.type(testPassword)
      await this.createAccountButton.click()
    }

  async registrationFormValidations(){
      await this.firstNameInputField.click()
      await this.createAccountButton.click()

      await this.lastNameInputField.click()
      await this.firstNameInputField.click()

      await this.userNameInputField.click()

      await this.passwordInputField.click()
      await this.firstNameInputField.click()

      await this.confirmPasswordInputField.click()
      await this.firstNameInputField.click()

      await this.firstNameIsRequiredErrorMessage.isVisible()
      await this.lastNameIsRequiredErrorMessage.isVisible()
      await this.userNameIsRequiredErrorMessage.isVisible()
      await this.passwordIsRequiredErrorMessage.isVisible()
      await this.confirmPasswordIsRequiredErrorMessage.isVisible()
      
      await this.passwordInputField.type('aaaa')
      await this.confirmPasswordInputField.type('aaaaa')
      await this.firstNameInputField.click()

      await this.passwordsDontMatchErrorMessage.isVisible()
    }
}
