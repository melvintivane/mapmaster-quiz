// https://docs.cypress.io/api/table-of-contents

describe("App.vue Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "MAPSTER QUIZ");
  });

  it("Should have a valid href", () => {
    cy.visit("/");
    cy.get("a").should("have.attr", "href", "https://github.com/melvintivane/");
  });

  it("Verifies that the link correctly redirects to Melvin Tivane's GitHub page", () => {
    cy.visit("/");
    cy.get('a[href="https://github.com/melvintivane/"]').click();
  });
});
