//import { AppDataSource } from "../datasource";
import { DataSource } from "typeorm";
import { MySQLBook } from "../entities/MySQLBook";

export class ClientAurora {
  private static AppDataSource: DataSource = new DataSource({
    type: 'mysql',
    host: "localhost",
    port: 3306,
    username: "admin",
    password: "Bonjour123@",
    database: "db2",
    entities: [MySQLBook],
    synchronize: true,
    logging: true,
    migrations: [],
  });

  constructor() {}

  static getConnection() {
    return this.AppDataSource.initialize()
      .then(() => {
        console.log("Connection initialized with database...");
      })
      .catch((error: Error) => console.log(error));
  }
}

ClientAurora.getConnection();
