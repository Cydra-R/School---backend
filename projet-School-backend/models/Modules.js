import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    Teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    Students: [{
        type: mongoose.Schema.Types.ObjectId,  // Correction ici
        ref: 'Student'
    }],
    Credits: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    Description: {
        type: String
    }
}, {
    timestamps: true,
    collection: 'Modules'  
});

export default mongoose.model('Modules', courseSchema);
