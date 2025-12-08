import express from 'express';
import Teacher from '../models/Teachers.js';
import Teachers from '../models/Teachers.js';

const router = express.Router();

// Create new teacher 
router.post('/',async (req , res) => {
    try {
        const teacher = new Teacher (req.body);
        await teacher.save();
        res.status(201).json(teacher);      
    } catch (error){
        res.status(400).json({message : error.message});  
    }
});

// Get all teachers
router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.find().populate('courses');
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get teacher by ID
router.get('/:id', async (req,res) =>{
    try {
        const teacher = await Teacher.findById(req.params.id).populate('courses');  
        if (!teacher) {
            return res.status(404).json({message : 'Teacher not found'});
        }   
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
});

// Update teacher by ID
router.put('/:id',async (req,res) =>{
    try{
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('courses');
        if(!teacher){
            return res.status(404).json({message : "Teacher not found"});
        }
        res.json(teacher);
    } catch (error){
        res.status(500).json({message : error.message});
    }
});

// Delete teacher by ID
router.delete('/:id', async (req,res) =>{
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);     
        if (!teacher) {
            return res.status(404).json({message : 'Teacher not found'});
        }
        res.status(200).json({message : 'Teacher deleted successfully'});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
});

<<<<<<< HEAD
// Get teachers grouped by specialty with course count
router.get('/specialty', async (req, res) => {
    try {
        const teachersBySpecialty = await Teacher.aggregate([

            // Group by specialty
            {
                $group: {
                    _id: {
                        $ifNull: ["$specialty", "Unknown"]
                    },
                    teacherCount: { $sum: 1 },
                    teachers: {
                        $push: {
                            name: "$name",
                            email: "$email"
                        }
                    }
                }
            },

            // Sort groups by number of teachers
            { $sort: { teacherCount: -1 } },

            // Optional: sort teachers inside each group
            {
                $project: {
                    specialty: "$_id",
                    teacherCount: 1,
                    teachers: {
                        $sortArray: {
                            input: "$teachers",
                            sortBy: { name: 1 }
                        }
                    },
                    _id: 0
                }
            }
        ]);

        res.status(200).json(teachersBySpecialty);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;

=======
>>>>>>> origin/main

export default router;