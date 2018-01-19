import { createHmac } from 'crypto';
import CONFIG from '../confs/config';

/**
 * encrypt password
 * @param {string} pwd
 * @returns {string}
 * @private
 */
export function encryptPwd(pwd: string) {
  return createHmac('sha256', CONFIG.secrets.password)
    .update(pwd)
    .digest('hex');
}
