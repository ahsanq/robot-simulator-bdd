module.exports = {
  default: {
    require: ['features/step_definitions/*.js'], // Path to step definitions
    paths: ['features/*.feature'], // Path to feature files
    format: ['progress', 'html:reports/cucumber-report.html'], // Optional report generation
  },
};
