describe('HeaderControlPanel E2E Test', () => {
    beforeEach(() => {
        // Visit the page where HeaderControlPanel is rendered
        cy.visit('');

        // Stub the API request for saving compressed data and return a mock ID
        // cy.intercept('POST', '/api/saveSetup', { body: { id: 'mocked-id' } }).as('saveSetup');
    });

    it('should render HeaderControlPanel and interact with MapSelector', () => {
        // Check that the HeaderControlPanel and its elements render correctly
        cy.get('.header-container').should('be.visible');
        cy.get('.hamburger-btn').should('be.visible');
        cy.get('.map-selector-container').should('be.visible')
            .find('select').eq(0)
            .should('exist')
            .select(0)
            .should('have.value', 'Club House');

        cy.get('.map-selector-container')
            .find('select').eq(1)
            .should('exist')
            .select(1)
            .should('have.value', '1st Floor');

        cy.get('.map-selector-container')
            .find('select').eq(2)
            .should('exist')
            .select(2)
            .should('have.value', 'Gym and Bedroom');
    })

});
