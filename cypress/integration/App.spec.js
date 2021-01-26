before(() => {
  cy.visit("http://localhost:3000");
});

it("should render correctly", () => {
  cy.get("header").contains("Lugares que quero conhecer");
});
