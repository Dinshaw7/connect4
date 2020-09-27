/* eslint-disable consistent-return */
import { blue, cyan, green } from 'colors/safe';
import { Db, MongoClient } from 'mongodb';

require('dotenv').config();

const dbUrl = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

export default class MongoDBConnection {
  private static isConnected: boolean = false;

  private static db: Db;

  public static getConnection(result: (connection: any) => void) {
    if (this.isConnected) {
      return result(this.db);
    }
    this.connect(() => result(this.db));
  }

  private static connect(result: (error: any, db: Db) => void) {
    MongoClient.connect(dbUrl!, { useUnifiedTopology: true }, (err, client) => {
      this.db = client.db(dbName!);
      this.isConnected = true;
      console.log(`${blue('Mongodb')} ${green(dbName!)} ${cyan('connected at :')} ${green(dbUrl!)}`);
      return result(err, this.db);
    });
  }
}
