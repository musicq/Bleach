import * as Router from 'koa-router';
import CONFIG from './confs/config';
import { graphQL } from './controller/graphql.ctrl';
import { login, loginStatus, logout, userRegister } from './controller/login.ctrl';
import { ParamsTypeEnum, paramsValid } from './utils/validation';
import { upload } from './controller/upload.ctrl';

const router = new Router({ prefix: CONFIG.routes.prefix });

/**
 * @api register
 * @method POST
 */
router.post(
  '/register',
  paramsValid([{ name: 'username', type: ParamsTypeEnum.STRING }, { name: 'password', type: ParamsTypeEnum.STRING }]),
  userRegister
);

/**
 * @api login
 * @method POST
 */
router.post(
  '/login',
  paramsValid([{ name: 'username', type: ParamsTypeEnum.STRING }, { name: 'password', type: ParamsTypeEnum.STRING }]),
  login
);

/**
 * @api login
 * @method GET
 */
router.get('/login', loginStatus);

/**
 * @api logout
 * @method GET
 */
router.get('/logout', logout);

/**
 * @api graphql
 * @method POST
 */
router.post('/graphql', graphQL);

/**
 * @api upload
 * @method POST
 */
router.post('/upload', upload);

export default router;
