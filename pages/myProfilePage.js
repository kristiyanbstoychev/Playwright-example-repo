const { expect } = require('@playwright/test');

exports.MyProfilePage = class MyProfilePage {

    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;

        //Bank info
        this.bankNameInput = page.getByPlaceholder('Bank Name')
        this.bankRoutingNumberInput = page.getByPlaceholder('Routing Number')
        this.bankAccountNumberInput = page.getByPlaceholder('Account Number')
        this.saveBankInformationButton = page.locator('[data-test="bankaccount-submit"]')
        this.doneOnboardingButton = page.locator('[data-test="user-onboarding-next"]')
        this.navigationFullNameField = page.locator('[data-test="sidenav-user-full-name"]')
        this.snavigationNewTransactionButton = page.locator('[data-test="nav-top-new-transaction"]')
        this.userOnboardingModal = page.locator('xpath=//button[@data-test="user-onboarding-next"]')

        //Navigation
        this.navigationMenuToggle = page.locator('[data-test="sidenav-toggle"]')
        this.homeNavigationTab = page.locator('[data-test="sidenav-home"]')
        this.myAccountNavigationTab = page.locator('[data-test="sidenav-user-settings"]')
        this.bankAccountsNavigationTab = page.locator('[data-test="sidenav-bankaccounts"]')

        //User info
        this.myAccountFirstNameInput = page.locator('[data-test="user-settings-firstName-input"]')
        this.myAccountLastNameInput = page.locator('[data-test="user-settings-lastName-input"]')
        this.myAccountEmailInput = page.locator('[data-test="user-settings-email-input"]')
        this.myAccountPhoneInput = page.locator('[data-test="user-settings-phoneNumber-input"]')
        this.myAccountSaveInfoButton = page.locator('[data-test="user-settings-submit"]')

        //User Info validations
        this.firstNameIsRequiredErrorMessage = page.locator('[id="user-settings-firstName-input-helper-text"]')
        this.lastNameIsRequiredErrorMessage = page.locator('[id="user-settings-lastName-input-helper-text"]')
        this.emailIsRequiredErrorMessage = page.locator('[id="user-settings-email-input-helper-text"]')
        this.phoneIsRequiredErrorMessage = page.locator('[id="user-settings-phoneNumber-input-helper-text"]')

        //Bank Accounts    
        this.addNewBankAccountButton = page.locator('[data-test="bankaccount-new"]')
        this.deleteBankAccountButton = page.locator('[data-test="bankaccount-delete"]')
  }

    async fillBankInformation(testBankName, testBankRoutingNumber, testBankAccountNumber, isFirstLogin){
        if(isFirstLogin) {
            await this.userOnboardingModal.click()
        }

        await this.bankNameInput.type(testBankName);
        await this.bankRoutingNumberInput.type(testBankRoutingNumber);
        await this.bankAccountNumberInput.type(testBankAccountNumber);
        await this.saveBankInformationButton.click();
        
        if(isFirstLogin) {
            await this.doneOnboardingButton.click()
        }
    }

    async updateUserInfo(firstName, lastName, email, phoneNumber, isMobile) {

        if (isMobile) {
            await this.navigationMenuToggle.click()
        }

        await this.myAccountNavigationTab.click()
        await this.myAccountFirstNameInput.clear()
        await this.myAccountLastNameInput.clear()
        await this.myAccountEmailInput.clear()
        await this.myAccountPhoneInput.clear()

        await this.myAccountFirstNameInput.type(firstName)
        await this.myAccountLastNameInput.type(lastName)
        await this.myAccountEmailInput.type(email)
        await this.myAccountPhoneInput.type(phoneNumber)

        await this.myAccountSaveInfoButton.click()

        
        if (isMobile) {
            await this.navigationMenuToggle.click()
        }
        await this.homeNavigationTab.click()

        if (isMobile) {
            await this.navigationMenuToggle.click()
        }
        await this.myAccountNavigationTab.click()
        
        await expect(this.myAccountFirstNameInput).toHaveValue(firstName)        
        await expect(this.myAccountLastNameInput).toHaveValue(lastName)
        await expect(this.myAccountEmailInput).toHaveValue(email)
        await expect(this.myAccountPhoneInput).toHaveValue(phoneNumber)
    }

    async updateUserInfoFormValidations(isMobile) {
        
        if (isMobile) {
            await this.navigationMenuToggle.click()
        }

        await this.myAccountNavigationTab.click()
        await this.myAccountFirstNameInput.clear()
        await this.myAccountLastNameInput.clear()
        await this.myAccountEmailInput.clear()
        await this.myAccountPhoneInput.clear()

        await this.firstNameIsRequiredErrorMessage.isVisible()
        await this.lastNameIsRequiredErrorMessage.isVisible()
        await this.emailIsRequiredErrorMessage.isVisible()
        await this.phoneIsRequiredErrorMessage.isVisible()

        await this.myAccountEmailInput.type('asdads')
        await expect(this.emailIsRequiredErrorMessage).toContainText('Must contain a valid email address') 

        await this.myAccountEmailInput.type('asdads@')
        await expect(this.emailIsRequiredErrorMessage).toContainText('Must contain a valid email address')

        await this.myAccountPhoneInput.type('1')
        await expect(this.phoneIsRequiredErrorMessage).toContainText('Phone number is not valid')

        await this.myAccountPhoneInput.type('testPhone')
        await expect(this.phoneIsRequiredErrorMessage).toContainText('Phone number is not valid')
    }

    async addNewBankAccount(testBankName, testBankRoutingNumber, testBankAccountNumber, isMobile) {
        
        if (isMobile) {
            await this.navigationMenuToggle.click()
        }

        await this.bankAccountsNavigationTab.click()
        await this.addNewBankAccountButton.click()
        await this.fillBankInformation(testBankName, testBankRoutingNumber, testBankAccountNumber, false)
    }

    async deleteBankAccount(isMobile, deleteButton) {

        if (isMobile) {
            await this.navigationMenuToggle.click()
        }

        await this.bankAccountsNavigationTab.click()
        await this.deleteBankAccountButton.nth(deleteButton).click()
    }
}