import mongoose from 'mongoose';


const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  specialty: {
    type: String,
    required: true
  },
 Modules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
}, {
  timestamps: true
});


//  asynchrone


export default mongoose.model('Teacher', teacherSchema, 'Teachers');

