import { shouldShowProductDetails } from "./components/ProductDetails";

class CartPage {
  shouldBeDisplayed() {
    cy.url().should("include", "/cart.html");
  }

  // Vérifie le nombre d'articles, puis la description et le prix de chaque
  // produit par son nom, quel que soit l'ordre d'affichage.
  shouldContain(products) {
    cy.get('[data-test="inventory-item"]').should("have.length", products.length);
    products.forEach(shouldShowProductDetails);
  }

  checkout() {
    cy.get('[data-test="checkout"]').click();
  }
}

export default new CartPage();
