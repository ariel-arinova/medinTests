describe("Parcours de commande", () => {
  let users;
  let products;
  let customer;

  beforeEach(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
    cy.fixture("products").then((data) => {
      products = data;
    });
    cy.fixture("customer").then((data) => {
      customer = data;
    });
  });

  it("commande 2 articles et affiche la confirmation", () => {
    // Connexion
    cy.visit("/");
    cy.get('[data-test="username"]').type(users.standard.username);
    cy.get('[data-test="password"]').type(users.standard.password);
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");

    // Ajout de 2 articles
    cy.get(`[data-test="add-to-cart-${products.backpack.id}"]`).click();
    cy.get(`[data-test="add-to-cart-${products.bikeLight.id}"]`).click();
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "2");

    // Vérification du panier
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should("include", "/cart.html");
    cy.get('[data-test="inventory-item"]').should("have.length", 2);
    //forEach pour vérifier le nom et le prix de chaque produit dans le panier quel que soit l'ordre d'apparition
    [products.backpack, products.bikeLight].forEach((product) => {
      cy.contains('[data-test="inventory-item"]', product.name)
        .find('[data-test="inventory-item-price"]')
        .should("have.text", product.price);
    });

    // Informations de livraison
    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/checkout-step-one.html");
    cy.get('[data-test="firstName"]').type(customer.firstName);
    cy.get('[data-test="lastName"]').type(customer.lastName);
    cy.get('[data-test="postalCode"]').type(customer.postalCode);
    cy.get('[data-test="continue"]').click();

    // Récapitulatif
    cy.url().should("include", "/checkout-step-two.html");
    cy.get('[data-test="inventory-item"]').should("have.length", 2);
    [products.backpack, products.bikeLight].forEach((product) => {
      cy.contains('[data-test="inventory-item"]', product.name)
        .find('[data-test="inventory-item-price"]')
        .should("have.text", product.price);
    });
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
