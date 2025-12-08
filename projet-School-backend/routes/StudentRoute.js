import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Define schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String
});

const Student = mongoose.model('Student', studentSchema, 'Students');

// POST /students
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /students/analytics/grades - aggregate students by grade
router.get('/analytics/grades', async (req, res) => {
  try {
    const gradeStats = await Student.aggregate([
      {
        $group: {
          _id: "$grade",                // Group by grade
          studentCount: { $sum: 1 },    // Count students per grade
          students: { $push: "$name" }  // List student names per grade
        }
      },
      {
        $sort: { studentCount: -1 }     // Sort by number of students descending
      }
    ]);
    res.json(gradeStats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
