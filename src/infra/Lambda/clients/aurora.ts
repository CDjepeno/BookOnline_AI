import { MySQLBook } from "../entities/MySQLBook";
import { AppDataSource } from "../datasource";

export function getConnexion() {
  AppDataSource.initialize()
    .then(() => {
      console.log("ok db");
    })
    .catch((error) => console.log(error));
}

getConnexion();
