/**
 * Required External Modules and Interfaces
 */
import mongoose from "mongoose";
import { QuizInfoDocument } from './quiz-info';
import { Document, Schema, model, connect } from "mongoose";

/**
 * Create an interface representing a document in MongoDB
 */
export interface QuizDocument extends Document {
  userid: string;
  categoryId: string;
  numberQuestion: number;
  passed: number;
  timeStart: Date;
  timeEnd: Date;
  quizInfo: QuizInfoDocument[];
}

/**
 * Create a Schema corresponding to the document interface.
 */
const schema = new Schema<QuizDocument>(
  {
    userid: { type: String, trim: true },
    categoryId: { type: String, trim: true },
    numberQuestion: { type: Number },
    passed: { type: Number, default: 0 },
    timeStart: { type: Date },
    timeEnd: { type: Date },
  },
  { timestamps: true }
);

export const Quiz = mongoose.model<QuizDocument>("quiz", schema);
