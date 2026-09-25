class LoginPage {
  // Selectors
  elements = {
    usernameInput: () => cy.get('input[name="username"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    loginButton: () => cy.get('button[type="submit"]'),
    alertMessage: () => cy.get('.oxd-alert-content-text'),
    dashboardHeader: () => cy.get('.oxd-topbar-header-title')
  };

  // Actions
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  typeUsername(username) {
    this.elements.usernameInput().clear().type(username);
  }

  typePassword(password) {
    this.elements.passwordInput().clear().type(password);
  }

  clickLogin() {
    this.elements.loginButton().click();
  }

  login(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
  }

  // Assertions
  verifyDashboardPage() {
    cy.url().should('include', '/dashboard/index');
    this.elements.dashboardHeader().should('contain.text', 'Dashboard');
  }

  verifyErrorMessage(expectedText) {
    this.elements.alertMessage()
      .should('be.visible')
      .and('have.text', expectedText);
  }
}

export default new LoginPage();