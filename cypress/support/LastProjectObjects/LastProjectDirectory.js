class LastProjectDirectory{

    // Elements
    gotoDirectory(){
        cy.get('h6').should('be.visible').and('contains.text','Dashboard')
        cy.get('a[href*="/viewDirectory"]').click()
    }
    verifyDirectoryMenuandURL(){
        cy.get('h6').should('be.visible').and('contains.text','Directory')
        cy.url().should('include','/viewDirectory')
    }
    verfiyDirectorySidePanel(){
        cy.get('a[href*="/viewDirectory"]').should('be.visible')
    }
    searchEmployeebyName(employeeName,isExist = true){
        cy.get('input[placeholder="Type for hints..."]',).should('be.visible').type(employeeName)
        cy.get('.oxd-autocomplete-option').should('be.visible').and('contain','Searching')
        cy.get('.oxd-autocomplete-option',).should('not.contain','Searching')
        if(isExist){
            cy.get('.oxd-autocomplete-option',).contains(employeeName).click()
        } else {
            cy.get('.oxd-autocomplete-option',).contains('No Records Found').click()
        }
        cy.get('button[type="submit"]').click()
    } 
    verifyEmployeebyName(isEmpty = false,foundEmployee){
        if(isEmpty){
            cy.get('.oxd-input-field-error-message').should('be.visible').contains('Invalid')
        } else {
            cy.get('.orangehrm-horizontal-padding.orangehrm-vertical-padding').should('be.visible').and('contain.text','Found')
            cy.get('.orangehrm-container').should('be.visible').and('contain.text',foundEmployee)
        }
    }
    searchEmployeebyJob(employeebyJob){
        cy.get('.oxd-select-text',).eq(0).should('be.visible').click()
        cy.get('div[role="listbox"]').contains(employeebyJob).should('be.visible').click()
        cy.get('button[type="submit"]').click()
    }
    verifyEmployeebyJob(isEmpty = false,resultEmployeebyJob){
        if (isEmpty) {
            cy.get('.orangehrm-horizontal-padding.orangehrm-vertical-padding').should('be.visible').and('contain.text','No Records Found')
        } else {
            cy.get('.orangehrm-horizontal-padding.orangehrm-vertical-padding').should('be.visible').and('contain.text','Found')
            cy.get('.orangehrm-container').should('be.visible').and('contain.text',resultEmployeebyJob)
        }
    }
    searchEmployeebyLocation(employeebyLocation){
        cy.get('.oxd-select-text').eq(1).click()
        cy.get('div[role="listbox"]').contains(employeebyLocation).should('be.visible').click()
        cy.get('button[type="submit"]').click()
    }
    verifyEmployeebyLocation(isEmpty=false,resultEmployeebyLocation){
        if(isEmpty){
            cy.get('.orangehrm-horizontal-padding.orangehrm-vertical-padding').should('be.visible').and('contain.text','No Records Found')
        } else {
            cy.get('.orangehrm-horizontal-padding.orangehrm-vertical-padding').should('be.visible').and('contain.text','Found')
            cy.get('.orangehrm-container').should('be.visible').and('contain.text',resultEmployeebyLocation)
        }
    }
    searchEmployeebyNameJobandLocation(employeeName,employeeJob,employeeLocation){
        // Search by name
        cy.get('input[placeholder="Type for hints..."]',).should('be.visible').type(employeeName)
        cy.get('.oxd-autocomplete-option').should('be.visible').and('contain','Searching')
        cy.get('.oxd-autocomplete-option',).should('not.contain','Searching')
        cy.get('.oxd-autocomplete-option',).contains(employeeName).click()
        
        // Search by job title
        cy.get('.oxd-select-text',).eq(0).should('be.visible').click()
        cy.get('div[role="listbox"]').contains(employeeJob).click()

         // Search by location
        cy.get('.oxd-select-text').eq(1).click()
        cy.get('div[role="listbox"]').contains(employeeLocation).click()

        // Search combination
        cy.get('button[type="submit"]').click() 
    }
    verifyEmployeebyNameJobandLocation(foundEmployee,employeeJob,employeeLocation){
        
        // Verification combination
        cy.get('.orangehrm-container').should('be.visible').and('contain.text',foundEmployee)
        cy.get('.orangehrm-container').should('be.visible').and('contain.text',employeeJob)
        cy.get('.orangehrm-container').should('be.visible').and('contain.text',employeeLocation)
    }
    
    // API intercepts & verify
    interceptDirectoryPage(){
        cy.intercept('GET','/web/index.php/directory/viewDirectory').as('viewDirectory')
    }
    verifyInterceptDirectoryPage(){
        cy.wait('@viewDirectory').its('response.statusCode').should('equal',200)
    } 
    interceptEmployeeName(){
        cy.intercept('GET', '/web/index.php/api/v2/directory/employees*').as('employees')
    }
    verifyInterceptEmployeeSearchbyName(){
        cy.wait('@employees').its('response.statusCode').should('equal',200)
        cy.get('@employees.all').then((requests) => {
          expect(requests.length).to.eq(3)
        })
    }
    verifyInterceptEmployeeSearchbyOthers(){
        cy.wait('@employees').its('response.statusCode').should('equal',200)
    }
}
export default new LastProjectDirectory ();