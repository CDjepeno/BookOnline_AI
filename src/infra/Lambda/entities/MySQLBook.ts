import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({
  name: "book",
  schema: "book-db",
})
export class MySQLBook {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    name: "title",
    type: "varchar",
    length: 3000,
    collation: "utf8_general_ci",
  })
  title: string;

  @Column({
    name: "genre",
    type: "varchar",
    length: 3000,
    collation: "utf8_general_ci",
  })
  genre: string;

  @Column({
    name: "author",
    type: "varchar",
    length: 3000,
    collation: "utf8_general_ci",
  })
  author: string;

  @Column({
    name: "image",
    type: "varchar",
    length: 3000,
    collation: "utf8_general_ci",
  })
  image: string;


} 