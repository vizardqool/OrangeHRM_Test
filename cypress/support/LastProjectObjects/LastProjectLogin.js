class LastProjectLogin {
    // Elements
    gotoPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }    
    getLink() {
        cy.get('h5').should('be.visible').and('contain.text','Login')
        cy.url().should('include', '/auth/login') 
    }
    getFavicon() {
        cy.get('link[rel="icon"]').should('have.attr', 'href').and('include', 'favicon.ico')
    }
    getBranding() {
        cy.get('.orangehrm-login-branding').should('be.visible')
    }
    getLogo() {
        cy.get('.orangehrm-login-logo').should('be.visible')
    }
    clickForgotPasswordButton() {
        cy.get('.orangehrm-login-forgot-header').should('be.visible').click()
    }
    getForgotPasswordLink() {
        cy.get('h6').should('be.visible').and('contain.text','Reset Password')
        cy.url().should('contain', '/requestPassword')
    }
    getUsername(username) {
        cy.get('input[name="username"]').should('be.visible').type(username)
    }
    getPassword(password) {
        cy.get('input[name="password"]').should('be.visible').type(password)
    }
    clickLoginButton() {
        cy.get('button[type="submit"]').click()
    }
    getUsernameErrorMessage() {
        cy.get('.oxd-input-group')
            .contains('Username')
            .parents('.oxd-input-group')
            .find('.oxd-input-field-error-message')
            .should('be.visible')
            .and('have.text', 'Required')
    }
    getPasswordErrorMessage() {
        cy.get('.oxd-input-group')
            .contains('Password')
            .parents('.oxd-input-group')
            .find('.oxd-input-field-error-message')
            .should('be.visible')
            .and('have.text', 'Required')
    }
    getInvalidCredentialsErrorMessage() {
        cy.get('.oxd-alert-content').should('be.visible').and('have.text', 'Invalid credentials')
    }
    getDashboardUrl() {
        cy.get('h6').should('be.visible').and('contain.text','Dashboard')
        cy.url().should('include', '/dashboard')
    }

    // API intercepts & verify
    interceptLandingPage(){
        cy.intercept('GET', '/web/index.php/core/i18n/messages').as('messages')
    }
    verifyInterceptLandingPage(){
        cy.wait('@messages').its('response.statusCode').should('equal',200)
    }
    interceptForgotPassword(){
        cy.intercept('GET', '**/requestPasswordResetCode').as('forgotPassword')
    }
    verifyInterceptForgotPassword(){
        cy.wait('@forgotPassword').its('response.statusCode').should('equal', 200)
        cy.get('@forgotPassword.all').then((requests) => {
          expect(requests.length).to.eq(1)
      })
    }
    interceptLogin(){
        cy.intercept('POST', '/web/index.php/auth/validate').as('validate')
    }
    verifyInterceptLogin(){
        cy.wait('@validate').its('response.statusCode').should('equal', 302)
    }
}
export default new LastProjectLogin()