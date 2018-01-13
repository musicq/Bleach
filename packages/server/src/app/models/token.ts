import { Document, model, Schema } from 'mongoose';


export interface IToken extends Document {
  token: string;
  exp: Date;
}

export const TokenSchema = new Schema({
  token: String,
  exp: Date
});

export const TokenModel = model('token', TokenSchema);
