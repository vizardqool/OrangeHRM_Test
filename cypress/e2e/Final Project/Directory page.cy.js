import LastProjectLogin from '../../support/LastProjectObjects/LastProjectLogin.js'
import LastProjectDirectory from '../../support/LastProjectObjects/LastProjectDirectory.js'
import LastProjectData from '../../fixtures/LastProjectData.json'

describe('Directory page automation using POM and assertion', () => {

    // Login into OrangeHRM
    beforeEach(() =>{
        LastProjectLogin.gotoPage();
        LastProjectLogin.getUsername(LastProjectData.validUsername);
        LastProjectLogin.getPassword(LastProjectData.validPassword);
        LastProjectLogin.clickLoginButton();
        LastProjectDirectory.interceptDirectoryPage();
        LastProjectDirectory.gotoDirectory();
    })

    // Verify directory landing page
    it('DC-01 Verify directory landing page', () => {
        LastProjectDirectory.verifyInterceptDirectoryPage();
        LastProjectDirectory.verifyDirectoryMenuandURL();
        LastProjectDirectory.verfiyDirectorySidePanel();
    })

    // Search existing employee using employee first name
    it('DC-02 Search existing employee using employee first name', () => {
        LastProjectDirectory.interceptEmployeeName();
        LastProjectDirectory.searchEmployeebyName(LastProjectData.employeeFirstName);
        LastProjectDirectory.verifyInterceptEmployeeSearchbyName();
        LastProjectDirectory.verifyEmployeebyName(false,LastProjectData.employeeFirstName);        
    })

    // Search existing employee using employee middle name
    it('DC-03 Search existing employee using employee middle name', () => {
        LastProjectDirectory.interceptEmployeeName();
        LastProjectDirectory.searchEmployeebyName(LastProjectData.employeeMiddleName);
        LastProjectDirectory.verifyInterceptEmployeeSearchbyName();
        LastProjectDirectory.verifyEmployeebyName(false,LastProjectData.employeeMiddleName);
    })

    // Search existing employee using employee last name
    it('DC-04 Search existing employee using employee last name', () => {
        LastProjectDirectory.interceptEmployeeName();
        LastProjectDirectory.searchEmployeebyName(LastProjectData.employeeLastName);
        LastProjectDirectory.verifyInterceptEmployeeSearchbyName();
        LastProjectDirectory.verifyEmployeebyName(false,LastProjectData.employeeLastName);
    })
    
    // Search non-registered employee
    it('DC-05 Search non-registered employee', () => {
        LastProjectDirectory.interceptEmployeeName();
        LastProjectDirectory.searchEmployeebyName(LastProjectData.nonRegisteredEmployeeName,false);
        LastProjectDirectory.verifyInterceptEmployeeSearchbyOthers();
        LastProjectDirectory.verifyEmployeebyName(true);
    })

    // Search job with active employee
    it('DC-06 Search job with active employee', () => {
        LastProjectDirectory.interceptEmployeeName();
        LastProjectDirectory.searchEmployeebyJob(LastProjectData.activeEmployeeJob);
        LastProjectDirectory.verifyInterceptEmployeeSearchbyOthers();
        LastProjectDirectory.verifyEmployeebyJob(false,LastProjectData.activeEmployeeJob);
    })

    // Search job without employee
    it('DC-07 Search job without employee', () => {
        LastProjectDirectory.interceptEmployeeName();
        LastProjectDirectory.searchEmployeebyJob(LastProjectData.emptyEmployeeJob);
        LastProjectDirectory.verifyInterceptEmployeeSearchbyOthers();
        LastProjectDirectory.verifyEmployeebyJob(true);
    })

    // Search location with active employee
    it('DC-08 Search location with active employee', () => {
        LastProjectDirectory.interceptEmployeeName();
        LastProjectDirectory.searchEmployeebyLocation(LastProjectData.activeEmployeeLocation);
        LastProjectDirectory.verifyInterceptEmployeeSearchbyOthers();
        LastProjectDirectory.verifyEmployeebyLocation(false,LastProjectData.activeEmployeeLocation);
    })
})