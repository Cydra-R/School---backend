// Stats/aggregation routes
const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/overall', statsController.getStats);
router.get('/enrollment', statsController.getEnrollmentStats);
router.get('/courses', statsController.getCourseStats);
router.get('/teachers', statsController.getTeacherStats);

module.exports = router;
