import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAllBookResponsePagination } from 'src/application/usecases/book/getAllBook/getAllBook.response';
import { GetPendingBooksUsecase } from 'src/application/usecases/book/getPendingBooks /getPendingBooks.usecase';
import { UseCaseProxy } from 'src/infras/usecase-proxy/usecase-proxy';
import { UsecaseProxyEnum } from 'src/infras/usecase-proxy/usecase-proxy-config';

@ApiTags('Book')
@Controller('books/pending')
export class GetPendingBooksController {
  constructor(
    @Inject(UsecaseProxyEnum.GET_PENDING_BOOKS_USECASE_PROXY)
    private readonly getPendingBooksUsecaseProxy: UseCaseProxy<GetPendingBooksUsecase>,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get first six pending Books',
  })
  async getPendinBooks(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<GetAllBookResponsePagination> {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 6;

    return await this.getPendingBooksUsecaseProxy
      .getInstance()
      .execute(pageNumber, limitNumber);
  }
}
