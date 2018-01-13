/**
 * Restore token blacklist when app is launched.
 */

import * as debug from 'debug';
import * as LRU from 'lru-cache';
import { isEmpty } from 'ramda';
import CONFIG from '../../confs/config';
import { IToken, TokenModel } from '../../models/token';
import { Cache } from '../../utils/cache';


const print = debug('LAS:restore-token-blacklist');

const blacklist: LRU.Cache<string, any> = LRU({
  max: CONFIG.maxCacheStorage,
  maxAge: CONFIG.cookieMaxAge
});

/**
 * connect to db
 * @returns {Promise<any>}
 */
export const restoreTokenBlacklist = (): Promise<void> => {
  Cache.set('blacklist', blacklist);

  return new Promise(async (resolve, reject) => {
    let tokenDocuments: IToken[] = [];

    try {
      tokenDocuments = <IToken[]>await TokenModel.find().exec();
    } catch (e) {
      print(`[Restore Token Blacklist] an error occurs! error: ${JSON.stringify(e)}`);
      reject(e);
    }

    if (!isEmpty(tokenDocuments)) {
      tokenDocuments.forEach(document => blacklist.set(document.token, true));
    }

    print(`Restore token blacklist has been finished.`);
    resolve();
  });
};
