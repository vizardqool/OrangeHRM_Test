import LastProjectLogin from '../../support/LastProjectObjects/LastProjectLogin.js'
import LastProjectRecruitment from '../../support/LastProjectObjects/LastProjectRecruitment.js'
import LastProjectData from '../../fixtures/LastProjectData.json'

describe('Recruitment page automation using POM and assertion', () => {
    beforeEach(() =>{
        LastProjectLogin.gotoPage();
        LastProjectLogin.getUsername(LastProjectData.validUsername);
        LastProjectLogin.getPassword(LastProjectData.validPassword);
        LastProjectLogin.clickLoginButton();
        LastProjectRecruitment.interceptRecruitmentPage();
        LastProjectRecruitment.gotoRecruitment();
    })
    
    // Verify recruitment landing page
    it('RC-01 Verify recruitment landing page', () => {
        LastProjectRecruitment.verifyInterceptRecruitmentPage();
        LastProjectRecruitment.verifyRecruitmentUrl();
    })

    // Search job with active candidates
    it('RC-02 Search job with active candidates', () => {
        LastProjectRecruitment.interceptCandidates();
        LastProjectRecruitment.searchCandidatesbyJob(LastProjectData.activeCandidatesJob);
        LastProjectRecruitment.verifyInterceptCandidates();
        LastProjectRecruitment.verifyCandidatesbyJob(false,LastProjectData.activeCandidatesJob);
    })

    // Search job without candidates
    it('RC-03 Search job without candidates', () => {
        LastProjectRecruitment.interceptCandidates();
        LastProjectRecruitment.searchCandidatesbyJob(LastProjectData.emptyCandidatesJob);
        LastProjectRecruitment.verifyInterceptCandidates();
        LastProjectRecruitment.verifyCandidatesbyJob(true);
    })

    // Search vacancy with active candidates
    it('RC-04 Search vacancy with active candidates', () => {
        LastProjectRecruitment.interceptCandidates();
        LastProjectRecruitment.searchCandidatesbyVacancy(LastProjectData.activeCandidatesVacancy);
        LastProjectRecruitment.verifyInterceptCandidates();
        LastProjectRecruitment.verifyCandidatesbyVacancy(false,LastProjectData.activeCandidatesVacancy);
    })

    // Search vacancy without candidates
    it('RC-05 Search vacancy without candidates', () => {
        LastProjectRecruitment.interceptCandidates();
        LastProjectRecruitment.searchCandidatesbyVacancy(LastProjectData.emptyCandidatesVacancy);
        LastProjectRecruitment.verifyInterceptCandidates();
        LastProjectRecruitment.verifyCandidatesbyVacancy(true);
    })

    // Search candidates by name
    it('RC-06 Search candidates by name', () => {
        LastProjectRecruitment.interceptCandidates();
        LastProjectRecruitment.searchCandidatesbyName(LastProjectData.activeCandidatesName);
        LastProjectRecruitment.verifyInterceptCandidates();
        LastProjectRecruitment.verifyCandidatesbyName(false,LastProjectData.activeCandidatesName)
    })
    // Search non-candidates by name
    it('RC-07 Search non-candidates by name', () => {
        LastProjectRecruitment.interceptCandidates();
        LastProjectRecruitment.searchCandidatesbyName(LastProjectData.nonCandidatesName,false);
        LastProjectRecruitment.verifyInterceptCandidates();
        LastProjectRecruitment.verifyCandidatesbyName(true)
    })

    // Search specific candidates by job, vacancy, and name
    it('RC-08 Search specific candidates by job, vacancy, and name', () => {
        LastProjectRecruitment.interceptCandidates();
        LastProjectRecruitment.searchCandidatesbyNameJobandVacancy(
            LastProjectData.activeCandidatesJob,
            LastProjectData.activeCandidatesVacancy,
            LastProjectData.activeCandidatesName
        );
        LastProjectRecruitment.verifyInterceptCandidates();
        LastProjectRecruitment.verifyCandidatesbyNameJobandVacancy(
            LastProjectData.activeCandidatesJob,
            LastProjectData.activeCandidatesVacancy,
            LastProjectData.activeCandidatesName
        );
    })
})