import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import submissionsRoutes from './routes/submissions.js';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api/submissions', submissionsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

async function start() {
  if (MONGO_URI) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('MongoDB connected');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      console.log('Running without MongoDB (submissions in memory only).');
    }
  } else {
    console.log('No MONGO_URI set — running with in-memory store (submissions reset when server restarts).');
  }
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
