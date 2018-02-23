import { Document, Schema } from 'mongoose';
import { DB } from '../utils/db';

export interface ISheet extends Document {
  [key: string]: any;
}

// use `strict: false` can save other fields than defined
export const SheetSchema = new Schema(
  {
    A: Schema.Types.Mixed
  },
  { strict: false }
);

export const SheetModel = (tableName: string) => {
  return DB.get('SHEETS_DB').model(tableName, SheetSchema);
};
