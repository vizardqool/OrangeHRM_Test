describe('OrangeHRM - Login Module Test Cases', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  // TC-LOG-001: Verify login with valid credential
  it('TC-LOG-001: Verify login with valid credential', () => {
    // Setup intercept before submitting
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginReq');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');

    cy.get('button[type="submit"]').click();

    // Wait and assert on network response
    cy.wait('@loginReq').its('response.statusCode').should('eq', 302);
    
    cy.url().should('include', '/dashboard/index');
    cy.get('.oxd-topbar-header-title').should('contain.text', 'Dashboard');
  });

  // TC-LOG-002: Verify login with invalid username
  it('TC-LOG-002: Verify login with invalid username', () => {

    cy.get('input[name="username"]').type('InvalidUser');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Setup intercept for the GET request after login attempt for invalid username
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages', {
     statusCode: 500,
      body: {
      error: 'Error',
      message: 'Invalid Credentials'
      } 
    }).as('getError');

    // Wait and assert on network response
    cy.wait('@getError').its('response.statusCode').should('eq', 500);

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('have.text', 'Invalid credentials');
  });

  // TC-LOG-003: Verify login with invalid password
  it('TC-LOG-003: Verify login with invalid password', () => {

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('adadeh123');
    cy.get('button[type="submit"]').click();

    // Setup intercept for the GET request after login attempt for invalid password
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages', {
     statusCode: 500,
      body: {
      error: 'Error',
      message: 'Invalid Credentials'
      } 
    }).as('getError');

    // Wait and assert on network response
    cy.wait('@getError').its('response.statusCode').should('eq', 500);

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('have.text', 'Invalid credentials');
  });

  // TC-LOG-004: Mock Unexpected Error during API call to shortcuts
  it('TC-LOG-004: Mock Unexpected Error during API call to shortcuts', () => {

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');

    //Send unexpected error while login during API call to shortcuts
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts', {
     statusCode: 500,
      body: {
      error: 'Error',
      message: 'Unexpected Error!'
      } 
    }).as('getUnexpectedError');

    cy.get('button[type="submit"]').click();

    // Wait and assert on network response
    cy.wait('@getUnexpectedError').its('response.statusCode').should('eq', 500);
    
    cy.url().should('include', '/dashboard/index');
    cy.get('.oxd-topbar-header-title').should('contain.text', 'Dashboard');
  });

  // TC-LOG-005: Mock unexpected server error during action summary API call after login
  it('TC-LOG-005: Mock unexpected server error during action summary API call after login', () => {

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');

    // Send server error while login
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary', {
     statusCode: 500,
      body: {
      error: 'Error',
      message: 'Unexpected Error!'
      } 
    }).as('getUnexpectedError');

    cy.get('button[type="submit"]').click();

    // Wait and assert on network response
    //cy.wait('@getError').its('response.statusCode').should('eq', 500);
    cy.wait('@getUnexpectedError').its('response.statusCode').should('eq', 500);
    
    cy.url().should('include', '/dashboard/index');
    cy.get('.oxd-topbar-header-title').should('contain.text', 'Dashboard');
  });

  // TC-LOG-006: Mock unexpected server error during subunit API call after login
  it('TC-LOG-006: Mock unexpected server error during subunit API call after login', () => {

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');

    // Send server error while login during API call to subunit
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/subunit', {
     statusCode: 500,
      body: {
      error: 'Error',
      message: 'Unexpected Error!'
      } 
    }).as('getUnexpectedError');

    cy.get('button[type="submit"]').click();

    // Wait and assert on network response
    cy.wait('@getUnexpectedError').its('response.statusCode').should('eq', 500);
    
    cy.url().should('include', '/dashboard/index');
    cy.get('.oxd-topbar-header-title').should('contain.text', 'Dashboard');
  });

  // TC-LOG-007: Verify case sensitivity when entering username
  it('TC-LOG-007: Verify case sensitivity when entering username (Case-insensitive behavior)', () => {
    // Setup intercept before submitting
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginReq');
    
    cy.get('input[name="username"]').type('aDmin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Wait and assert on network response
    cy.wait('@loginReq').its('response.statusCode').should('eq', 302);
    cy.url().should('include', '/dashboard/index');
  });

  // TC-LOG-008: Verify case sensitivity when entering password
  it('TC-LOG-008: Verify case sensitivity when entering password', () => {
    // Setup intercept before submitting
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginReq');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('Admin123');
    cy.get('button[type="submit"]').click();

    // Wait and assert on network response
    cy.wait('@loginReq').its('response.statusCode').should('eq', 302);
    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('have.text', 'Invalid credentials');
  });
})