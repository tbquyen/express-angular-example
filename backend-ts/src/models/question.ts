/**
 * Required External Modules and Interfaces
 */
import mongoose from "mongoose";
import { Document, Schema, model, connect } from "mongoose";

/**
 * Create an interface representing a document in MongoDB
 */
export interface QuestionDocument extends Document {
  categoryId: string;
  question: string;
  ans: string;
  ans1: string;
  ans2: string;
  ans3: string;
  ans4: string;
  explanation: string;
  duration: number;
}

/**
 * Create a Schema corresponding to the document interface.
 */
const schema = new Schema<QuestionDocument>(
  {
    categoryId: { type: String, trim: true },
    question: { type: String, trim: true },
    ans: { type: String, trim: true, default: "A" },
    ans1: { type: String, trim: true },
    ans2: { type: String, trim: true },
    ans3: { type: String, trim: true },
    ans4: { type: String, trim: true },
    explanation: { type: String, trim: true },
    duration: { type: Number, default: 30 },
  },
  { timestamps: true }
);

export const Question = mongoose.model<QuestionDocument>("questions", schema);
