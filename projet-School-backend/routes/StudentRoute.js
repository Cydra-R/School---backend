import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Define schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String
});

<<<<<<< HEAD
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
=======
// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().populate('courses');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('courses');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
>>>>>>> 0b6daed (adding the routes in teacher and student)
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

<<<<<<< HEAD
=======
router.get('/age', async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const res_data = {
            totalStudents,
            timestamp: new Date()
        };
        res.status(200).json(res_data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

>>>>>>> 0b6daed (adding the routes in teacher and student)
export default router;
