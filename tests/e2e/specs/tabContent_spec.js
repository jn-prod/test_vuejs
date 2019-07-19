// https://docs.cypress.io/api/introduction/api.html
describe('Test TabContent', () => {
  it('Tab content is created', () => {
    cy.get('#content').should('have.length', 1);
  });
  it('Tab content contain link', () => {
    cy.get('#content a').should('have.length', 2);
  });
  it('Tab content contain image', () => {
    cy.get('#content img').should('have.length', 1);
  });
  it('Tab content contain description', () => {
    cy.get('#content p').should('have.length', 1);
  });
  it('Toogle active tab', () => {
    cy.get('#content p').as('intialContent')
    cy.get('.tab').eq(1).click()
    cy.get('#content p').should('not.eq', '@intialContent');
  });
});
