import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsS3Module } from '../clients/aws/aws-s3.module';
import NodemailerClient from '../clients/nodemailer/nodemailer.client';
import { NodemailerModules } from '../clients/nodemailer/nodemailer.module';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Book } from '../models/book.model';
import { User } from '../models/user.model';
import { BookRepositoryTyperom } from './book.repository.typeorm';
import { UserRepositoryTyperom } from './user.repository.typeorm';
import { BookingRepositoryTypeorm } from './booking.repository.typeorm';
import { Booking } from '../models/booking.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Book, Booking]),
    ConfigModule,
    NodemailerModules,
    AwsS3Module,
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    UserRepositoryTyperom,
    BookRepositoryTyperom,
    BookingRepositoryTypeorm,
    NodemailerClient,
    ConfigService,
    JwtAuthGuard,
  ],
  exports: [UserRepositoryTyperom, BookRepositoryTyperom, BookingRepositoryTypeorm],
})
export class RepositoriesModule {}
