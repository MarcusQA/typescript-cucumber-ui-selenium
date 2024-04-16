const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "cucumber-report",
  reportPath: "cucumber-report/html",
  metadata: {
    browser: {
      name: "chrome",
      version: "123",
    },
    device: "Marcus' laptop",
    platform: {
      name: "Linux",
      version: "Ubuntu",
    },
  },
  customData: {
    title: "Run information",
    data: [
      { label: "Execution completed at:", value: new Date().toLocaleString() },
    ],
  },
});
