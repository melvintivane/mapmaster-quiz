// Teste de renderização inicial
it("should render the initial question", () => {
  cy.visit("/");
  cy.contains("What is the capital of").should("be.visible");
});

// it("should increment the correct answer count and show next button on correct answer", () => {
//   cy.visit("/");
//   cy.window()
//     .its("currentQuestion")
//     .then((currentQuestion) => {
//       const correctAnswer = currentQuestion.answers.find(
//         (answer) => answer.correct
//       );
//       cy.get("button").contains(correctAnswer.text).click();
//       cy.get("button").contains("Next").should("be.visible");
//     });
// });

it("should end the game on incorrect answer", () => {
  cy.visit("/");
  cy.get("button").contains("B").click();
  cy.contains("You got").should("be.visible");
});

// it("should show the next question on clicking Next", () => {
//   cy.visit("/");
//   cy.get("button").contains("A").click();
//   cy.get("button").contains("Next").click();
//   cy.contains("What is the capital of").should("be.visible");
// });

it("should load countries data and generate questions", () => {
  cy.visit("/");
  cy.contains("What is the capital of").should("not.exist");
  cy.wait(1000);
  cy.contains("What is the capital of").should("be.visible");
});
