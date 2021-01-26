before(() => {
  cy.visit("http://localhost:3000");
});

it("should render correctly", () => {
  cy.get("header").contains("Lugares que quero conhecer");
});

it("should format the goal input MM/YYYY", () => {
  cy.get("input").last()
  .type("111999")
  .should("have.value", "11/1999")
  .clear();
});

function addNewPlace(countryCode, local, typedGoalDate) {
  cy.get('label').contains(/país/i).parent().find('select')
    .select(countryCode);
  cy.get('label').contains(/local/i).parent().find('input')
    .type(local);
  cy.get('label').contains(/meta/i).parent().find('input')
    .type(typedGoalDate);
  cy.get('form button[type="submit"]').click();
}

it("should add a new place", () => {
  addNewPlace('BRA', 'São Luís', '022021');

  cy.get("ul li").should("have.length", 1);
  cy.get("ul li")
    .first()
    .should("contain", "Brasil")
    .and("contain", "São Luís")
    .and("contain", "02/2021");
});
