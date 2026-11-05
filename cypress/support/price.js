// Calculs de prix partagés par les tests.
// Tout est fait en centimes pour éviter les erreurs d'arrondi des décimales
// (en JavaScript, 0.1 + 0.2 ne vaut pas exactement 0.3).

// "$29.99" -> 2999
const toCents = (price) => Math.round(parseFloat(price.replace("$", "")) * 100);

// 2999 -> "$29.99"
const toPrice = (cents) => `$${(cents / 100).toFixed(2)}`;

// Récapitulatif attendu d'une commande, au format affiché par le site.
export function computeOrderSummary(products, taxRate) {
  const subtotal = products.reduce((sum, product) => sum + toCents(product.price), 0);
  const tax = Math.round(subtotal * taxRate);
  return {
    subtotal: toPrice(subtotal),
    tax: toPrice(tax),
    total: toPrice(subtotal + tax),
  };
}
