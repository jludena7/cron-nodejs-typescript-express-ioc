import { MongoClient, Db, Collection } from "mongodb";

export interface DbConnection {
  connect(): Promise<void>;

  getCollection<T extends Document>(
    name: string,
  ): Promise<Collection<T> | null>;

  getDb(): Db;

  close(): Promise<void>;
}

class MongoDBConnection implements DbConnection {
  private client: MongoClient | null = null;
  private db: Db | null = null;

  constructor(
    private uri: string,
    private dbName: string,
  ) {}

  async connect(): Promise<void> {
    this.client = new MongoClient(this.uri);
    await this.client.connect();
    this.db = this.client.db(this.dbName);
  }

  getDb(): Db {
    if (this.db) {
      return this.db as Db;
    } else {
      throw Error("Not exists database connection");
    }
  }

  async getCollection<T extends Document>(
    name: string,
  ): Promise<Collection<T> | null> {
    if (this.db) {
      return this.db.collection<T>(name);
    }
    return null;
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
    }
  }
}

export default MongoDBConnection;
