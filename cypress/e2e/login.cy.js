import loginPage from "../pages/LoginPage";
import inventoryPage from "../pages/InventoryPage";

describe("Connexion", () => {
  let users;
  let password;

  beforeEach(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
    cy.env(["password"]).then((env) => {
      password = env.password;
    });
  });

  it("connecte un utilisateur standard et arrive sur l'inventaire", () => {
    loginPage.visit();
    loginPage.login(users.standard.username, password);
    inventoryPage.shouldBeDisplayed();
  });
});
