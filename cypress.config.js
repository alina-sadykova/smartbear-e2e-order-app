const { defineConfig } = require("cypress"); // CommonJS
// import { defineConfig } from 'cypress'; // ES6
require("dotenv").config();
// import 'dotenv' from '' // ES6

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  env: {
    APP_BASE_URL: process.env.APP_BASE_URL,
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("@cypress/grep/src/plugin")(config);
      return config;
    },
  },
});
