import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetBookUsecase } from 'src/application/usecases/book/getBookById/getBook.usecase';
import { UseCaseProxy } from 'src/infras/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infras/usecase-proxy/usecase-proxy.module';
import { GetBookDto } from './getBook.dto';

@ApiTags('Books')
@Controller('books')
export class GetBookController {
  constructor(
    @Inject(UsecaseProxyModule.GET_BOOK_USECASE_PROXY)
    private readonly getBookUsecaseProxy: UseCaseProxy<GetBookUsecase>,
  ) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get Book By Name',
  })
  async getBook(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetBookDto> {
    try {
      const book = this.getBookUsecaseProxy.getInstance().execute(id);
      if (!book) {
        throw new NotFoundException(`Aucun livre trouvé avec le nom "${id}"`);
      }
      return book;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException(
          'Impossible de récupérer le livre.',
        );
      }
    }
  }
}
