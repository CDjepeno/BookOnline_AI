import * as bcrypt from 'bcrypt';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  @Matches(/^(?=.*?[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-_]).{8,}$/, {
    message:
      'Password should have 1 upper case, 1 lowercase letter, 1 number, and 1 special character.',
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

  // @OneToMany(() => Book, (book) => book.user)
  // books: Book[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async setPassword() {
    const saltRounds = 10; // Nombre de rounds pour générer le sel
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
