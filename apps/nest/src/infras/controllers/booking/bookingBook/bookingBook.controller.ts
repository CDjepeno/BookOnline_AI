import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { badrequestexception } from 'src/domaine/errors/book.error';
import { JwtAuthGuard } from 'src/infras/common/guards/jwt-auth.guard';
import { UseCaseProxy } from 'src/infras/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infras/usecase-proxy/usecase-proxy.module';
import { BookingBookUseCase } from 'src/application/usecases/booking/bookingBook/bookingBook.usecase';
import { BookingBookDto } from './bookingBook.dto';

@ApiTags('Booking')
@Controller('book/booking')
export class BookingBookController {
  constructor(
    @Inject(UsecaseProxyModule.BOOKING_BOOK_USECASE_PROXY)
    private readonly bookingBookUsecaseProxy: UseCaseProxy<BookingBookUseCase>,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('coverUrl'))
  @ApiOperation({
    summary: 'Create Book',
  })
  async addBook(
    @Body() BookingBookDto: BookingBookDto,
  ) {
    try {

      const result = await this.bookingBookUsecaseProxy
        .getInstance()
        .execute(BookingBookDto);

      return result;
    } catch (error) {
      console.error('Error occurred while creating book:', error);

      if (error instanceof badrequestexception) {
        throw new badrequestexception(error.message);
      }
      throw new InternalServerErrorException('Failed to create book');
    }
  }
}
