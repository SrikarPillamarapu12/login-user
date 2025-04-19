import express from 'express';
import authRoutes from './routes/auth.route';

const app = express();

app.use(express.json()); // required for parsing JSON

// ✅ Important line:
app.use('/api/auth', authRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
