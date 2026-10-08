module.exports = {
  default: {
    paths: ['tests/features/**/*.feature'],
    require: [
      'tests/step-definitions/**/*.ts',
      'tests/support/**/*.ts'
    ],
    requireModule: ['tsx/cjs'],
    format: [
      'progress',
      'html:reports/cucumber-report.html'
    ],
    publishQuiet: true
  }
};