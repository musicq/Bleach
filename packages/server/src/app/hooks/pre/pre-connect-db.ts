/**
 * @fileOverview connect database
 */
import * as debug from 'debug';
import * as mongoose from 'mongoose';
import { createConnection, Connection } from 'mongoose';
import CONFIG from '../../confs/config';
import { DB } from '../../utils/db';

const print = debug('BLEACH:database');

// launch DBs
DB.set('DB', createConnection(CONFIG.db.DBUri));
DB.set('SHEETS_DB', createConnection(CONFIG.db.SHEETSDBUri));

/**
 * connect to db
 * @returns {Promise<void>[]}
 */
export const connectDB = (): Promise<void>[] => {
  // replace mongoose default promise method with global promise
  (<any>mongoose).Promise = global.Promise;

  return [DB.get('DB'), DB.get('SHEETS_DB')].map(db => {
    return new Promise((resolve, reject) => {
      db.on('error', (e: Error) => {
        print(`[Database Connection] an error occurs! error: ${JSON.stringify(e)}`);
        reject(e);
      });

      db.once('open', () => {
        print(`[Database Connection] DB ${(db as Connection & { name: string }).name} is connected successfully!`);
        resolve();
      });
    });
  });
};
