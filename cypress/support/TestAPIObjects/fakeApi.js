const baseURL = 'https://api.escuelajs.co';

class fakeAPI {
    
    savedId = null;
    savedName = null;
    savedSlug = null;
    updatedName = null;
    updatedSlug = null;

    //Elements
    allCategory(){
        cy.request('GET',`${baseURL}/api/v1/categories`)
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
        });
    }    
    singleCategoryId(id){
        cy.request('GET',`${baseURL}/api/v1/categories/${id}`)
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.eq(id)
        });
    }
    singleCategorySlug(slug){
        cy.request('GET',`${baseURL}/api/v1/categories/slug/${slug}`)
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.slug).to.eq(slug)
        });
    }
    productCategory(id){
        cy.request('GET',`${baseURL}/api/v1/categories/${id}/products`)
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body[0].category.id).to.eq(id)
        });
    }
    createCategory(categoryData){
        cy.request({
            method: 'POST',
            url: `${baseURL}/api/v1/categories`,
            body: categoryData
        })
        .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('id')
            expect(response.body.name).to.eq(categoryData.name)

            //Save info for created category
            this.savedId = response.body.id
            this.savedName = response.body.name
            this.savedSlug = response.body.slug
        });
    }
    verifyCreatedCategorybyId(){
        expect(this.savedId).to.not.be.null;
        expect(this.savedName).to.not.be.null;

        cy.request('GET',`${baseURL}/api/v1/categories/${this.savedId}`)
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.eq(this.savedId)
            expect(response.body.name).to.eq(this.savedName)
        });
    }
    verifyCreatedCategorybySlug(){
        expect(this.savedName).to.not.be.null;
        expect(this.savedSlug).to.not.be.null;

        cy.request('GET',`${baseURL}/api/v1/categories/slug/${this.savedSlug}`)
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eq(this.savedName)
            expect(response.body.slug).to.eq(this.savedSlug)
        });
    }
    updateCategory(changeCategory){
        cy.request({
            method: 'PUT',
            url: `${baseURL}/api/v1/categories/${this.savedId}`,
            body: changeCategory
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id')
            expect(response.body.name).to.eq(changeCategory.name)

            //Save info for updated category
            this.updatedName = response.body.name
            this.updatedSlug = response.body.slug
        });
    }
    verifyUpdatedCategorybyId(){
        expect(this.savedId).to.not.be.null;
        expect(this.updatedName).to.not.be.null;

        cy.request('GET',`${baseURL}/api/v1/categories/${this.savedId}`)
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.eq(this.savedId)
            expect(response.body.name).to.eq(this.updatedName)
        });
    }
    verifyUpdatedCategorybySlug(){
        expect(this.updatedName).to.not.be.null;
        expect(this.updatedSlug).to.not.be.null;

        cy.request('GET',`${baseURL}/api/v1/categories/slug/${this.updatedSlug}`)
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eq(this.updatedName)
            expect(response.body.slug).to.eq(this.updatedSlug)
        });
    }
    deleteCreatedCategory(deleteCategory){
        cy.request({
            method: 'DELETE',
            url: `${baseURL}/api/v1/categories/${this.savedId}`,
            body: deleteCategory
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.true
        });
    }
    verifyDeletedCategorybyId(){
        expect(this.savedId).to.not.be.null;
        expect(this.updatedName).to.not.be.null;

        cy.request({
            method: 'GET',
            url: `${baseURL}/api/v1/categories/${this.savedId}`,
            failOnStatusCode: false 
        })
        .then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.name).to.include('EntityNotFoundError')
        });
    }
    verifyDeletedCategorybySlug(){
        expect(this.updatedName).to.not.be.null;
        expect(this.updatedSlug).to.not.be.null;

        cy.request({
            mehtod: 'GET',
            url: `${baseURL}/api/v1/categories/slug/${this.updatedSlug}`,
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.name).to.include('EntityNotFoundError')
        });
    }    
}
export default new fakeAPI()