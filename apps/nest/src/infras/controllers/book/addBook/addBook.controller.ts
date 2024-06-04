import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddBookUseCase } from 'src/application/usecases/book/AddBook/addBook.usecase';
import { JwtAuthGuard } from 'src/infras/common/guards/jwt-auth.guard';
import { UseCaseProxy } from 'src/infras/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infras/usecase-proxy/usecase-proxy.module';
import { CreateBookDto } from './addBook.dto';

@ApiTags('Books')
@Controller('books')
export class AddBookController {
  constructor(
    @Inject(UsecaseProxyModule.ADD_BOOK_USECASE_PROXY)
    private readonly addBookUsecaseProxy: UseCaseProxy<AddBookUseCase>,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Creates a Post',
  })
  async addBook(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpeg|jpg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Body() createBookDto: CreateBookDto,
  ) {
    try {
      if (!file) {
        throw new Error('File is required');
      }

      const result = await this.addBookUsecaseProxy
        .getInstance()
        .execute(createBookDto, file);
      return {
        status: 'Created',
        code: 201,
        message: 'Insert data success',
        data: result,
      };
    } catch (err) {
      throw err;
    }
  }
}
