import * as debug from 'debug';
import * as bodyParser from 'koa-bodyparser';
import App from './app/app';
import { connectDB, restoreTokenBlacklist } from './app/hooks';
import jwt from './app/middlewares/jwt';
import router from './app/router';
import form from './app/middlewares/form';

const print = debug('BLEACH:index');

// register pre tasks
App.registerPreTasks(connectDB);
App.registerTasks(restoreTokenBlacklist);

// launch app
const app = App.launch();

// middle wares
app.use(jwt());
app.use(bodyParser());
app.use(form());

app.use(router.routes());
app.use(router.allowedMethods());

// caught rejection not handle
process.on('unhandledRejection', (err: Error) => {
  print('unhandledRejection: %o', err);
});

// uncaught exception
process.on('uncaughtException', (err: Error) => {
  print('uncaughtException: %o', err);
});

// caught `^c`
process.on('SIGINT', () => {
  print('Server will be killed by manual');
  process.exit(0);
});
