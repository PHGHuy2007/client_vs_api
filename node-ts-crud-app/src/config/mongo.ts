import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const mongoUri = process.env.MONGO_URI || '';
const dbName = process.env.MONGO_DB_NAME || 'school_db';
const client = new MongoClient(mongoUri);
let dbInstance: Db | null = null;
export async function getMongoDb(): Promise<Db> {
  if (!dbInstance) {
    await client.connect();
    dbInstance = client.db(dbName);
    console.log(`Kết nối thành công tới ${dbName}`);
  }
  return dbInstance;
}