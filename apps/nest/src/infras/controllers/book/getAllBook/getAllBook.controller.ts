import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAllBookResponsePagination } from 'src/application/usecases/book/getAllBook/getAllBook.response';
import { GetAllBookUsecase } from 'src/application/usecases/book/getAllBook/getAllBook.usecase';
import { UseCaseProxy } from 'src/infras/usecase-proxy/usecase-proxy';
import { UsecaseProxyEnum } from 'src/infras/usecase-proxy/usecase-proxy-config';

@ApiTags('Book')
@Controller('books')
export class GetAllBookController {
  constructor(
    @Inject(UsecaseProxyEnum.GET_ALL_BOOK_USECASE_PROXY)
    private readonly getAllBookUsecaseProxy: UseCaseProxy<GetAllBookUsecase>,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get first six Book',
  })
  async getAllBook(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<GetAllBookResponsePagination> {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 6;
    return await this.getAllBookUsecaseProxy
      .getInstance()
      .execute(pageNumber, limitNumber);
  }
}
