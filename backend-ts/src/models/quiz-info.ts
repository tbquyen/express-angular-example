/**
 * Required External Modules and Interfaces
 */
import mongoose from "mongoose";
import { QuizDocument } from "./quiz";
import { QuestionDocument } from "./question";
import { CategoryDocument } from "./category";
import { Document, Schema, model, connect } from "mongoose";

/**
 * Create an interface representing a document in MongoDB
 */
export interface QuizInfoDocument extends Document {
  quizId: string;
  questionId: string;
  answer: string;
  result: string;
  question: QuestionDocument;
  category: CategoryDocument;
  quiz: QuizDocument;
}

/**
 * Create a Schema corresponding to the document interface.
 */
const schema = new Schema<QuizInfoDocument>(
  {
    quizId: { type: String, trim: true },
    questionId: { type: String, trim: true },
    answer: { type: String },
    result: { type: String },
  },
  { timestamps: true }
);

export const QuizInfo = mongoose.model<QuizInfoDocument>("quiz-info", schema);
