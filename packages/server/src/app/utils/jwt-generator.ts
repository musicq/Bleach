import { Secret, sign, SignOptions, verify } from 'jsonwebtoken';
import * as LRU from 'lru-cache';
import { promisify } from 'util';
import { v4 } from 'uuid';
import CONFIG from '../confs/config';
import { TokenModel } from '../models/token';
import { Cache } from './cache';
import ms = require('ms');

const _verify = promisify(verify);

export class TokenGenerator {
  /**
   * blacklist
   * @type {LRU.Cache<any, any>}
   */
  private static blacklist: LRU.Cache<string, any>;

  /**
   * default jwt sign options
   * @type {SignOptions}
   * @private
   */
  private _options: SignOptions = {
    jwtid: v4(),
    expiresIn: ms('1h'),
    algorithm: 'HS256'
  };

  constructor(private secret: Secret, private options: SignOptions = {}) {
    this.options = Object.assign(this._options, options);
  }

  /**
   * Judge if current token is about to expire
   * @param token
   * @returns {boolean}
   */
  static isNearToExpire(token: any): boolean {
    // if current token only has 1hour left to expire
    return token.exp - Date.now() < CONFIG.tokenNearToExpire;
  }

  /**
   * Add token to a blacklist to revoke its access
   * @param {string} token
   */
  static addToBlackList(token: string) {
    // add timer to make concurrent through
    setTimeout(async () => {
      const decoded: any = await _verify(token, CONFIG.secrets.jwt).catch(e => console.log(e));
      const tokenModel = new TokenModel({
        token,
        exp: decoded && decoded.exp
      });

      tokenModel
        .save()
        .then(() => {
          console.log(`token ${token} saved`);
        })
        .catch(e => {
          console.log(`save token ${token} failed`, e);
        });

      // add token to cache at the same time.
      this.blacklist = this.blacklist || Cache.get('blacklist');
      this.blacklist.set(token, true);
    }, CONFIG.tokenAllowThrough);
  }

  /**
   * check if token is blacked
   * @param {string} token
   * @returns {number}
   */
  static isBlacked(token: string) {
    this.blacklist = this.blacklist || Cache.get('blacklist');
    return this.blacklist.get(token);
  }

  /**
   * sign a new jwt token
   * @param payload
   * @param {SignOptions} options
   * @returns {string}
   */
  sign(payload: any, options?: SignOptions): string {
    const opt = Object.assign({}, this.options, options);
    // expire time is depended on issue time
    payload.iat = Date.now();
    return sign(payload, this.secret, opt);
  }
}
