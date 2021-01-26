before(() => {
  cy.visit('http://localhost:3000/');
});

it('should render correctly', () => {
  cy.get('header').contains('Lugares que quero conhecer');
});

// it('should add a new place', () => {
//   cy.get('select').select('BRA');
//   cy.get('input')
//     .first().type('São Luís')
//     .parent().next().type('022021');
//   cy.get('button').first().click();

  
// });