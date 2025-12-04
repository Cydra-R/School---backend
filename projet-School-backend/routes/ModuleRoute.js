import express from 'express';
import Module from '../models/Module.js';

const router = express.Router();

// Create new module
router.post('/', async (req , res) => {
    try {
        const module = new Module (req.body);
        await module.save();
        res.status(201).json(module);
    } catch (error){
        res.status(400).json({message : error.message});
    }
});

// Get module by ID
router.get('/:id', async (req,res) =>{
    try {
        const module = await Module.findById(req.params.id).populate('Teacher').populate('Students');
        if (!module) {
            return res.status(404).json({message : 'Module not found'});
        }   
        res.status(200).json(module);           
    } catch (error) {
        res.status(500).json({message : error.message});
    }
});

// Update module by ID
router.put('/:id', async (req,res) =>{ 
    try{
        const module = await Module.findByIdAndUpdate(req.params.id, req.body, {new : true}).populate('Teacher').populate('Students');
        if(!module){
            return res.status(404).json({message : "Module not found"});    
        }
        res.json(module);                  
    } catch (error){
        res.status(500).json({message : error.message});
    }
});

// Delete module by ID
router.delete('/:id', async (req,res) =>{
    try {
        const module = await Module.findByIdAndDelete(req.params.id);                   
        if (!module) {
            return res.status(404).json({message : 'Module not found'});
        }
        res.status(200).json({message : 'Module deleted successfully'});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
});


module.exports = router;
