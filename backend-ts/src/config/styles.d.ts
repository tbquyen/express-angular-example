import { UserDocument } from './../models/user';
import { Request } from "express"
export interface PassportRequest extends Request {
  user: UserDocument;
}