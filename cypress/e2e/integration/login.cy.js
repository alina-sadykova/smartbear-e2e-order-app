/// <reference types="cypress"/>
import BasePage from "../../pages/BasePage";
import LoginPage from "../../pages/LoginPage";

describe("Login Verification @Smoke", () => {
  const loginPage = new LoginPage();
  const basePage = new BasePage();

  beforeEach(() => {
    cy.visit(Cypress.env("APP_BASE_URL"));
  });
  it("TG11S-T131 - Validate login with valid credentials", () => {
    loginPage.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));

    cy.url().should("include", "weborders");

    basePage.getWebOrdersHeading().should("have.text", "Web Orders");
    basePage.getLogoutButton().should("have.text", "Logout");
    basePage
      .getWelcomeUserInfo()
      .should("include.text", Cypress.env("USERNAME"));
  });

  it("TG11S-T142 - Validate logout", () => {
    loginPage.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
    basePage.getLogoutButton().click();
    cy.url().should("include", "Login");
    loginPage.getLoginForm().should("be.visible");
  });

  [
    {
      title: "emptyUsernameAndPassword",
      username: "",
      password: "",
    },
    {
      title: "invalidUserNameValidPassword",
      username: "InvalidUsername",
      password: Cypress.env("PASSWORD"),
    },
    {
      title: "validUsernameAndInvalidPassword",
      username: Cypress.env("USERNAME"),
      password: "InvalidPassword",
    },
    {
      title: "invalidUsernameAndInvalidPassword",
      username: "InvalidUsername",
      password: "InvalidPassword",
    },
  ].forEach((creds) => {
    it(`TG11S-T164 - Validate login with ${creds.title} `, () => {
      loginPage.login(creds.username, creds.password);

      cy.url().should("include", "login");
      loginPage
        .getErrorMessage()
        .should("have.text", "Invalid Login or Password.");
    });
  });

  it("TG11S-T176: Validate the password input is masked", () => {
    loginPage.getPasswordInput().should("have.attr", "type", "password");
  });

  it.only("TG11S-T169: Validate login with valid credentials and ENTER", () => {
    loginPage.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"), false);

    cy.url().should("include", "weborders");

    basePage.getWebOrdersHeading().should("have.text", "Web Orders");
    basePage.getLogoutButton().should("have.text", "Logout");
    basePage
      .getWelcomeUserInfo()
      .should("include.text", Cypress.env("USERNAME"));
  });
});
