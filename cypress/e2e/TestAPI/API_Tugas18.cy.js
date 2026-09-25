import fakeApi from '../../support/TestAPIObjects/fakeApi.js';
import apiData from '../../fixtures/TestAPIData.json';

describe('API Automation using Cypress', () => {

    // Verify existing category
    it('TC-01 Verify existing category', () => {
        fakeApi.allCategory();
    })

    // Verify existing category using id
    it('TC-02 Verify existing category using id', () => {
        fakeApi.singleCategoryId(apiData.id);
    })

    //Verify existing category using slug
    it('TC-03 Verify existing category using slug', () => {
        fakeApi.singleCategorySlug(apiData.slug);
    })

    //Verify all product under one category using id
    it('TC-04 Verify all product under one category using id', () => {
        fakeApi.productCategory(apiData.id);
    })

    //Verify new category creation
    it('TC-05 Verify new category creation', () => {
        fakeApi.createCategory(apiData.newCategory);
    })

    //Verify created category by id
    it('TC-06 Verify created category by id', () => {
        fakeApi.verifyCreatedCategorybyId();
    })

    //Verify created category by slug
    it('TC-07 Verify created category by slug', () => {
        fakeApi.verifyCreatedCategorybySlug();
    })

    //Verify updating category
    it('TC-08 Verify updating category', () => {
        fakeApi.updateCategory(apiData.updateCategory);
    })
    //Verify updated category by id
    it('TC-09 Verify updated category by id', () => {
        fakeApi.verifyUpdatedCategorybyId();
    })

    //Verify updated category by slug
    it('TC-10 Verify updated category by slug', () => {
        fakeApi.verifyUpdatedCategorybySlug();
    })

    //Verify deleting category
    it('TC-11 Verify deleting category', () => {
        fakeApi.deleteCreatedCategory();
    })

    //Verify deleted category by id
    it('TC-12 Verify deleted category by id', () => {
        fakeApi.verifyDeletedCategorybyId();
    })

    //Verify deleted category by slug
    it('TC-13 Verify deleted category by slug', () => {
        fakeApi.verifyDeletedCategorybySlug();
    })
})