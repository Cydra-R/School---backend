import mongoose from 'mongoose';
import validator from 'validator';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "obligatory field"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "obligatory field"],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  age: {
    type: Number,
    min: [16, 'Age must be at least 16'],
  },
  modules: [{              // lowercase, matches your JSON body
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'          // match your Module model name
  }]
}, {
  timestamps: true
});

export default mongoose.model('Student', studentSchema);
