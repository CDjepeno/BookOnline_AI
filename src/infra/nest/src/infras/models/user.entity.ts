import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
// import { MESSAGES, REGEX } from 'src/utils/utils';
import {
  // BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from './book.entity';
// import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  //Id
  @PrimaryGeneratedColumn('increment')
  id: number;

  //Email
  @Column('varchar', { unique: true })
  @IsEmail()
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  //Password
  @Column()
  @IsString()
  @Length(6, 24)
  @Matches(/^(?=.*?[A-Z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-_]).{8,}$/, {
    message:
      'Password should have 1 upper case, lowcase letter along with a number and spécial character.',
  })
  password: string;

  //Name
  @Column()
  @IsString()
  name: string;

  //Phone
  @Column()
  @IsString()
  phone: string;

  @OneToMany(() => Book, (book) => book.user, { nullable: false })
  books: Book[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
