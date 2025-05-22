/// <reference types='cypress'/>

import ListOfProductsPage from "../../pages/ListOfProductsPage";
import LoginPage from "../../pages/LoginPage";
import expectedTableHeaderTexts from "../../expectedTexts/listOfProducts.js";

describe("", () => {
  const loginPage = new LoginPage();
  const listOfProductsPage = new ListOfProductsPage();

  beforeEach(() => {
    loginPage.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
    listOfProductsPage.clickOnLeftPanelOption("View all products");
  });

  it("TG11S - T201 Validate list of products table @Smoke", () => {
    listOfProductsPage.getRows().should("have.length", 4);
    listOfProductsPage.getTableHeaders().should("have.length", 3);

    listOfProductsPage.getRows().each((row, i) => {
      cy.wrap(row)
        .children()
        .each((cell, j) => {
          cy.wrap(cell).should("have.text", expectedTableHeaderTexts[i][j]);
        });
    });
  });
});
