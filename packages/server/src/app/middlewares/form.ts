import { Context } from 'koa';
import { IncomingForm } from 'formidable';
import { sendres } from '../utils/response';
import { ECODE } from '../confs/error-code';

export default function form() {
  return async function(ctx: Context, next: Function) {
    const form = new IncomingForm();

    const res = await new Promise((resolve, reject) => {
      form.parse(ctx.req, (err, fields, files) => {
        if (err) return reject(err);

        ctx.request._fields = fields;
        ctx.request._files = files;
        resolve(true);
      });
    }).catch(e => console.error(e));

    if (!res) return (ctx.body = sendres(ECODE.system_error));

    return await next();
  };
}
