import mongoose from 'mongoose';

const formSubmissionSchema = new mongoose.Schema(
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

export default mongoose.model('FormSubmission', formSubmissionSchema);
