// Combine all routes
const express = require('express');
const router = express.Router();

const studentRoutes = require('./studentRoutes');
const courseRoutes = require('./courseRoutes');
const teacherRoutes = require('./teacherRoutes');
const statsRoutes = require('./statsRoutes');

router.use('/students', studentRoutes);
router.use('/courses', courseRoutes);
router.use('/teachers', teacherRoutes);
router.use('/stats', statsRoutes);

module.exports = router;
