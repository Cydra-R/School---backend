// Aggregation and stats logic
const { Student, Course, Teacher } = require('../models');

// Get overall statistics
exports.getStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalTeachers = await Teacher.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalCourses,
        totalTeachers,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get student enrollment statistics
exports.getEnrollmentStats = async (req, res) => {
  try {
    const stats = await Student.aggregate([
      {
        $group: {
          _id: null,
          totalStudents: { $sum: 1 },
          avgCoursesPerStudent: { $avg: { $size: '$courses' } },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: stats[0] || { totalStudents: 0, avgCoursesPerStudent: 0 },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get course statistics
exports.getCourseStats = async (req, res) => {
  try {
    const stats = await Course.aggregate([
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: 'courses',
          as: 'enrolledStudents',
        },
      },
      {
        $project: {
          name: 1,
          code: 1,
          enrollmentCount: { $size: '$enrolledStudents' },
        },
      },
    ]);

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get teacher statistics
exports.getTeacherStats = async (req, res) => {
  try {
    const stats = await Teacher.aggregate([
      {
        $lookup: {
          from: 'courses',
          localField: '_id',
          foreignField: 'teacher',
          as: 'taughtCourses',
        },
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          courseCount: { $size: '$taughtCourses' },
        },
      },
    ]);

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
