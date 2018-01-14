import ms = require('ms');


const CONFIG = {
  server: {
    host: '127.0.0.1',
    port: 3000
  },
  db: {
    uri: `mongodb://127.0.0.1:27017/bleach`,
    host: '127.0.0.1',
    port: 27017,
    name: 'bleach'
  },
  routes: {
    prefix: '/api',
    noAuthApi: [
      {
        method: 'POST',
        path: '/login'
      },
      {
        method: 'POST',
        path: '/register'
      }
    ]
  },
  secrets: {
    jwt: new Buffer('what a lovely story!', 'base64'),
    password: new Buffer('what a lovely fairytale!', 'base64')
  },
  /**
   * cookie maxAge
   */
  cookieMaxAge: ms('8h'),
  /**
   * this property tells program when should to refresh a new token before it is expired.
   */
  tokenNearToExpire: ms('30m'),
  /**
   * this property is let token will still valid for a short while after adding into blacklist.
   */
  tokenAllowThrough: ms('2s'),
  /**
   * maximum size of lru cache
   * DEFAULT: 10M
   */
  maxCacheStorage: 1024 * 1024 * 10
};

export default CONFIG;
