import * as debug from 'debug';
import { IRouterContext } from 'koa-router';
import { isEmpty, isNil } from 'ramda';
import CONFIG from '../confs/config';
import { ECODE } from '../confs/error-code';
import { MESSAGES } from '../confs/success-messages';
import { IUser, UserModel } from '../models/user';
import { TokenGenerator } from '../utils/jwt-generator';
import { sendres } from '../utils/response';
import { encryptPwd } from '../utils/utils';

const print = debug('LAS:LoginCtrl');

/**
 * login
 * @param {IRouterContext} ctx
 * @returns {Promise<IResponse>}
 */
export async function login(ctx: IRouterContext) {
  const { request } = ctx;
  const { username, password } = request.body;

  const query = {
    username,
    password: encryptPwd(password)
  };

  let user: IUser;
  try {
    user = <IUser>await UserModel.findOne(query).exec();
  } catch (e) {
    print(e);
    return (ctx.body = sendres(ECODE.db_connect_err));
  }

  if (isEmpty(user) || isNil(user)) {
    return (ctx.body = sendres(ECODE.username_pwd_err));
  }

  const tokenGenerator: TokenGenerator = new TokenGenerator(CONFIG.secrets.jwt, {
    audience: 'WEB',
    expiresIn: CONFIG.cookieMaxAge,
    noTimestamp: false
  });
  const token: string = tokenGenerator.sign({
    username: user.username
  });

  print('jwt token: ', token);

  // set jwt in cookie and HttpOnly to prevent js read it
  ctx.cookies.set('token', token, { maxAge: CONFIG.cookieMaxAge });
  return (ctx.body = sendres(0, {
    id: user.id,
    username: user.username
  }));
}

/**
 * check is logged in
 * @param {IRouterContext} ctx
 * @returns {Promise<void>}
 */
export async function loginStatus(ctx: IRouterContext) {
  // it doesn't ship any information (for now),
  // just let client now that the user has been logged in.
  ctx.status = 204;
  return (ctx.body = '');
}

/**
 * logout
 * @param {IRouterContext} ctx
 * @returns {IResponse}
 */
export function logout(ctx: IRouterContext) {
  // blacked token
  if (ctx.token) {
    TokenGenerator.addToBlackList(ctx.token);
  }
  // clear user's cookie
  ctx.cookies.set('token');
  return (ctx.body = sendres(MESSAGES.logout_success));
}

/**
 * register
 * @param {IRouterContext} ctx
 * @returns {Promise<IResponse>}
 */
export async function userRegister(ctx: IRouterContext) {
  const body = ctx.request.body;
  const { username, password } = body;

  const user = new UserModel({
    username,
    password: encryptPwd(password)
  });

  try {
    await user.save();
  } catch (e) {
    print(e);
    return (ctx.body = sendres(ECODE.save_user_failed));
  }

  return (ctx.body = sendres(MESSAGES.save_user_success));
}
