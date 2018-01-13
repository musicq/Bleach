import * as path from 'path';

export default class Helpers {
  /**
   * @name Project Root Path
   */
  static ROOT() {
    return path.resolve(__dirname, '..');
  }

  /**
   * @name base on project root path
   */
  static root(...params: string[]) {
    return path.join(Helpers.ROOT(), params.join('/'));
  }

  /**
   * @name project source code path
   */
  static rootForSrc(...params: string[]) {
    return Helpers.root('src/', params.join('/'));
  }

  /**
   * @name project release code path
   */
  static rootForRelease(...params: string[]) {
    return Helpers.root('release/', params.join('/'));
  }
}
