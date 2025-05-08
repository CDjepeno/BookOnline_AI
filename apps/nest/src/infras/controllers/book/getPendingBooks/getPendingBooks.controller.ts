import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAllBookResponsePagination } from 'src/application/usecases/book/getAllBook/getAllBook.response';
import { GetPendingBooksUsecase } from 'src/application/usecases/book/getPendingBooks /getPendingBooks.usecase';
import { JwtAuthGuard } from 'src/infras/common/guards/jwt-auth.guard';
import { UseCaseProxy } from 'src/infras/usecase-proxy/usecase-proxy';
import { UsecaseProxyEnum } from 'src/infras/usecase-proxy/usecase-proxy-config';

@ApiTags('Book')
@Controller('pending/books')
export class GetPendingBooksController {
  constructor(
    @Inject(UsecaseProxyEnum.GET_PENDING_BOOKS_USECASE_PROXY)
    private readonly getPendingBooksUsecaseProxy: UseCaseProxy<GetPendingBooksUsecase>,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get first six pending Books',
  })
  @UseGuards(JwtAuthGuard)
  async getPendinBooks(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '6',
  ): Promise<GetAllBookResponsePagination> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return await this.getPendingBooksUsecaseProxy
      .getInstance()
      .execute(pageNumber, limitNumber);
  }
}
