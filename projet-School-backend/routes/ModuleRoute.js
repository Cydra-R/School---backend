import express from 'express';
import Module from '../models/Module.js';

const router = express.Router();

/* -------------------------
   CREATE MODULE
-------------------------- */
router.post('/', async (req, res) => {
    try {
        const module = new Module(req.body);
        await module.save();
        res.status(201).json(module);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/* -------------------------
   GET ALL MODULES
-------------------------- */
router.get('/', async (req, res) => {
    try {
        const modules = await Module.find()
            .populate('Teacher')
            .populate('Students');

        res.status(200).json(modules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* -------------------------
   CREDIT STATISTICS ROUTE
   MUST BE ABOVE /:id
-------------------------- */
router.get('/credits', async (req, res) => {
    try {
        const creditStats = await Module.aggregate([

            // Lookup Teacher
            {
                $lookup: {
                    from: 'teachers',
                    localField: 'Teacher',
                    foreignField: '_id',
                    as: 'teacher'
                }
            },
            { $unwind: { path: "$teacher", preserveNullAndEmptyArrays: true } },

            // Lookup Students
            {
                $lookup: {
                    from: 'students',
                    localField: 'Students',
                    foreignField: '_id',
                    as: 'studentsInfo'
                }
            },

            // Add studentCount
            {
                $addFields: {
                    studentCount: { $size: "$studentsInfo" }
                }
            },

            // Global statistics
            {
                $group: {
                    _id: null,
                    modules: {
                        $push: {
                            title: "$title",
                            code: "$code",
                            credits: "$Credits",
                            teacher: "$teacher.name",
                            studentCount: "$studentCount"
                        }
                    },
                    totalCredits: { $sum: "$Credits" },
                    avgCredits: { $avg: "$Credits" },
                    maxCredits: { $max: "$Credits" },
                    minCredits: { $min: "$Credits" }
                }
            },

            // Format
            {
                $project: {
                    _id: 0,
                    modules: 1,
                    totalCredits: 1,
                    avgCredits: { $round: ["$avgCredits", 2] },
                    maxCredits: 1,
                    minCredits: 1
                }
            }
        ]);

        res.status(200).json(creditStats[0] || {});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* -------------------------
   GET MODULE BY ID
-------------------------- */
router.get('/:id', async (req, res) => {
    try {
        const module = await Module.findById(req.params.id)
            .populate('Teacher')
            .populate('Students');

        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        res.status(200).json(module);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* -------------------------
   UPDATE MODULE BY ID
-------------------------- */
router.put('/:id', async (req, res) => {
    try {
        const module = await Module.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        .populate('Teacher')
        .populate('Students');

        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        res.json(module);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* -------------------------
   DELETE MODULE BY ID
-------------------------- */
router.delete('/:id', async (req, res) => {
    try {
        const module = await Module.findByIdAndDelete(req.params.id);

        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        res.status(200).json({ message: 'Module deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
