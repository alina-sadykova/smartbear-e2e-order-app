export default class BasePage {
  getWebOrdersHeading() {
    return cy.get("h1");
  }

  getWelcomeUserInfo() {
    return cy.contains("Welcome,");
  }

  getLogoutButton() {
    return cy.get("#ctl00_logout");
  }

  getLeftPanelOptions() {
    return cy.get("#ctl00_menu a");
  }
  getRightPanelHeading() {
    return cy.get("h2");
  }

  getRightPanelMainContentTable() {
    return cy.get(".content table").first();
  }
  // #ctl00_MainContent_orderGrid or . SampleTable
  // .ProductsTable
  // #ctl00_MainContent_fmwOrder
}
