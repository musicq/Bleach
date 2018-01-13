import * as debug from 'debug';
import * as Application from 'koa';
import CONFIG from './confs/config';


const print = debug('LAS:app');

/**
 * create App instance
 */
export default class App {
  // store app instance
  private static _app: Application;

  // pre tasks, when all pre tasks finish, server will serve.
  private static _preTasks: Array<any> = [];

  private constructor() {
  }

  /**
   * register pre tasks to app, app will run this tasks before server serving
   */
  static registerPreTasks(task: any) {
    // if task is a function, then run it, otherwise let it through
    this._preTasks.push(typeof task === 'function' ? task() : task);
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

    this.getPrepared(() => {
      this._app.listen(CONFIG.server.port, () => {
        print(`server is on port %s`, CONFIG.server.port);
      });
    });

    return this._app;
  }

  /**
   * get prepared before create an app instance
   */
  private static getPrepared(next: Function) {
    const allPreparedTasks = Promise.all(this._preTasks);

    // wait all pre tasks get ready
    allPreparedTasks.then(() => next())
      .catch((e) => {
        throw new Error(e);
      });
  }
}
