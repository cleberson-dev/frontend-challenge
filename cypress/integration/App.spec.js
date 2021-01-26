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