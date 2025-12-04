import app from './app.js';
import { config } from './config/config.js';
import { connectDB } from './config/database.js';

const PORT = config.port || 3000;

// Connect to MongoDB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:3000`);
  });
});