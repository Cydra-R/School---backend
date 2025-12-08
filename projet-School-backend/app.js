import express from 'express';
import { connectDB } from '../config/database.js';
import studentRouter from './routes/StudentRoute.js';
import teacherRouter from './routes/TeacherRoute.js';
import moduleRouter from './routes/ModuleRoute.js';

const app = express();
app.use(express.json());

connectDB(); // connects to your 'school' DB

app.use('/students', studentRouter);
app.use('/teachers', teacherRouter);
app.use('/modules', moduleRouter);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
export default app;
app.get('/', (req, res) => {
  res.send('API is running');
});
