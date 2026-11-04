import loginPage from "../pages/LoginPage";
import inventoryPage from "../pages/InventoryPage";
import cartPage from "../pages/CartPage";
import checkoutInfoPage from "../pages/CheckoutInfoPage";
import checkoutOverviewPage from "../pages/CheckoutOverviewPage";
import checkoutCompletePage from "../pages/CheckoutCompletePage";

const TAX_RATE = 0.08;

// Calculs en centimes pour éviter les erreurs d'arrondi des décimales.
const toCents = (price) => Math.round(parseFloat(price.replace("$", "")) * 100);
const toPrice = (cents) => `$${(cents / 100).toFixed(2)}`;

describe("Parcours de commande", () => {
  let users;
  let products;
  let customer;
  let password;

  beforeEach(() => {
    cy.env(["password"]).then((env) => {
      password = env.password;
    });
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
    const items = () => [products.backpack, products.bikeLight];

    loginPage.visit();
    loginPage.login(users.standard.username, password);
    inventoryPage.shouldBeDisplayed();
    inventoryPage.shouldListProducts(items());

    items().forEach((product) => inventoryPage.addToCart(product));
    inventoryPage.cartBadgeShouldHaveCount(2);

    inventoryPage.openCart();
    cartPage.shouldBeDisplayed();
    cartPage.shouldContain(items());

    cartPage.checkout();
    checkoutInfoPage.shouldBeDisplayed();
    checkoutInfoPage.fillCustomerInfo(customer);

    const subtotal = items().reduce((sum, product) => sum + toCents(product.price), 0);
    const total = subtotal + Math.round(subtotal * TAX_RATE);
    checkoutOverviewPage.shouldShow(items(), toPrice(subtotal), toPrice(total));
    checkoutOverviewPage.finish();

    checkoutCompletePage.shouldShowConfirmation();
  });
});
