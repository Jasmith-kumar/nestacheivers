import express from 'express';
import mongoose from 'mongoose';
import FormSubmission from '../models/FormSubmission.js';

const router = express.Router();

// In-memory store when MongoDB is not connected (no MONGO_URI or connection failed)
const inMemorySubmissions = [];

// Hardcoded dashboard credentials (override with env if set)
const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || 'admin').trim();
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || 'admin123').trim();

function checkAuth(req) {
  const auth = req.headers.authorization;
  if (!auth || typeof auth !== 'string' || !auth.startsWith('Basic ')) return false;
  try {
    const base64 = auth.slice(6).trim();
    if (!base64) return false;
    const decoded = Buffer.from(base64, 'base64').toString('utf8');
    const colonIndex = decoded.indexOf(':');
    if (colonIndex === -1) return false;
    const username = decoded.slice(0, colonIndex).trim();
    const password = decoded.slice(colonIndex + 1);
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

function useMongo() {
  return mongoose.connection.readyState === 1;
}

// Public: save contact form submission
router.post('/', async (req, res) => {
  try {
    const { studentName, currentClass, phone, board, interestedExam, message } = req.body;
    if (!studentName || !currentClass || !phone) {
      return res.status(400).json({ error: 'Student name, class and phone are required' });
    }
    const data = {
      studentName,
      currentClass,
      phone,
      board: board || '',
      interestedExam: interestedExam || '',
      message: message || '',
    };
    if (useMongo()) {
      const doc = await FormSubmission.create(data);
      return res.status(201).json({ success: true, id: doc._id });
    }
    const id = Date.now().toString();
    inMemorySubmissions.unshift({
      _id: id,
      ...data,
      createdAt: new Date().toISOString(),
    });
    res.status(201).json({ success: true, id });
  } catch (err) {
    console.error('Form submission error:', err);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

// Dashboard: list all submissions (requires username/password via Basic auth)
router.get('/', (req, res, next) => {
  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  next();
}, async (req, res) => {
  try {
    if (useMongo()) {
      const submissions = await FormSubmission.find()
        .sort({ createdAt: -1 })
        .lean();
      return res.json(submissions);
    }
    res.json([...inMemorySubmissions]);
  } catch (err) {
    console.error('List submissions error:', err);
    res.status(500).json({ error: 'Failed to load submissions' });
  }
});

export default router;
