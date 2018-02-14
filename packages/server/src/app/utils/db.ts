import { Connection } from 'mongoose';

export class DB {
  private static _db: Map<string, Connection> = new Map();

  private constructor() {}

  static get(name: string): Connection {
    const db = this._db.get(name);
    if (db) return db;

    throw new Error(`Cannot get DB named [${name}]`);
  }

  static set(name: string, connection: Connection): void {
    this._db.set(name, connection);
  }
}
