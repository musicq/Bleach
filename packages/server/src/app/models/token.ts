import { Document, Schema } from 'mongoose';
import { DB } from '../utils/db';

export interface IToken extends Document {
  token: string;
  exp: Date;
}

export const TokenSchema = new Schema({
  token: String,
  exp: Date
});

export const TokenModel = DB.get('DB').model('token', TokenSchema);
