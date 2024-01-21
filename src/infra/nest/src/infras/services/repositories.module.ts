import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserRepositoryTyperom } from './user.repository.typeorm';
import { TwilioClient } from '../clients/twilio/twilio.client';
import { TwilioModules } from '../clients/twilio/twilio.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NodemailerModules } from '../clients/nodemailer/nodemailer.module';
import NodemailerClient from '../clients/nodemailer/nodemailer.client';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TwilioModules,
    ConfigModule,
    NodemailerModules,
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    UserRepositoryTyperom,
    TwilioClient,
    NodemailerClient,
    ConfigService,
  ],
  exports: [UserRepositoryTyperom],
})
export class RepositoriesModule {}
