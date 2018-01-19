import { verify } from 'jsonwebtoken';
import { Context } from 'koa';
import { promisify } from 'util';
import CONFIG from '../confs/config';
import { ECODE } from '../confs/error-code';
import { TokenGenerator } from '../utils/jwt-generator';
import { sendres } from '../utils/response';
import debug = require('debug');
import ms = require('ms');

const print = debug('LAS:jwt');
const _verify = promisify(verify);

const noNeedAuthorizationRoutes = CONFIG.routes.noAuthApi.map(route => {
  route.path = CONFIG.routes.prefix + route.path;
  return route;
});

export default function jwt() {
  return async function jwt(ctx: Context, next: Function) {
    const path = ctx.path;
    // Default request method is `GET`
    const method = ctx.req.method || 'GET';

    // pass no need to auth request
    if (couldPassThrough(method, path)) {
      return await next();
    }

    const token = ctx.cookies.get('token');

    // cookie is expired, log out
    if (!token) {
      ctx.status = 401;
      return (ctx.body = sendres(ECODE.jwt_valid_failed));
    }

    const decoded: any = await _verify(token, CONFIG.secrets.jwt).catch(e => console.log(e));

    // if no content or is blacked, return
    if (!decoded || TokenGenerator.isBlacked(token)) {
      ctx.status = 401;
      return (ctx.body = sendres(ECODE.jwt_valid_failed));
    }

    print('current token payload is :', decoded);

    // if current token is almost to expire, then resign a new token, and put current token to the blacklist
    // `/api/logout` request doesn't need to regenerate a new token.
    if (TokenGenerator.isNearToExpire(decoded) && path !== CONFIG.routes.prefix + '/logout') {
      const payload = Object.assign({}, removeOriginProperty(decoded));
      // resign a short live long cookie and jwt. Let them expire at the same time.
      const liveTime = ms('1h');
      const newToken = new TokenGenerator(CONFIG.secrets.jwt).sign(payload, { expiresIn: liveTime });
      ctx.cookies.set('token', newToken, { maxAge: liveTime });
      TokenGenerator.addToBlackList(token);
    }

    ctx.token = token;

    await next();
  };
}

/**
 * remove useless property in jwt
 * @param payload
 * @returns {any}
 */
function removeOriginProperty(payload: any) {
  delete payload.exp;
  delete payload.iat;
  delete payload.jti;

  return payload;
}

/**
 * check if the request should be pass through
 * @param {string} method
 * @param {string} path
 * @returns {boolean}
 */
function couldPassThrough(method: string, path: string): boolean {
  return !!noNeedAuthorizationRoutes.find(route => route.method === method && route.path === path);
}
