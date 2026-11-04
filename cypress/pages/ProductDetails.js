// Vérification partagée par l'inventaire, le panier et le récapitulatif :
// ces trois pages affichent chaque produit dans un bloc "inventory-item".
// On retrouve le bloc par le nom du produit, quel que soit l'ordre d'affichage,
// puis on vérifie la description et le prix à l'intérieur de ce bloc.
export function shouldShowProductDetails(product) {
  cy.contains('[data-test="inventory-item"]', product.name).within(() => {
    cy.get('[data-test="inventory-item-desc"]').should("have.text", product.description);
    cy.get('[data-test="inventory-item-price"]').should("have.text", product.price);
  });
}
