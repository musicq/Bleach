export interface IECODE {
  code: number;
  msg: string;
}

/**
 * Error Code
 */
export const ECODE = {
  /** System Level */
  db_connect_err: { code: -0x100001, msg: 'Database query error.' },
  jwt_valid_failed: { code: -0x100002, msg: 'Token validated failed.' },
  query_failed: { code: -0x100003, msg: 'Query failed.' },
  empty_file: { code: -0x100004, msg: 'No file found.' },
  system_error: { code: -0x100005, msg: 'System error.' },

  /** Business Level */
  request_body_empty: { code: -0x110000, msg: 'Request body cannot be empty.' },
  params_empty: { code: -0x110001, msg: '[PARAMS] cannot be empty.' },

  save_user_failed: { code: -0x200000, msg: '保存用户失败' },
  username_pwd_err: { code: -0x200001, msg: '用户名密码错误' },
  save_file_token_failed: { code: -0x200002, msg: '保存文件令牌失败' },
  save_sheets_failed: { code: -0x200003, msg: '保存表格数据失败' }
};
