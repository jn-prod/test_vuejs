// https://docs.cypress.io/api/introduction/api.html
describe('Test TabsHeader', () => {
  it('Header contain three tabs', () => {
    cy.get('.tab').should('have.length', 3);
  });
  it('Header contain one active tab', () => {
    cy.get('.active').should('have.length', 1);
  });
  it('Toogle active tab', () => {
    cy.get('.tab').eq(2).click()
    cy.get('.active').should('have.length', 1);
  });
  it('Toogle dropdown initial position for mobile', () => {
    cy.viewport('iphone-6')
    cy.get('.tab.d-block').should('have.length', 1);
  });
  it('Toogle dropdown open position for mobile', () => {
    cy.viewport('iphone-6')
    cy.get('.tab.active').click()
    cy.get('.tab.d-block').should('have.length', 3);
  });
  it('Toogle dropdown close position after selection for mobile', () => {
    cy.viewport('iphone-6')
    cy.get('.tab.active').click();
    cy.get('.tab.d-block').should('have.length', 1);
  });
});

