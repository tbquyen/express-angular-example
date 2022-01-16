/**
 * Required External Modules and Interfaces
 */
import mongoose from "mongoose";
import { Document, Schema, model, connect } from 'mongoose';

/**
 * Create an interface representing a document in MongoDB
 */
export interface UserDocument extends Document {
  username: string;
  name: string;
  role: string;
  password: string;
  disabled: boolean;
  expired: boolean;
}

/**
 * Create a Schema corresponding to the document interface.
 */
const schema = new Schema<UserDocument>(
  {
    username: { type: String, trim: true },
    name: { type: String, trim: true },
    role: { type: String, trim: true },
    password: { type: String, trim: true, default: "1" },
    disabled: { type: Boolean, default: false },
    expired: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>("users", schema);
