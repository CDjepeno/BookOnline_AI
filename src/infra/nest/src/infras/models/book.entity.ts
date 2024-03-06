import { IsInt, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDateFormat } from '../common/decorators/is-date-format.decorator';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  author: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @IsDateFormat()
  releaseAt: Date;

  @Column()
  @IsString()
  imageUrl: string;

  @Column()
  @IsInt()
  approved: number;

  @Column()
  @IsInt()
  userId: number;

  // @ManyToOne(() => User, (user) => user.books)
  // user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
