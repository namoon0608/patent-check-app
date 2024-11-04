const express = require('express');
const router = express.Router();
const {
    checkInfringement,
    saveReport,
    getSavedReports,
} = require('../controllers/patentController');

router.post('/check', checkInfringement);
router.post('/save', saveReport);
router.get('/reports', getSavedReports);

module.exports = router;
