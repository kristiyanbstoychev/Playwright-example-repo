const globalVars = require('@playwright/test');

exports.test = globalVars.test.extend({
  firstName: ["testFirstName" + Date.now(), { option: true }],
  lastName: ["testLastName" + Date.now(), { option: true }],
  phoneNumber: [Date.now() + '1', { option: true }],
  email: ["testMail" + Date.now() + "@mail.com", { option: true }],
  username: ['testUser' + Date.now(), { option: true }],
  password: ['aaaa', { option: true }],
  bankName: ['testBank' + Date.now(), { option: true }],
  bankRoutingNumber: ["011401533", { option: true }],
  bankAccountNumber: ["111118121", { option: true }],
});
