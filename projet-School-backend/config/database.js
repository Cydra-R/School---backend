import mongoose from 'mongoose';
import { config } from './config.js';

export const connectDB = async () => {
  const uri = config.mongoUri;
  if (!uri) {
    // No DB configured — resolve immediately so server can run without MongoDB.
    console.warn('  No MONGO_URI configured. Skipping MongoDB connection.');
    return Promise.resolve();
  }

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(' Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};
