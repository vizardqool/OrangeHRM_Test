describe('OrangeHRM - Directory Module Test Cases', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
  });

  // TC-DIR-001: Verify Directory menu visibility
  it('TC-DIR-001: Verify Directory menu visibility', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Directory').should('be.visible');
    //cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
  });

  // TC-DIR-002: Verify navigation to Directory page
  it('TC-DIR-002: Verify navigation to Directory page', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Directory').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
    cy.get('.oxd-topbar-header-title').should('contain.text', 'Directory');
  });

  // TC-DIR-003: Verify UI elements on the Directory page
  it('TC-DIR-003: Verify UI elements on the Directory page', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Directory').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
    cy.get('.oxd-table-filter').should('be.visible'); // Search filter container
    cy.get('button[type="reset"]').contains('Reset').should('be.visible');
    cy.get('button[type="submit"]').contains('Search').should('be.visible');
    cy.get('.orangehrm-container').should('be.visible'); // Records card list
  });

  // TC-DIR-004: Verify Employee Name search with valid full name
  it('TC-DIR-004: Verify Employee Name search with valid full name', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Directory').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
    cy.get('input[placeholder="Type for hints..."]').type('Peter Mac Anderson');
    cy.get('.oxd-autocomplete-dropdown').contains('Peter Mac Anderson').click();
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-sheet').should('exist');
  });

  // TC-DIR-005: Verify Employee Name search with partial name
  it('TC-DIR-005: Verify Employee Name search with partial name', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Directory').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
    cy.get('input[placeholder="Type for hints..."]').type('Peter');
    cy.get('.oxd-autocomplete-dropdown').first().click();
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-sheet').should('exist');
  });

  // TC-DIR-006: Verify Employee Name search with invalid data
  it('TC-DIR-006: Verify Employee Name search with invalid data', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Directory').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
    cy.get('input[placeholder="Type for hints..."]').type('Abc123');
    cy.get('.oxd-autocomplete-dropdown').first().click();
    cy.get('.oxd-input-field-error-message')
      .should('be.visible')
      .and('have.text', 'Invalid');
    //cy.get('button[type="submit"]').should('be.disabled');
  });

  // TC-DIR-007: Verify Job Title dropdown options
  it('TC-DIR-007: Verify Job Title dropdown options', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Directory').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
    cy.contains('label', 'Job Title').parents('.oxd-input-group').find('.oxd-select-text').click();
    cy.get('.oxd-select-dropdown').children().should('have.length.gt', 1);
  });

  // TC-DIR-008: Verify search by selecting a specific Job Title
  it('TC-DIR-008: Verify search by selecting a specific Job Title', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Directory').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
    cy.contains('label', 'Job Title').parents('.oxd-input-group').find('.oxd-select-text').click();
    //cy.selectDropdownOption('Job Title', 'QA Engineer');
    //cy.get('.dropdown-options').contains('QA Engineer').click();
    cy.get('.oxd-select-dropdown').contains('QA Engineer').click();
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-sheet').should('be.visible');
  });

  // TC-DIR-009: Verify Location dropdown options
  it('TC-DIR-009: Verify Location dropdown options', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Directory').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
    cy.contains('label', 'Location').parents('.oxd-input-group').find('.oxd-select-text').click();
    cy.get('.oxd-select-dropdown').children().should('have.length.gt', 1);
  });

  // TC-DIR-010: Verify search by selecting a specific Location
  it('TC-DIR-010: Verify search by selecting a specific Location', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Directory').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
    cy.contains('label', 'Location').parents('.oxd-input-group').find('.oxd-select-text').click();
    cy.get('.oxd-select-dropdown').contains('Texas R&D').click();
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-sheet').should('be.visible');
  });

  // TC-DIR-011: Verify combined search filters (Name + Job Title + Location)
  it('TC-DIR-011: Verify combined search filters', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Directory').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
    cy.get('input[placeholder="Type for hints..."]').type('Peter');
    cy.get('.oxd-autocomplete-dropdown').first().click();
    cy.contains('label', 'Job Title').parents('.oxd-input-group').find('.oxd-select-text').click();
    cy.get('.oxd-select-dropdown').contains('QA Engineer').click();
    cy.contains('label', 'Location').parents('.oxd-input-group').find('.oxd-select-text').click();
    cy.get('.oxd-select-dropdown').contains('Texas R&D').click();
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-grid-4').should('be.visible');
  });

  // TC-DIR-012: Verify Reset button functionality
  it('TC-DIR-012: Verify Reset button functionality', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Directory').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
    cy.get('input[placeholder="Type for hints..."]').type('Peter');
    cy.get('.oxd-autocomplete-dropdown').first().click();
    cy.get('button[type="reset"]').contains('Reset').click();
    cy.get('input[placeholder="Type for hints..."]').should('have.value', '');
  });

});