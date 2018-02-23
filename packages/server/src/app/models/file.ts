import { Document, Schema } from 'mongoose';
import { DB } from '../utils/db';

export interface IFile extends Document {
  name: string;
  token: string;
  filepath: string;
  size: number;
  lastModifiedDate: Date;
}

export const FileSchema = new Schema({
  name: String,
  token: String,
  filepath: String,
  size: Number,
  lastModifiedDate: Date
});

export const FileModel = DB.get('DB').model('file', FileSchema);
