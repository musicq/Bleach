import * as Koa from 'koa';
import { Fields, Files } from 'formidable';

declare module 'koa' {
  interface Context {
    // user's jwt token
    token: string | null;
  }

  interface Request {
    _fields: Fields;
    _files: Files;
  }
}
