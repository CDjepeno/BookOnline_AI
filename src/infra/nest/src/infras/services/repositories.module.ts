import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserRepositoryTyperom } from './user.repository.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepositoryTyperom],
  exports: [UserRepositoryTyperom],
})
export class RepositoriesModule {}
