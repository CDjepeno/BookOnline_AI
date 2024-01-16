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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @BeforeInsert()
  // async setPassword(password: string) {
  //   const salt = await bcrypt.genSalt();
  //   this.password = await bcrypt.hash(password || this.password, salt);
  // }
}
