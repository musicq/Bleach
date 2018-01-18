import CONFIG from '../confs/config';
import { createHmac } from 'crypto';

/**
 * encrypt password
 * @param {string} pwd
 * @returns {string}
 * @private
 */
export function encryptPwd(pwd: string) {
  return createHmac('sha256', CONFIG.secrets.password).update(pwd).digest('hex');
}


