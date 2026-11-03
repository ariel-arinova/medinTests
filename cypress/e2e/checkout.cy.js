describe("Parcours de commande", () => {
  it("commande 2 articles et affiche la confirmation", () => {
    // Connexion
    cy.visit("/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");

    // Ajout de 2 articles
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "2");

    // Vérification du panier
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should("include", "/cart.html");
    cy.get('[data-test="inventory-item"]').should("have.length", 2);
    cy.get('[data-test="inventory-item-name"]')
      .eq(0)
      .should("have.text", "Sauce Labs Backpack");
    cy.get('[data-test="inventory-item-name"]')
      .eq(1)
      .should("have.text", "Sauce Labs Bike Light");
    cy.get('[data-test="inventory-item-price"]')
      .eq(0)
      .should("have.text", "$29.99");
    cy.get('[data-test="inventory-item-price"]')
      .eq(1)
      .should("have.text", "$9.99");

    // Informations de livraison
    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/checkout-step-one.html");
    cy.get('[data-test="firstName"]').type("Ariel");
    cy.get('[data-test="lastName"]').type("Schwartz");
    cy.get('[data-test="postalCode"]').type("75001");
    cy.get('[data-test="continue"]').click();

    // Récapitulatif
    cy.url().should("include", "/checkout-step-two.html");
    cy.get('[data-test="subtotal-label"]').should(
      "have.text",
      "Item total: $39.98",
    );
    cy.get('[data-test="total-label"]').should("have.text", "Total: $43.18");
    cy.get('[data-test="finish"]').click();

    // Confirmation
    cy.url().should("include", "/checkout-complete.html");
    cy.get('[data-test="complete-header"]').should(
      "have.text",
      "Thank you for your order!",
    );
  });
});
