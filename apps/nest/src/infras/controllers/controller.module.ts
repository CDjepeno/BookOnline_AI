import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';
import { JwtAuthGuard } from 'src/infras/common/guards/jwt-auth.guard';
import { AwsS3Client } from '../clients/aws/aws-s3.client';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { AddBookController } from './book/addBook/addBook.controller';
import { DeleteBookController } from './book/deleteBook/deleteBook.controller';
import { GetAllBookController } from './book/getAllBook/getAllBook.controller';
import { GetBookController } from './book/getBook/getBook.controller';
import { GetBookByUserController } from './book/getBookByUser/getBookByUser.controller';
import { UpdateBookController } from './book/updateBook/updateBook.controller';
import { AuthController } from './user/auth.controller';
import { UsersController } from './user/users.controller';
import { BookingBookController } from './booking/bookingBook/bookingBook.controller';
import { GetBookingBookController } from './booking/getBookingBook/getbookingBook.controller';
import { GetBookByNameController } from './book/getBooByName/getBookByName.controller';
import * as path from 'path';
import * as glob from 'glob';

function loadControllers(): any[] {
  const controllers: any[] = [];
  const files = glob.sync(
    path.join(__dirname, './**/*.controller.{ts,js}'),
  );
  console.log('files---------------------------------------------------');
  console.log(files);
  console.log(__dirname);
  
  for (const file of files) {
    const module = require(file);
    for (const exported in module) {
      if (module[exported].prototype) {
        controllers.push(module[exported]);
      }
    }
  }
  return controllers;
}
loadControllers()
@Module({
  imports: [
    UsecaseProxyModule.register(),
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
  ],
  controllers: loadControllers(),
  providers: [JwtAuthGuard, JwtService, AwsS3Client],
})
export class ControllerModule {}

// onlineBookApi/apps/nest/src/infras/controllers/book
// onlineBookApi/apps/nest/src/infras/controllers/booking
// onlineBookApi/apps/nest/src/infras/controllers/user