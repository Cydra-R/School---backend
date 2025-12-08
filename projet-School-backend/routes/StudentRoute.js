import express from 'express';
import Student from '../models/Student.js';


const router = express.Router();


// Create new student

router.post('/',async (req , res) => {
    try {
        const student = new Student (req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error){
        res.status(400).json({message : error.message});
    }
});

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
});

// Update student by ID 
router.put('/:id',async (req,res) =>{
    try{
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('courses');
        if(!student){
            return res.status(404).json({message : "Student not found"});
        }
        res.json(student);
    } catch (error){
        res.status(500).json({message : error.message});
    }
});

// Delete student by ID 
router.delete('/:id', async (req,res) =>{
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({message : 'Student not found'});
        }
        res.status(200).json({message : 'Student deleted successfully'});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
});

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

export default router;
