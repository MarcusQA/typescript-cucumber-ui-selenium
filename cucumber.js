module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        paths: ['test/features/*.feature'],
        require: ['test/steps/**/*.ts']
    },
    cucumberOpts: {
        format: ['json:cucumber-report/report.json']
    }
};