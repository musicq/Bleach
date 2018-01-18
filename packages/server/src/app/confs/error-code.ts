export interface IECODE {
  code: number;
  msg: string;
}

/**
 * Error Code
 */
export const ECODE = {
  /** System Level */
  db_connect_err: { code: -100000, msg: 'Database query error.' },
  jwt_valid_failed: { code: -100001, msg: 'Token validated failed.' },
  query_failed: { code: -100002, msg: 'Query failed.' },

  /** Business Level */
  request_body_empty: {code: -110000, msg: 'Request body cannot be empty.'},
  params_empty: {code: -110001, msg: '[PARAMS] cannot be empty.'},

  save_user_failed: { code: -200000, msg: '保存用户失败' },
  username_pwd_err: { code: -200001, msg: '用户名密码错误' }
};

