import "reflect-metadata";
import { DataSource } from "typeorm";
import { MySQLBook } from "./entities/MySQLBook";

//const entities = [MySQLBook];

export const AppDataSource = new DataSource({
  type: "mysql",
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


AppDataSource.initialize()
  .then(async () => {
    console.log("Connection initialized with database...");
  })
  .catch((error) => console.log(error));


export const getDataSource = (delay = 3000): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject("Failed to create connection with database");
    }, delay);
  });
};
