import express from 'express';
import studentRoutes from './StudentRoute.js';
import teacherRoutes from './TeacherRoute.js';
import moduleRoutes from './ModuleRoute.js';

const router = express.Router();

router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);
router.use('/modules', moduleRoutes);

export default router;
