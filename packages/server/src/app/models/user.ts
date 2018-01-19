import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
}

export const UserSchema = new Schema({
  username: String,
  password: String
});

export const UserModel = model('user', UserSchema);
