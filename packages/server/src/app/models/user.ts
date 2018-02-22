import { Document, Schema } from 'mongoose';
import { DB } from '../utils/db';

export interface IUser extends Document {
  username: string;
  password: string;
}

export const UserSchema = new Schema({
  username: String,
  password: String
});

export const UserModel = DB.get('DB').model('user', UserSchema);
