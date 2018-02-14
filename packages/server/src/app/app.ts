import * as debug from 'debug';
import * as Application from 'koa';
import CONFIG from './confs/config';
import { flatten } from 'ramda';

const print = debug('BLEACH:app');

/**
 * create App instance
 */
export default class App {
  // store app instance
  private static _app: Application;

  // pre tasks, when all pre tasks finish, server will serve.
  private static _preTasks: Array<Promise<any>> = [];
  private static _tasks: Array<Promise<any>> = [];

  private constructor() {}

  /**
   * register pre tasks to app, app will run this tasks before server serving
   */
  static registerPreTasks(task: Function | Promise<any>) {
    // if task is a function, then run it, otherwise let it through
    // task result can be a Promise or Promise array
    this._preTasks.push(typeof task === 'function' ? task() : task);
  }

  /**
   * register task to app, app will run this task after pre task has been done
   */
  static registerTasks(task: Function | Promise<any>) {
    this._tasks.push(typeof task === 'function' ? task() : task);
  }

  /**
   * get App Instance
   */
  static launch(): Application {
    if (this._app) {
      return this._app;
    }
    // create app instance
    this._app = new Application();

    this.getPrepared()
      .then(() =>
        this._app.listen(CONFIG.server.port, () => {
          print(`server is on port %s`, CONFIG.server.port);
        })
      )
      .catch(e => {
        throw new Error(e);
      });

    return this._app;
  }

  /**
   * get prepared before create an app instance
   */
  private static getPrepared() {
    return new Promise(async (resolve, reject) => {
      await Promise.all(flatten(this._preTasks)).catch(e => {
        throw new Error(e);
      });

      await Promise.all(flatten(this._tasks)).catch(e => {
        throw new Error(e);
      });

      resolve();
    });
  }
}
