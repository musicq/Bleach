import { IRouterContext } from 'koa-router';
import { sendres } from '../utils/response';
import { dispatch } from '../utils/dispatch';

/**
 * upload
 * @param {IRouterContext} ctx
 * @returns {Promise<IResponse>}
 */
export async function upload(ctx: IRouterContext) {
  const { request } = ctx;

  const keys = Object.keys(request._files);
  const k = keys[0];

  // console.log(keys);
  // console.log(request._files);
  const { filepath, data } = await dispatch<{ filepath: string; data: any[] }>('extract', request._files[k]);
  console.log(filepath, data);

  return (ctx.body = sendres(0, data));
}
