const { JsonDB, Config } = require('node-json-db');

const db = new JsonDB(new Config('reportsDatabase', true, false, '/'));

module.exports = {
    initializeDB() {
        db.push('/reports', []);
    },

    async saveReport(report) {
        const reports = await db.getData('/reports');
        reports.push(report);
        db.push('/reports', reports);
    },

    getReports() {
        return db.getData('/reports');
    },
};
