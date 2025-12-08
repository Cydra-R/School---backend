import express from 'express';
import Module from '../models/Modules.js';

const router = express.Router();

// Create new module
router.post('/', async (req, res) => {
    try {
        const moduleData = new Module(req.body);
        await moduleData.save();
        res.status(201).json(moduleData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get ALL modules
router.get('/', async (req, res) => {
    try {
        const modules = await Module.find()
            .populate('teacher')
            .populate('students');
        res.json(modules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get module by ID
router.get('/:id', async (req, res) => {
    try {
        const moduleData = await Module.findById(req.params.id)
            .populate('teacher')
            .populate('students');

        if (!moduleData) return res.status(404).json({ message: 'Module not found' });

        res.status(200).json(moduleData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update module
router.put('/:id', async (req, res) => {
    try {
        const moduleData = await Module.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(moduleData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete module
router.delete('/:id', async (req, res) => {
    try {
        const moduleData = await Module.findByIdAndDelete(req.params.id);
        if (!moduleData) return res.status(404).json({ message: 'Module not found' });

        res.status(200).json({ message: 'Module deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
