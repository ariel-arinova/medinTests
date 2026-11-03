class CartPage {
  shouldBeDisplayed() {
    cy.url().should("include", "/cart.html");
  }

  // Vérifie le nombre d'articles, puis le prix de chaque produit
  // par son nom, quel que soit l'ordre d'affichage.
  shouldContain(products) {
    cy.get('[data-test="inventory-item"]').should("have.length", products.length);
    products.forEach((product) => {
      cy.contains('[data-test="inventory-item"]', product.name)
        .find('[data-test="inventory-item-price"]')
        .should("have.text", product.price);
    });
  }

  checkout() {
    cy.get('[data-test="checkout"]').click();
  }
}

export default new CartPage();
