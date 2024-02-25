describe("main.ts tests", () => {
  it("should create a Vue application", () => {
    cy.visit("/");
    cy.window().its("app").should("exist");
  });

  //   it("should use Pinia for state management", () => {
  //     cy.visit("/");
  //     cy.window().its("app").invoke("use").should("include", "pinia");
  //   });

  it("should mount the application to the DOM", () => {
    cy.visit("/");
    cy.get("#app").should("exist");
  });
});
