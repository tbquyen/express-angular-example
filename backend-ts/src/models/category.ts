/**
 * Required External Modules and Interfaces
 */
import mongoose from "mongoose";
import { Document, Schema, model, connect } from "mongoose";

/**
 * Create an interface representing a document in MongoDB
 */
export interface CategoryDocument extends Document {
  name: string;
}

/**
 * Create a Schema corresponding to the document interface.
 */
const schema = new Schema<CategoryDocument>(
  {
    name: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Category = mongoose.model<CategoryDocument>("categories", schema);
