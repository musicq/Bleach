import * as debug from 'debug';
import * as mongoose from 'mongoose';
import CONFIG from '../../confs/config';


const print = debug('LAS:database');

/**
 * connect to db
 * @returns {Promise<any>}
 */
export const connectDB = (): Promise<any> => {
  // replace mongoose default promise method with global promise
  (<any>mongoose).Promise = global.Promise;

  return new Promise((resolve, reject) => {
    mongoose.connect(CONFIG.db.uri, { useMongoClient: true });

    const connection = mongoose.connection;

    connection.on('error', (e: Error) => {
      print(`[Database Connection] an error occurs! error: ${JSON.stringify(e)}`);
      reject(e);
    });

    connection.once('open', () => {
      print(`[Database Connection] db connection success!`);
      resolve();
    });
  });
};
