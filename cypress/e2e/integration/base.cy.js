/// <reference types='cypress'/>

import BasePage from "../../pages/BasePage";
import LoginPage from "../../pages/LoginPage";
import base from "../../expectedTexts/base.js";

describe("Base Test @Smoke", () => {
  const loginPage = new LoginPage();
  const basePage = new BasePage();

  it("TG11S-T183 - Validate main content after login", () => {
    loginPage.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));

    const leftPanelOptions = base.leftPanelOptions;
    const rightPanelHeadings = base.rightPanelHeadings;
    // const leftPanelOptions = ["View all orders", "View all products", "Order"];
    // const rightPanelHeadings = [
    //   "List of All Orders",
    //   "List of Products",
    //   "Order",
    // ];

    for (let i = 0; i <= 2; i++) {
      basePage.getLeftPanelOptions().eq(i).click();
      basePage
        .getLeftPanelOptions()
        .eq(i)
        .should("have.text", leftPanelOptions[i]);

      basePage
        .getRightPanelHeading()
        .should("include.text", rightPanelHeadings[i]);
      basePage.getRightPanelMainContentTable().should("be.visible");
    }
  });
});
