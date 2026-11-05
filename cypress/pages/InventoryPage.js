import { shouldShowProductDetails } from "./components/ProductDetails";

class InventoryPage {
  shouldBeDisplayed() {
    cy.url().should("include", "/inventory.html");
    cy.get('[data-test="title"]').should("have.text", "Products");
  }

  // Le catalogue contient d'autres produits : on vérifie seulement ceux demandés.
  shouldListProducts(products) {
    products.forEach(shouldShowProductDetails);
  }

  addToCart(product) {
    cy.get(`[data-test="add-to-cart-${product.id}"]`).click();
  }

  cartBadgeShouldHaveCount(count) {
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", `${count}`);
  }

  openCart() {
    cy.get('[data-test="shopping-cart-link"]').click();
  }
}

export default new InventoryPage();
