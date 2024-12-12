// cucumber.js
module.exports = {
    default: {
        require: [
            'step-definitions/**/*.ts',
            'support/**/*.ts',
        ],
        format: [
            'json:reports/cucumber_report.json',
            '@cucumber/pretty-formatter'
        ],
        paths: ['features/**/*.feature'],
        requireModule: ['ts-node/register'],
        parallel: 3,
    },
};