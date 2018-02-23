import { IRouterContext } from 'koa-router';
import { sendres } from '../utils/response';
import { dispatch } from '../utils/dispatch';
import { FileModel } from '../models/file';
import * as debug from 'debug';
import { ECODE } from '../confs/error-code';
import { IFileRes } from '../workers/extract-excel.worker';
import { SheetModel } from '../models/sheet';

const print = debug('BLEACH:UploadCtrl');

/**
 * upload
 * @param {IRouterContext} ctx
 * @returns {Promise<IResponse>}
 */
export async function upload(ctx: IRouterContext) {
  const { request } = ctx;

  const keys = Object.keys(request._files);
  const k = keys[0];

  const { name, size, token, lastModifiedDate, filepath, data } = await dispatch<IFileRes>('extract', request._files[k]);
  console.log(filepath, data);

  const file = new FileModel({
    name,
    size,
    token,
    filepath,
    lastModifiedDate
  });

  // save file token
  const fileRes = await file.save().catch(e => print(e));
  if (!fileRes) return (ctx.body = sendres(ECODE.save_file_token_failed));

  // save data
  if (data && data.length) {
    const sheets = await SheetModel(token)
      .insertMany(data)
      .catch(e => print(e));
    if (!sheets) return (ctx.body = sendres(ECODE.save_sheets_failed));
  }

  return (ctx.body = sendres(0, data));
}
