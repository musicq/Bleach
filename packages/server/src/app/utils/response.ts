import { IECODE } from '../confs/error-code';

/**
 * response data structure
 */
export interface IResponse {
  status: number;
  data?: any;
  msg?: string;
}

/**
 * format response data
 * @returns {IResponse}
 *
 * there are 3 types of response data structure
 *
 * 1. success:data
 * {
 *  status: 0,
 *  data: {}
 * }
 *
 * 2. success:message
 * {
 *  status: 0,
 *  msg: ''
 * }
 *
 * 3. error:message
 * {
 *  status: -1
 *  msg: ''
 * }
 *
 */
export function sendres(res: string | IECODE): IResponse;
export function sendres(status: number, res: any): IResponse;
export function sendres(...args: any[]): any {
  if (args.length === 1) {
    if (typeof args[0] === 'string') {
      return {
        status: 0,
        data: args[0]
      };
    } else if (typeof args[0] === 'object') {
      return {
        status: args[0].code,
        error: args[0].msg
      };
    }
  } else if (args.length === 2) {
    if (typeof args[0] !== 'number') {
      throw new Error(`First parameter should be type int, but got a ${typeof args[0]}.`);
    }
    const res: IResponse = {
      status: args[0]
    };
    res[typeof args[1] === 'string' ? 'msg' : 'data'] = args[1];

    return res;
  }
}
