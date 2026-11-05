class CheckoutCompletePage {
  shouldBeDisplayed() {
    cy.url().should("include", "/checkout-complete.html");
  }

  shouldShowConfirmation() {
    cy.get('[data-test="complete-header"]').should(
      "have.text",
      "Thank you for your order!",
    );
  }
}

export default new CheckoutCompletePage();
