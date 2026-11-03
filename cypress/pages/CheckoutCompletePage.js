class CheckoutCompletePage {
  shouldShowConfirmation() {
    cy.url().should("include", "/checkout-complete.html");
    cy.get('[data-test="complete-header"]').should(
      "have.text",
      "Thank you for your order!",
    );
  }
}

export default new CheckoutCompletePage();
