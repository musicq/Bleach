import * as Router from 'koa-router';
import CONFIG from './confs/config';
import { login, loginStatus, logout, userRegister } from './controller/login.ctrl';
import { ParamsTypeEnum, paramsValid } from './utils/validation';


const router = new Router({ prefix: CONFIG.routes.prefix });

/**
 * @api register
 * @method POST
 */
router.post(
  '/register',
  paramsValid([
    { name: 'username', type: ParamsTypeEnum.STRING },
    { name: 'password', type: ParamsTypeEnum.STRING }
  ]),
  userRegister
);

/**
 * @api login
 * @method POST
 */
router.post(
  '/login',
  paramsValid([
    { name: 'username', type: ParamsTypeEnum.STRING },
    { name: 'password', type: ParamsTypeEnum.STRING }
  ]),
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


export default router;
