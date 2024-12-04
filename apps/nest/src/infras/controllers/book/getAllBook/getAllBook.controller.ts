import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAllBookUsecase } from 'src/application/usecases/book/getAllBook/getAllBook.usecase';
import { UseCaseProxy } from 'src/infras/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infras/usecase-proxy/usecase-proxy.module';
import { GetAllBookDto } from './getAllBook.dto';

@ApiTags('Books')
@Controller('books')
export class GetAllBookController {
  constructor(
    @Inject(UsecaseProxyModule.GET_ALL_BOOK_USECASE_PROXY)
    private readonly getAllBookUsecaseProxy: UseCaseProxy<GetAllBookUsecase>,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'GetAll Book',
  })
  async getAllBook(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '6',
  ): Promise<GetAllBookDto[]> {
    try {
      console.log(page, limit);
      
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);
      const result = await this.getAllBookUsecaseProxy
        .getInstance()
        .execute(pageNumber, limitNumber);

      return result;
    } catch (error) {
      throw error;
    }
  }
}
