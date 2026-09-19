describe('OrangeHRM - Recruitment Module Test Cases', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
  });

  // TC-REC-001: Verify Recruitment menu visibility
  it('TC-REC-001: Verify Recruitment menu visibility', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Recruitment').should('be.visible');
  });

  // TC-REC-002: Verify Search Candidate by Candidate Name
  it('TC-REC-002: Verify Search Candidate by Candidate Name', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Recruitment').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
    cy.get('input[placeholder="Type for hints..."]').type('Alok');
    cy.get('.oxd-autocomplete-dropdown').first().click();
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-table-body').should('be.visible');
  });

  // TC-REC-003: Verify Search Candidate by Vacancy
  it('TC-REC-003: Verify Search Candidate by Vacancy', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Recruitment').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
    cy.contains('label', 'Vacancy').parents('.oxd-input-group').find('.oxd-select-text').click();
    cy.get('.oxd-select-dropdown').contains('Senior QA Lead').click();
    //cy.selectDropdownOption('Vacancy', 'Senior QA Lead');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-table-body').should('be.visible');
  });

  // TC-REC-004: Verify Search Candidate by Hiring Manager
  it('TC-REC-004: Verify Search Candidate by Hiring Manager', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Recruitment').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
    cy.contains('label', 'Hiring Manager').parents('.oxd-input-group').find('.oxd-select-text').click();
    cy.get('.oxd-select-dropdown').contains('Rahul Patil').click();
    cy.get('button[type="submit"]').click();
    //cy.get('.oxd-table-body').should('be.visible');
  });

  // TC-REC-005: Verify Search Candidate by Status
  it('TC-REC-005: Verify Search Candidate by Status', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Recruitment').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
    cy.contains('label', 'Status').parents('.oxd-input-group').find('.oxd-select-text').click();
    cy.get('.oxd-select-dropdown').contains('Shortlisted').click();
    //cy.selectDropdownOption('Status', 'Shortlisted');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-table-body').should('be.visible');
  });

  // TC-REC-006: Add a new Candidate with valid details
  it('TC-REC-006: Add a new Candidate with valid details', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Recruitment').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
    cy.get('.orangehrm-header-container > .oxd-button').click()
    cy.get('input[name="firstName"]').should('be.visible')
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate')
    cy.get('input[name="firstName"]').type('Ryo');
    cy.get('input[name="lastName"]').type('Mori');
    cy.get('.oxd-input-group').contains('label', 'Email').parents('.oxd-input-group').find('input').type('mori01@mail.com');
    cy.get('button[type="submit"]').click();
    // Verify successful creation and status
    //cy.get('.orangehrm-recruitment-status').should('contain.text', '');
  });

  // TC-REC-007: Validate mandatory fields on Add Candidate page
  it('TC-REC-007: Validate mandatory fields on Add Candidate page', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Recruitment').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
    cy.get('.orangehrm-header-container > .oxd-button').click()
    cy.get('input[name="firstName"]').should('be.visible')
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate')
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message').should('have.length.at.least', 3);
    cy.get('.oxd-input-field-error-message').first().should('have.text', 'Required');
  });

  // TC-REC-008: Verify Resume Upload functionality
  it('TC-REC-008: Verify Resume Upload functionality (.pdf / .docx)', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Recruitment').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
    cy.get('.orangehrm-header-container > .oxd-button').click()
    cy.get('input[name="firstName"]').should('be.visible')
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate')

    // Make sure cypress-file-upload is installed OR standard attachFile is used
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('Sample Resume Content'),
      fileName: 'Sample Resume.pdf',
      mimeType: 'application/pdf',
    }, { force: true });
    cy.get('.oxd-file-input-div').should('contain.text', 'Sample Resume.pdf');
  });

  // TC-REC-009: Verify invalid file format resume upload block
  it('TC-REC-009: Verify invalid file format resume upload block', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Recruitment').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
    cy.get('.orangehrm-header-container > .oxd-button').click()
    cy.get('input[name="firstName"]').should('be.visible')
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate')

    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('Binary content'),
      fileName: 'malicious.exe',
      mimeType: 'application/x-msdownload',
    }, { force: true });

    cy.get('.oxd-input-field-error-message').should('contain.text', 'File type not allowed');
  });

  // TC-REC-010: Verify shortlist a candidate
  it('TC-REC-010: Verify shortlist a candidate', () => {
    //cy.get('.oxd-sidepanel').contains('span', 'Recruitment').click();
    //cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
    //cy.get('.oxd-table-cell-actions button').first().click(); // Open first candidate view
    cy.get('.oxd-sidepanel').contains('span', 'Recruitment').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
    cy.get('.orangehrm-header-container > .oxd-button').click()
    cy.get('input[name="firstName"]').should('be.visible')
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate')
    cy.get('input[name="firstName"]').type('Ryo');
    cy.get('input[name="lastName"]').type('Mori');
    cy.get('.oxd-input-group').contains('label', 'Email').parents('.oxd-input-group').find('input').type('mori03@mail.com');
    cy.get('button[type="submit"]').click();
    cy.get('input[name="firstName"]').should('be.visible')
    cy.get('button').contains('Shortlist').click();
    //cy.get('textarea[placeholder="Type here"]').type('Shortlisting candidate for round 2');
    cy.get('.oxd-sidepanel button').first().click();
    cy.get('button.oxd-button--success').contains('Shortlist').click();
    cy.get('button[type="submit"]').click();
    cy.get('.orangehrm-recruitment-status').should('contain.text', 'Shortlisted');
  });

  // TC-REC-011: Verify candidate rejection
  it('TC-REC-011: Verify candidate rejection', () => {
    //cy.get('.oxd-sidepanel').contains('span', 'Recruitment').click();
    //cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
    cy.get('.oxd-sidepanel').contains('span', 'Recruitment').click();
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
    cy.get('.orangehrm-header-container > .oxd-button').click()
    cy.get('input[name="firstName"]').should('be.visible')
    cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate')
    cy.get('input[name="firstName"]').type('Ryo');
    cy.get('input[name="lastName"]').type('Mori');
    cy.get('.oxd-input-group').contains('label', 'Email').parents('.oxd-input-group').find('input').type('mori02@mail.com');
    cy.get('button[type="submit"]').click();
    cy.get('input[name="firstName"]').should('be.visible')
    //cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate/98')
    cy.get('.oxd-sidepanel button').first().click();
    cy.get('button.oxd-button--danger').contains('Reject').click();
    cy.get('button[type="submit"]').click();
    cy.get('.orangehrm-recruitment-status').should('contain.text', 'Rejected');
  });

  // TC-REC-012: Verify Search Vacancies by Job Title
  it('TC-REC-012: Verify Search Vacancies by Job Title', () => {
    cy.get('.oxd-sidepanel').contains('span', 'Recruitment').click();
    cy.contains('label', 'Vacancy').parents('.oxd-input-group').find('.oxd-select-text').click();
    cy.get('.oxd-select-dropdown').contains('Senior QA Lead').click();
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-table-body').should('be.visible');
  });

});