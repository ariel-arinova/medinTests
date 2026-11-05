import loginPage from "../pages/LoginPage";
import inventoryPage from "../pages/InventoryPage";
import cartPage from "../pages/CartPage";
import checkoutInfoPage from "../pages/CheckoutInfoPage";
import checkoutOverviewPage from "../pages/CheckoutOverviewPage";
import checkoutCompletePage from "../pages/CheckoutCompletePage";
import { computeOrderSummary } from "../support/price";

describe("Parcours de commande", () => {
  let users;
  let products;
  let customer;
  let pricing;
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
    cy.fixture("pricing").then((data) => {
      pricing = data;
    });
  });

  it("commande 2 articles et affiche la confirmation", () => {
    const items = [products.backpack, products.bikeLight];

    loginPage.visit();
    loginPage.login(users.standard.username, password);
    inventoryPage.shouldBeDisplayed();
    inventoryPage.shouldListProducts(items);

    items.forEach((product) => inventoryPage.addToCart(product));
    inventoryPage.cartBadgeShouldHaveCount(2);

    inventoryPage.openCart();
    cartPage.shouldBeDisplayed();
    cartPage.shouldContain(items);

    cartPage.checkout();
    checkoutInfoPage.shouldBeDisplayed();
    checkoutInfoPage.fillCustomerInfo(customer);

    checkoutOverviewPage.shouldBeDisplayed();
    checkoutOverviewPage.shouldShow(items, computeOrderSummary(items, pricing.taxRate));
    checkoutOverviewPage.finish();

    checkoutCompletePage.shouldBeDisplayed();
    checkoutCompletePage.shouldShowConfirmation();
  });
});
