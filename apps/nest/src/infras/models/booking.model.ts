import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.model';
import { Book } from './book.model';
import { IsInt } from 'class-validator';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  startAt: Date;

  @UpdateDateColumn()
  endAt: Date;

  @Column()
  @IsInt()
  userId: number;

  @ManyToOne(() => User, (user) => user.bookings)
  @IsInt()
  user: User;

  @Column()
  @IsInt()
  bookId: number;

  @ManyToOne(() => Book, (book) => book.user)
  @JoinColumn({ name: 'bookId' })
  book: Book;
}
