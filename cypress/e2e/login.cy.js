import loginPage from "../pages/LoginPage";
import inventoryPage from "../pages/InventoryPage";

describe("Connexion", () => {
  it("connecte un utilisateur standard et arrive sur l'inventaire", () => {
    cy.fixture("users").then((users) => {
      loginPage.visit();
      loginPage.login(users.standard.username, users.standard.password);
      inventoryPage.shouldBeDisplayed();
    });
  });
});
