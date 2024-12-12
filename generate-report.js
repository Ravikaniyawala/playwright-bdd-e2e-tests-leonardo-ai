const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: 'reports/', // Path to the directory containing Cucumber JSON reports
    reportPath: 'reports/html/', // Path where the HTML report will be saved
    metadata: {
        browser: {
            //this can be dynamically updated using dotEnv
            name: 'chromium',
            version: 'latest',
        },
        device: 'Local test machine',
        platform: {
            name: 'macOS',
            version: '12.0',
        },
    },
});