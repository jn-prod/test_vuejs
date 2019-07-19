// https://docs.cypress.io/api/introduction/api.html
describe('Test App', () => {
  it('App is created', () => {
    cy.visit('/');
    cy.get('#app').should('have.length', 1);
  });
});
