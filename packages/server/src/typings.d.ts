import * as Koa from 'koa';


/**
 * Custom property on Context
 */
declare module 'koa' {
  interface Context {
    // user's jwt token
    token: string | null;
  }
}
