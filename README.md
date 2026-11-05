# MedinTests : scénario E2E Cypress sur Sauce Demo

Test technique pour le poste d'Ingénieur QA Sénior chez MEDIN+.

Le projet automatise le parcours d'achat complet sur l'application de démonstration [Sauce Demo](https://www.saucedemo.com) :
connexion → ajout au panier → vérification du panier → checkout → « Thank you for your order! ».

## Installation

```bash
git clone https://github.com/ariel-arinova/medinTests.git
cd medinTests
npm ci
```

Aucune configuration supplémentaire : le dépôt contient tout ce qu'il faut pour lancer les tests (voir [Identifiants](#identifiants)).

## Lancement

| Commande           | Mode                                             |
| ------------------ | ------------------------------------------------ |
| `npx cypress open` | Interface Cypress, pour suivre le test pas à pas |
| `npx cypress run`  | Headless dans le terminal                        |

## Ce qui est testé

### `login.cy.js` : connexion

Connexion d'un utilisateur standard et arrivée sur l'inventaire.

### `checkout.cy.js` : parcours de commande complet

| Étape                       | Vérifications                                                          |
| --------------------------- | ---------------------------------------------------------------------- |
| Connexion (`standard_user`) | arrivée sur `/inventory.html`, titre « Products »                      |
| Inventaire                  | nom, description et prix des produits choisis                          |
| Ajout de 2 articles         | badge du panier à 2                                                    |
| Panier                      | nombre d'articles exact, nom, description et prix de chacun            |
| Informations client         | saisie prénom, nom, code postal                                        |
| Récapitulatif               | articles, sous-total, taxe et total recalculés par le test             |
| Confirmation                | URL `/checkout-complete.html` et message « Thank you for your order! » |

## Structure

```
cypress/
├── e2e/            # les scénarios (ce que l'on teste)
├── pages/          # un Page Object par page du site (comment on interagit)
│   └── components/ # blocs communs à plusieurs pages (fiche produit)
├── fixtures/       # données de test : utilisateurs, produits, client, taux de taxe
└── support/
    ├── price.js    # calcul du récapitulatif attendu (sous-total, taxe, total)
    └── e2e.js      # chargé avant chaque spec
cypress.config.js   # URL de base, taille d'écran
cypress.env.json    # mot de passe
```

## Identifiants

Le nom d'utilisateur est dans `fixtures/users.json`. Le mot de passe est dans `cypress.env.json` et lu avec `cy.env()`.

`cypress.env.json` est volontairement commité : le mot de passe de Sauce Demo est public (affiché sur la page de connexion), et ainsi le projet se lance juste après le clone.
Sur un vrai projet, ce fichier serait dans le `.gitignore`, avec un `cypress.env.example.json` commité comme modèle, et les secrets fournis à la CI par ses variables d'environnement.
