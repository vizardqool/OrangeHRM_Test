import loginPage from 'C:\\Users\\Gaming\\cypress\\support\\pageObjects\\LoginPage.js';

describe('OrangeHRM - Login Module Test Cases', () => {

  beforeEach(() => {
    loginPage.visit();
  });

  // TC-LOG-001: Verify login with valid credential
  it('TC-LOG-001: Verify login with valid credential', () => {
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginReq');

    loginPage.login('Admin', 'admin123');

    cy.wait('@loginReq').its('response.statusCode').should('eq', 302);
    loginPage.verifyDashboardPage();
  });

  // TC-LOG-002: Verify login with invalid username
  it('TC-LOG-002: Verify login with invalid username', () => {
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages', {
      statusCode: 500,
      body: { error: 'Error', message: 'Invalid Credentials' } 
    }).as('getError');

    loginPage.login('InvalidUser', 'admin123');

    cy.wait('@getError').its('response.statusCode').should('eq', 500);
    loginPage.verifyErrorMessage('Invalid credentials');
  });

  // TC-LOG-003: Verify login with invalid password
  it('TC-LOG-003: Verify login with invalid password', () => {
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages', {
      statusCode: 500,
      body: { error: 'Error', message: 'Invalid Credentials' } 
    }).as('getError');

    loginPage.login('Admin', 'adadeh123');

    cy.wait('@getError').its('response.statusCode').should('eq', 500);
    loginPage.verifyErrorMessage('Invalid credentials');
  });

  // TC-LOG-004: Mock Unexpected Error during API call to shortcuts
  it('TC-LOG-004: Mock Unexpected Error during API call to shortcuts', () => {
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts', {
      statusCode: 500,
      body: { error: 'Error', message: 'Unexpected Error!' } 
    }).as('getUnexpectedError');

    loginPage.login('Admin', 'admin123');

    cy.wait('@getUnexpectedError').its('response.statusCode').should('eq', 500);
    loginPage.verifyDashboardPage();
  });

  // TC-LOG-005: Mock unexpected server error during action summary API call after login
  it('TC-LOG-005: Mock unexpected server error during action summary API call after login', () => {
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary', {
      statusCode: 500,
      body: { error: 'Error', message: 'Unexpected Error!' } 
    }).as('getUnexpectedError');

    loginPage.login('Admin', 'admin123');

    cy.wait('@getUnexpectedError').its('response.statusCode').should('eq', 500);
    loginPage.verifyDashboardPage();
  });

  // TC-LOG-006: Mock unexpected server error during subunit API call after login
  it('TC-LOG-006: Mock unexpected server error during subunit API call after login', () => {
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/subunit', {
      statusCode: 500,
      body: { error: 'Error', message: 'Unexpected Error!' } 
    }).as('getUnexpectedError');

    loginPage.login('Admin', 'admin123');

    cy.wait('@getUnexpectedError').its('response.statusCode').should('eq', 500);
    loginPage.verifyDashboardPage();
  });

  // TC-LOG-007: Verify case sensitivity when entering username
  it('TC-LOG-007: Verify case sensitivity when entering username (Case-insensitive behavior)', () => {
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginReq');

    loginPage.login('aDmin', 'admin123');

    cy.wait('@loginReq').its('response.statusCode').should('eq', 302);
    cy.url().should('include', '/dashboard/index');
  });

  // TC-LOG-008: Verify case sensitivity when entering password
  it('TC-LOG-008: Verify case sensitivity when entering password', () => {
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginReq');

    loginPage.login('Admin', 'Admin123');

    cy.wait('@loginReq').its('response.statusCode').should('eq', 302);
    loginPage.verifyErrorMessage('Invalid credentials');
  });
});