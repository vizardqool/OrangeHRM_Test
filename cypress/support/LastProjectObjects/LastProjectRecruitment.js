class LastProjectRecruitment{
    // Elements
    gotoRecruitment(){
        cy.get('h6').should('be.visible').and('contain.text','Dashboard')
        cy.get('a[href*="/viewRecruitmentModule"]').click()
        cy.get('h6').should('be.visible').and('contain.text','Recruitment')
    }
    verifyRecruitmentUrl(){
        cy.url().should('include','/viewCandidates')
    }
    searchCandidatesbyJob(candidatesbyJob){
        cy.get('.oxd-select-text',).eq(0).should('be.visible').click()
        cy.get('div[role="listbox"]',).contains(candidatesbyJob).should('be.visible').click()
        cy.get('button[type="submit"]').click()
    }
    verifyCandidatesbyJob(isEmpty=false,activeCandidatesJob){
        if(isEmpty){
            cy.get('.orangehrm-horizontal-padding.orangehrm-vertical-padding').should('be.visible').and('contain.text','No Records Found')
        } else {
            cy.get('.orangehrm-horizontal-padding.orangehrm-vertical-padding').should('be.visible').and('contain.text','Found')
            cy.get('.orangehrm-container').should('be.visible').and('contain.text',activeCandidatesJob)
        } 
    }
    searchCandidatesbyVacancy(activeCandidatesVacancy){
        cy.get('.oxd-select-text').eq(1).should('be.visible').click()
        cy.get('div[role="listbox"]').contains(activeCandidatesVacancy).should('be.visible').click()
        cy.get('button[type="submit"]').click()
    }
    verifyCandidatesbyVacancy(isEmpty=false,activeCandidatesVacancy){
        if(isEmpty){
            cy.get('.orangehrm-horizontal-padding.orangehrm-vertical-padding').should('be.visible').and('contain.text','No Records Found')
        } else {
            cy.get('.orangehrm-horizontal-padding.orangehrm-vertical-padding').should('be.visible').and('contain.text','Found')
            cy.get('.orangehrm-container',).should('be.visible').and('contain.text',activeCandidatesVacancy)
        }
    }
    searchCandidatesbyName(candidatesName,isExist = true){
        cy.get('input[placeholder="Type for hints..."]',).should('be.visible').type(candidatesName)
        cy.get('.oxd-autocomplete-option').should('be.visible').and('contain','Searching')
        cy.get('.oxd-autocomplete-option',).should('not.contain','Searching')
        if(isExist){
            cy.get('.oxd-autocomplete-option',).contains(candidatesName).click()
        } else {
            cy.get('.oxd-autocomplete-option',).contains('No Records Found').click()
        }
        cy.get('button[type="submit"]').click()
    }
    verifyCandidatesbyName(isEmpty = false,foundCandidates){
        if(isEmpty){
            cy.get('.oxd-input-field-error-message').should('be.visible').contains('Invalid')
        } else {
            cy.get('span[class="oxd-text oxd-text--span"]').should('be.visible').and('contain.text','Found')
            cy.get('.oxd-table-card',).should('be.visible').and('contain.text',foundCandidates)
        }
    }
    searchCandidatesbyNameJobandVacancy(candidatesJob,candidatesVacancy,candidatesName){
        
        // Search by job title
        cy.get('.oxd-select-text').eq(0).should('be.visible').click()
        cy.get('div[role="listbox"]').contains(candidatesJob).click()

         // Search by vacancy
        cy.get('.oxd-select-text').eq(1).should('be.visible').click()
        cy.get('div[role="listbox"]').contains(candidatesVacancy).click()

        // Search by name
        cy.get('input[placeholder="Type for hints..."]',).should('be.visible').type(candidatesName)
        cy.get('.oxd-autocomplete-option').should('be.visible').and('contain','Searching')
        cy.get('.oxd-autocomplete-option',).should('not.contain','Searching')
        cy.get('.oxd-autocomplete-option',).contains(candidatesName).click()

        // Search combination
        cy.get('button[type="submit"]').click() 
    }
    verifyCandidatesbyNameJobandVacancy(foundCandidates,candidatesJob,candidatesVacancy){
        
        // Verification combination
        cy.get('.oxd-table-card').should('be.visible').and('contain.text',foundCandidates)
        cy.get('.oxd-table-card').should('be.visible').and('contain.text',candidatesJob)
        cy.get('.oxd-table-card').should('be.visible').and('contain.text',candidatesVacancy)
    }

    //API intercepts & verify
    interceptRecruitmentPage(){
        cy.intercept('GET','/web/index.php/recruitment/viewRecruitmentModule').as('viewRecruitmentModule')
    }
    verifyInterceptRecruitmentPage(){
        cy.wait('@viewRecruitmentModule').its('response.statusCode').should('equal',302)
    }
    interceptCandidates(){
        cy.intercept('GET', '/web/index.php/api/v2/recruitment/candidates*').as('candidates')
    }    
    verifyInterceptCandidates(){
        cy.wait('@candidates').its('response.statusCode').should('equal',200)
    }
}
export default new LastProjectRecruitment();