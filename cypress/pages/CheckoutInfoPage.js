class CheckoutInfoPage {
  shouldBeDisplayed() {
    cy.url().should("include", "/checkout-step-one.html");
  }

  fillCustomerInfo(customer) {
    cy.get('[data-test="firstName"]').type(customer.firstName);
    cy.get('[data-test="lastName"]').type(customer.lastName);
    cy.get('[data-test="postalCode"]').type(customer.postalCode);
    cy.get('[data-test="continue"]').click();
  }
}

export default new CheckoutInfoPage();
