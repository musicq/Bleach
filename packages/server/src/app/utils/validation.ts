import { IMiddleware, IRouterContext } from 'koa-router';
import { isNullOrUndefined } from 'util';
import { ECODE, IECODE } from '../confs/error-code';
import { sendres } from './response';
import { isEmpty } from 'ramda';


export const enum ParamsTypeEnum {
  NUMBER,
  STRING,
  ARRAY,
  OBJECT,
  BOOLEAN
}

export interface IParams {
  name: string;
  type: ParamsTypeEnum;
}

/**
 * check necessary parameters
 * @param {Array<IParams>} params
 * @returns {Router.IMiddleware}
 */
export function paramsValid(params: Array<IParams>): IMiddleware {
  return function _paramsValid(ctx: IRouterContext, next: () => Promise<any>): any {
    const body = ctx.request.body;

    // request body is empty
    if (isEmpty(body)) {
      return ctx.body = sendres(ECODE.request_body_empty);
    }

    const emptyParams = checkParamsValid(params, body);
    const errMsg = composeErrorMsg(emptyParams);

    if (errMsg) {
      return ctx.body = sendres(<IECODE>errMsg);
    }

    return next();
  };
}

/**
 * check parameters is valid
 * @param {Array<IParams>} params
 * @param body
 * @returns {string[]}
 */
export function checkParamsValid(params: Array<IParams>, body: any): string[] {
  const rules = {
    [ParamsTypeEnum.STRING]: (name: string) => {
      const value = body[name];
      return !isNullOrUndefined(value) && !!value.trim();
    },
    [ParamsTypeEnum.NUMBER]: (name: string) => {
      const value = body[name];
      return !isNullOrUndefined(value);
    },
    [ParamsTypeEnum.BOOLEAN]: (name: string) => {
      const value = body[name];
      return !isNullOrUndefined(value);
    },
    [ParamsTypeEnum.ARRAY]: (name: string) => {
      const value = body[name];
      return !isNullOrUndefined(value) && value.length;
    },
    [ParamsTypeEnum.OBJECT]: (name: string) => {
      const value = body[name];
      return !isNullOrUndefined(value) && Object.keys(value).length;
    }
  };

  return params.filter(param => !rules[param.type](param.name)).map(param => param.name);
}

/**
 * compose error message
 * @param {string[]} messages
 * @returns {string}
 */
export function composeErrorMsg(messages: string[]): IECODE | boolean {
  if (!messages.length) {
    return false;
  }

  return {
    code: ECODE.params_empty.code,
    msg: messages.length ? ECODE.params_empty.msg.replace('[PARAMS]', messages.join(', ')) : ''
  };
}
