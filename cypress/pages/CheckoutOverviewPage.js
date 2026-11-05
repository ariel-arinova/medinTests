import { shouldShowProductDetails } from "./components/ProductDetails";

class CheckoutOverviewPage {
  shouldBeDisplayed() {
    cy.url().should("include", "/checkout-step-two.html");
  }

  // summary : { subtotal, tax, total }, voir computeOrderSummary (support/price.js).
  shouldShow(products, summary) {
    cy.get('[data-test="inventory-item"]').should("have.length", products.length);
    products.forEach(shouldShowProductDetails);
    cy.get('[data-test="subtotal-label"]').should("have.text", `Item total: ${summary.subtotal}`);
    cy.get('[data-test="tax-label"]').should("have.text", `Tax: ${summary.tax}`);
    cy.get('[data-test="total-label"]').should("have.text", `Total: ${summary.total}`);
  }

  finish() {
    cy.get('[data-test="finish"]').click();
  }
}

export default new CheckoutOverviewPage();
