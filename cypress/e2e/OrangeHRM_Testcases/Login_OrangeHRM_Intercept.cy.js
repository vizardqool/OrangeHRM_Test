describe('OrangeHRM - Login Module Test Cases', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  // TC-LOG-001: Verify URL login home landing page
  it('TC-LOG-001: Verify URL login home landing page', () => {
    cy.url().should('include', '/auth/login');
  });

  // TC-LOG-002: Verify page title
  it('TC-LOG-002: Verify page title', () => {
    cy.title().should('eq', 'OrangeHRM');
  });

  // TC-LOG-003: Verify Company Logo
  it('TC-LOG-003: Verify Company Logo', () => {
    cy.get('.orangehrm-login-branding img')
      .should('be.visible')
      .and('have.attr', 'alt', 'company-branding');
  });

  // TC-LOG-004: Verify login with valid credential
  it('TC-LOG-004: Verify login with valid credential', () => {
    // Setup intercept before submitting
    //cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginReq');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');

    //cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary');
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts', {
     statusCode: 500,
      body: {
      error: 'Error',
      message: 'Unexpected Error!'
      } 
    }).as('getError');
    
    cy.get('button[type="submit"]').click();

    // Wait and assert on network response
    //cy.wait('@actionSummary').its('response.statusCode').should('eq', 200);
    cy.wait('@getError').its('response.statusCode').should('eq', 500);
    
    //cy.url().should('include', '/dashboard/index');
    //cy.get('.oxd-topbar-header-title').should('contain.text', 'Dashboard');
  });

  // TC-LOG-005: Verify login with invalid username
  it('TC-LOG-005: Verify login with invalid username', () => {
    // Setup intercept before submitting
    //cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginReq');

    cy.get('input[name="username"]').type('InvalidUser');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages', {
     statusCode: 500,
      body: {
      error: 'Error',
      message: 'Unexpected Error!'
      } 
    }).as('getError');

    // Wait and assert on network response
    //cy.wait('@loginReq').its('response.statusCode').should('eq', 302);
    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('have.text', 'Invalid credentials');
  });

  // TC-LOG-006: Verify login with invalid password
  it('TC-LOG-006: Verify login with invalid password', () => {
    // Setup intercept before submitting
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginReq');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('adadeh123');
    cy.get('button[type="submit"]').click();

    // Wait and assert on network response
    cy.wait('@loginReq').its('response.statusCode').should('eq', 302);
    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('have.text', 'Invalid credentials');
  });

  // TC-LOG-007: Verify login with blank username and password
  it('TC-LOG-007: Verify login with blank username and password', () => {
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-group')
      .eq(0)
      .find('.oxd-input-field-error-message')
      .should('have.text', 'Required');

    cy.get('.oxd-input-group')
      .eq(1)
      .find('.oxd-input-field-error-message')
      .should('have.text', 'Required');
  });

  // TC-LOG-008: Verify login with blank username only
  it('TC-LOG-008: Verify login with blank username only', () => {
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-group')
      .eq(0)
      .find('.oxd-input-field-error-message')
      .should('have.text', 'Required');
  });

  // TC-LOG-009: Verify login with blank password only
  it('TC-LOG-009: Verify login with blank password only', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-group')
      .eq(1)
      .find('.oxd-input-field-error-message')
      .should('have.text', 'Required');
  });

  // TC-LOG-010: Verify case sensitivity when entering username
  it('TC-LOG-010: Verify case sensitivity when entering username (Case-insensitive behavior)', () => {
    // Setup intercept before submitting
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginReq');
    
    cy.get('input[name="username"]').type('aDmin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Wait and assert on network response
    cy.wait('@loginReq').its('response.statusCode').should('eq', 302);
    cy.url().should('include', '/dashboard/index');
  });

  // TC-LOG-011: Verify case sensitivity when entering password
  it('TC-LOG-011: Verify case sensitivity when entering password', () => {
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

  // TC-LOG-012: Verify password masking
  it('TC-LOG-012: Verify password masking', () => {
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

});