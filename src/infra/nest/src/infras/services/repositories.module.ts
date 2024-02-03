import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import NodemailerClient from '../clients/nodemailer/nodemailer.client';
import { NodemailerModules } from '../clients/nodemailer/nodemailer.module';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { User } from '../entities/user.entity';
import { UserRepositoryTyperom } from './user.repository.typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
    NodemailerClient,
    ConfigService,
    JwtAuthGuard,
  ],
  exports: [UserRepositoryTyperom],
})
export class RepositoriesModule {}
