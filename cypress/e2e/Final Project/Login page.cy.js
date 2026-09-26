import LastProjectLogin from '../../support/LastProjectObjects/LastProjectLogin.js'
import LastProjectData from '../../fixtures/LastProjectData.json'

describe('Login page automation using POM and assertion', () => {

    beforeEach(() => {

        // Intercept landing page API
        LastProjectLogin.interceptLandingPage();

        // Visit OrangeHRM login page
        LastProjectLogin.gotoPage();
        });
        
    // Verify the url of the OrangeHRM login page
    it('LP-01 Verify the url of the OrangeHRM login page', () => {
        LastProjectLogin.verifyInterceptLandingPage();
        LastProjectLogin.getLink();
    });

    // Verify UI elements on the OrangeHRM login page
    it('LP-02 Verify UI elements on the OrangeHRM login page', () => {
        LastProjectLogin.getFavicon();
        LastProjectLogin.getBranding();
        LastProjectLogin.getLogo();
    })

    // Verify Forgot your password? button hyperlink
    it('LP-03 Verify Forgot your password? button hyperlink', () => {
        LastProjectLogin.interceptForgotPassword();
        LastProjectLogin.clickForgotPasswordButton();
        LastProjectLogin.verifyInterceptForgotPassword();
        LastProjectLogin.getForgotPasswordLink();
    })

    // Verify mandatory field validation in the login page
    it('LP-04 Verify mandatory field validation in the login page', () => {
        LastProjectLogin.clickLoginButton();
        LastProjectLogin.getUsernameErrorMessage();
        LastProjectLogin.getPasswordErrorMessage();
    })

    //Verify login with registered password and empty username
    it('LP-05 Verify login with registered password and empty username', () => {
        LastProjectLogin.getPassword(LastProjectData.validPassword);
        LastProjectLogin.clickLoginButton();
        LastProjectLogin.getUsernameErrorMessage();
    })

    // Verify login with registered username and empty password
    it('LP-06 Verify login with registered username and empty password', () => {
        LastProjectLogin.getUsername(LastProjectData.validUsername);
        LastProjectLogin.clickLoginButton();
        LastProjectLogin.getPasswordErrorMessage();
    })

    // Verify login using non-registered account
    it('LP-07 Verify login using non-registered account', () => {
        LastProjectLogin.interceptLogin();
        LastProjectLogin.getUsername(LastProjectData.invalidUsername);
        LastProjectLogin.getPassword(LastProjectData.invalidPassword);
        LastProjectLogin.clickLoginButton();
        LastProjectLogin.verifyInterceptLogin();
        LastProjectLogin.getInvalidCredentialsErrorMessage();
    })

    // Verify login using registered username and wrong password
    it('LP-08 Verify login using registered username and wrong password', () => {
        LastProjectLogin.interceptLogin();
        LastProjectLogin.getUsername(LastProjectData.validUsername);
        LastProjectLogin.getPassword(LastProjectData.invalidPassword);
        LastProjectLogin.clickLoginButton();
        LastProjectLogin.verifyInterceptLogin();
        LastProjectLogin.getInvalidCredentialsErrorMessage();
    })
})