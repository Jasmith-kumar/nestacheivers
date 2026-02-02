import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

// Reuse connection across invocations
let conn: typeof mongoose | null = null;

async function connectMongo() {
  if (conn && mongoose.connection.readyState === 1) return conn;
  const uri = process.env.MONGO_URI;
  if (!uri) return null;
  conn = await mongoose.connect(uri);
  return conn;
}

// Schema must match the frontend/server expectations
const formSubmissionSchema = new Schema(
  {
    studentName: { type: String, required: true },
    currentClass: { type: String, required: true },
    phone: { type: String, required: true },
    board: { type: String, default: '' },
    interestedExam: { type: String, default: '' },
    message: { type: String, default: '' },
  },
  { timestamps: true }
);

const FormSubmission =
  models.FormSubmission || model('FormSubmission', formSubmissionSchema);

function parseBasicAuth(req: VercelRequest) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Basic ')) return null;
  try {
    const base64 = auth.slice(6).trim();
    if (!base64) return null;
    const decoded = Buffer.from(base64, 'base64').toString('utf8');
    const colonIndex = decoded.indexOf(':');
    if (colonIndex === -1) return null;
    const username = decoded.slice(0, colonIndex).trim();
    const password = decoded.slice(colonIndex + 1);
    return { username, password };
  } catch {
    return null;
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === 'POST') {
    const { studentName, currentClass, phone, board, interestedExam, message } =
      req.body || {};

    if (!studentName || !currentClass || !phone) {
      return res
        .status(400)
        .json({ error: 'Student name, class and phone are required' });
    }

    try {
      const connected = await connectMongo();
      if (!connected) {
        // No Mongo configured in production: accept the submission but do not persist.
        console.warn('POST /api/submissions: MONGO_URI not set, skipping persistence.');
        return res.status(201).json({ success: true, id: null });
      }
      const doc = await FormSubmission.create({
        studentName,
        currentClass,
        phone,
        board: board || '',
        interestedExam: interestedExam || '',
        message: message || '',
      });
      return res.status(201).json({ success: true, id: doc._id });
    } catch (err) {
      console.error('Vercel POST /api/submissions error:', err);
      return res.status(500).json({ error: 'Failed to save submission' });
    }
  }

  if (req.method === 'GET') {
    const creds = parseBasicAuth(req);
    const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || 'admin').trim();
    const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || 'admin123').trim();

    if (!creds || creds.username !== ADMIN_USERNAME || creds.password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    try {
      const connected = await connectMongo();
      if (!connected) {
        // No Mongo configured: allow login but return empty list.
        console.warn('GET /api/submissions: MONGO_URI not set, returning empty list.');
        return res.status(200).json([]);
      }
      const submissions = await FormSubmission.find()
        .sort({ createdAt: -1 })
        .lean();
      return res.status(200).json(submissions);
    } catch (err) {
      console.error('Vercel GET /api/submissions error:', err);
      return res.status(500).json({ error: 'Failed to load submissions' });
    }
  }

  res.setHeader('Allow', 'GET,POST');
  return res.status(405).json({ error: 'Method not allowed' });

