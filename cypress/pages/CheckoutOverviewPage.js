class CheckoutOverviewPage {
  shouldShow(products, subtotal, total) {
    cy.url().should("include", "/checkout-step-two.html");
    cy.get('[data-test="inventory-item"]').should("have.length", products.length);
    products.forEach((product) => {
      cy.contains('[data-test="inventory-item"]', product.name)
        .find('[data-test="inventory-item-price"]')
        .should("have.text", product.price);
    });
    cy.get('[data-test="subtotal-label"]').should("have.text", `Item total: ${subtotal}`);
    cy.get('[data-test="total-label"]').should("have.text", `Total: ${total}`);
  }

  finish() {
    cy.get('[data-test="finish"]').click();
  }
}

export default new CheckoutOverviewPage();
